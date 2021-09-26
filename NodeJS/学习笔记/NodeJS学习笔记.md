<span style="font-family: 宋体,sans-serif; ">

### 一、什么是NodeJS，有什么用

NodeJS是JS的运行环境，专门用于操作磁盘文件或搭建HTTP服务器

### 二、NodeJS模块化

编写稍大一点的程序都会将代码模块化，在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，文件路径就是模块名。
NodeJS的模块化基于commonJS，使用require、exports、module三个关键字实现模块化

- require - 【导入其他模块】传入一个模块名，返回一个模块导出对象。可使用相对路径(./)，也可使用绝对路径(/、C:)，模块名中的.js可忽略

```javascript
// foo1至foo4中保存的是同一个模块的导出对象。
var foo1 = require('./foo');
var foo2 = require('./foo.js');
var foo3 = require('/home/user/foo');
var foo4 = require('/home/user/foo.js');
```

```javascript
// 可以通过这种方式加载、使用json文件
var data = require('./data.json')
```

- exports - 【导出当前模块】导出当前模块的共有方法和属性，别的模块引入当前模块时得到的就是当前模块的exports对象

```javascript
exports.hello = function () {
  console.log('Hello World')
}
```

- module - 【替换当前模块导出对象】导出模块默认是一个普通对象，如果想改成一个函数的话：

```javascript
// 模块默认导出对象被替换为一个函数
module.exports = function () {
  console.log('Hello World')
} 
```

- 模块初始化 - 一个模块的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用
- 主模块 - 入口模块，调度其他模块完成工作

```text
node main.js    // main.js是主模块
```

- 完整示例

```text
// 有以下目录
- /home/user/hello/
    - util/
      counter.js
    main.js
```

```javascript
// counter.js内容如下
var i = 0

function count() {
  return ++i
}

exports.count = count
// 该模块定义了一个私有变量i，并导出了共有方法count
```

```javascript
// 主模块main.js内容如下
var counter1 = require('./util/counter');
var counter2 = require('./util/counter');

console.log(counter1.count());
console.log(counter2.count());
console.log(counter2.count());

// 运行结果
1
2
3
```

结论：counter.js只初始化了一次

**总结：**
1. NodeJS是JS的运行环境，专门用于操作磁盘文件或搭建HTTP服务器
2. NodeJS使用CommonJS模块化标准，主模块作为程序入口，所有模块在执行过程中只初始化一次

### 三、代码的组织和部署

1. 模块路径解析规则
   > require支持绝对路径(/、C:)和相对路径(./)，但一旦模块路径发生变化，该模块的引用路径也需要调整。因此，require支持第三种形式的路径，写法类似于foo/bar，并依次按照以下规则解析路径，直到找到模块位置
    1. **内置模块**： 如果传递给require函数的是NodeJS内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如require('fs')
    2. **node_modules目录**： NodeJS定义了一个特殊的node_modules目录用于存放模块。例如某个模块的绝对路径是/home/user/hello.js，在该模块中使用require('foo/bar')
       方式加载模块时，则NodeJS依次尝试使用以下路径
    3. **NODE_PATH环境变量**： 与PATH环境变量类似，NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径。NODE_PATH环境变量中包含一到多个目录路径，路径之间在Linux下使用`:`
       分隔，在Windows下使用`;`分隔。例如定义了以下NODE_PATH环境变量
       ```text
        NODE_PATH=/home/user/lib:/home/lib
       ```
       当使用require('foo/bar')的方式加载模块时，则NodeJS依次尝试以下路径。
        ```text
        /home/user/lib/foo/bar
        /home/lib/foo/bar
        ```
    

