# Generator函数
生成器generator是ES6标准引入的新的数据类型，一个generator看上去像一个函数，但可以返回多次，通过yield关键字，把函数的执行流挂起，为改变执行流程提供了可能，从而为异步编程提供解决方案

## 方法
- `Generator.prototype.next()`：返回一个由yield表达式生成的值。
- `Generator.prototype.return()`：返回给定的值并结束生成器。
- `Generator.prototype.throw()`：向生成器抛出一个错误。