2. 包
   > 将由多个子模块构成的大模块称作包，所有的子模块放在一个目录下
    - 在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象
    ```text
    - /home/user/lib/
    - cat/
        head.js
        body.js
        main.js
    ```
   其中cat目录定义了一个包，其中包含了3个子模块。main.js作为入口模块，内容如下：
    ```javascript
    var head = require('./head');
    var body = require('./body');
    
    exports.create = function (name) {
      return {
        name: name,
        head: head.create(),
        body: body.create()
      };
    };
    ```
   在其它模块里使用包的时候，需要加载包的入口模块。接着上例，使用require('/home/user/lib/cat/main')
   能达到目的，但是入口模块名称出现在路径里看上去不是个好主意。因此我们需要做点额外的工作，让包使用起来更像是单个模块
    1. **index.js**
       当模块的文件名是index.js，加载模块时可以使用模块所在目录的路径代替模块文件路径，因此接着上例，以下两条语句等价
    ```javascript
    var cat = require('/home/user/lib/cat'); 
    var cat = require('/home/user/lib/cat/index');
    ```
   这样处理后，就只需要把包目录路径传递给require函数，感觉上整个目录被当作单个模块使用，更有整体感

    2. **package.json**
       如果想自定义入口模块的文件名和存放位置，就需要在包目录下包含一个package.json文件，并在其中指定入口模块的路径。上例中的cat模块可以重构如下。
       ```text
        - /home/user/lib/
            - cat/
                + doc/
                - lib/
                  head.js
                  body.js
                  main.js
                + tests/
                  package.json
        ```
       其中package.json内容如下。
        ```json
        {
        "name": "cat",
        "main": "./lib/main.js"
        }
        ```
       如此一来，就同样可以使用require('/home/user/lib/cat')的方式加载模块。NodeJS会根据包目录下的package.json找到入口模块所在位
    

3. 命令行程序
   - 使用NodeJS编写的东西，要么是一个包，要么是一个命令行程序，而前者最终也会用于开发后者。因此我们在部署代码时需要一些技巧，让用户觉得自己是在使用一个命令行程序  
   - 例如我们用NodeJS写了个程序，可以把命令行参数原样打印出来。该程序很简单，在主模块内实现了所有功能。并且写好后，我们把该程序部署在/home/user/bin/node-echo.js这个位置。为了在任何目录下都能运行该程序，我们需要使用以下终端命令。
    ```text
    $ node /home/user/bin/node-echo.js Hello World
    Hello World
    ```
    这种使用方式看起来不怎么像是一个命令行程序，下边的才是我们期望的方式。
    ```text
    $ node-echo Hello World
    ```
    假设node-echo.js存放在C:\Users\user\bin目录，并且该目录已经添加到PATH环境变量里了。接下来需要在该目录下新建一个名为node-echo.cmd的文件，文件内容如下：
    ```text
    @node "C:\User\user\bin\node-echo.js" %*
    ```
    这样处理后，我们就可以在任何目录下使用node-echo命令了


4. 工程目录
    - 了解了以上知识后，现在我们可以来完整地规划一个工程目录了。以编写一个命令行程序为例，一般我们会同时提供命令行模式和API模式两种使用方式，并且我们会借助三方包来编写代码。除了代码外，一个完整的程序也应该有自己的文档和测试用例。因此，一个标准的工程目录都看起来像下边这样
    ```text
    - /home/user/workspace/node-echo/   # 工程目录
        - bin/                          # 存放命令行相关代码
            node-echo
        + doc/                          # 存放文档
        - lib/                          # 存放API相关代码
            echo.js
        - node_modules/                 # 存放三方包
            + argv/
        + tests/                        # 存放测试用例
        package.json                    # 元数据文件
        README.md                       # 说明文件
    ```
    其中部分文件内容如下:
    ```text
    /* bin/node-echo */
    var argv = require('argv'),
        echo = require('../lib/echo');
    console.log(echo(argv.join(' ')));
    
    /* lib/echo.js */
    module.exports = function (message) {
        return message;
    };
    
    /* package.json */
    {
        "name": "node-echo",
        "main": "./lib/echo.js"
    }
    ```


5. NPM
   > NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：  
   - 允许用户从NPM服务器下载别人编写的三方包到本地使用。  
   - 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。  
   - 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。  
   > 可以看到，NPM建立了一个NodeJS生态圈，NodeJS开发者和用户可以在里边互通有无。以下分别介绍这三种场景下怎样使用NPM。  
    1. 下载三方包
       ```
       $ npm install argv
       ...
       argv@0.0.2 node_modules\argv
       ```
       下载好之后，argv包就放在了工程目录下的node_modules目录中，因此在代码中只需要通过require('argv')的方式就好，无需指定三方包路径  
       以上命令默认下载最新版三方包，如果想要下载指定版本的话，可以在包名后边加上@<version>，例如通过以下命令可下载0.0.1版的argv。
        ```text
        $ npm install argv@0.0.1
        ...
        argv@0.0.1 node_modules\argv
        ```
       如果使用到的三方包比较多，在终端下一个包一条命令地安装未免太人肉了。因此NPM对package.json的字段做了扩展，允许在其中申明三方包依赖。因此，上边例子中的package.json可以改写如下：
        ```text
        {
            "name": "node-echo",
            "main": "./lib/echo.js",
            "dependencies": {
                "argv": "0.0.2"
            }
        }
        ```
        这样处理后，在工程目录下就可以使用npm install命令批量安装三方包了。更重要的是，当以后node-echo也上传到了NPM服务器，别人下载这个包时，NPM会根据包中申明的三方包依赖自动下载进一步依赖的三方包。例如，使用npm install node-echo命令时，NPM会自动创建以下目录结构。
        ```text
        - project/
            - node_modules/
                - node-echo/
                    - node_modules/
                        + argv/
                          ...
                          ...
        ```
       如此一来，用户只需关心自己直接使用的三方包，不需要自己去解决所有包的依赖关系.
    2. 安装命令行程序
       > 从NPM服务上下载安装一个命令行程序的方法与三方包类似。例如上例中的node-echo提供了命令行使用方式，只要node-echo自己配置好了相关的package.json字段，对于用户而言，只需要使用以下命令安装程序。
        ```text
        $ npm install node-echo -g
        ```
        参数中的-g表示全局安装，因此node-echo会默认安装到以下位置，并且NPM会自动创建好Linux系统下需要的软链文件或Windows系统下需要的.cmd文件。
        ```text
        - /usr/local/               # Linux系统下
            - lib/node_modules/
                + node-echo/
                  ...
            - bin/
              node-echo
              ...
              ...
        
        - %APPDATA%\npm\            # Windows系统下
            - node_modules\
                + node-echo\
                  ...
                  node-echo.cmd
                  ...
        ```
    3. 发布代码
        > 第一次发布代码前需要注册一个账号，终端下运行`npm adduser`。账号搞定后，接着我们需要编辑package.json文件，加入NPM必需的字段。接着上边node-echo的例子，package.json里必要的字段如下：
        ```text
        {
            "name": "node-echo",           # 包名，在NPM服务器上须要保持唯一
            "version": "1.0.0",            # 当前版本号
            "dependencies": {              # 三方包依赖，需要指定包名和版本号
                "argv": "0.0.2"
            },
            "main": "./lib/echo.js",       # 入口模块位置
            "bin" : {
                "node-echo": "./bin/node-echo"      # 命令行程序名和主模块位置
            }
        }
        ```
        > 之后，我们就可以在package.json所在目录下运行npm publish发布代码了
    4. 版本号
       > 使用NPM下载和发布代码时都会接触到版本号。NPM使用语义版本号来管理代码，这里简单介绍一下。  
       语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。
        + 如果只是修复bug，需要更新Z位。
        + 如果是新增了功能，但是向下兼容，需要更新Y位。
        + 如果有大变动，向下不兼容，需要更新X位。
    5. 灵机一点
        + NPM提供了很多命令，例如install和publish，使用npm help可查看所有命令。 
        + 使用npm help <command>可查看某条命令的详细帮助，例如npm help install。
        + 在package.json所在目录下使用npm install . -g可先在本地安装当前命令行程序，可用于发布前的本地测试。
        + 使用npm update <package>可以把当前目录下node_modules子目录里边的对应模块更新至最新版本。
        + 使用npm update <package> -g可以把全局安装的对应命令行程序更新至最新版。
        + 使用npm cache clear可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。
        + 使用npm unpublish <package>@<version>可以撤销发布自己发布过的某个版本代码。

**总结**:
1. 编写代码前先规划好目录结构，才能做到有条不紊。
2. 稍大些的程序可以将代码拆分为多个模块管理，更大些的程序可以使用包来组织模块。
3. 合理使用node_modules和NODE_PATH来解耦包的使用方式和物理路径。
4. 使用NPM加入NodeJS生态圈互通有无。
5. 想到了心仪的包名时请提前在NPM上抢注。


</span>

参考链接：[七天学会nodeJS](https://nqdeng.github.io/7-days-nodejs/)


### 四、文件操作
1. 文件拷贝
2. Buffer
3. Stream
4. File System
5. Path
6. 遍历目录

### 五、网络操作
1. 实现HTTP服务器
2. HTTP
3. HTTPS
4. URL
5. QUERY STRING
6. ZLIB
7. NET

### 六、进程管理
