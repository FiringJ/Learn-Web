/*
let a = 20;
const b = 30;
var c;

function multiply(e, f) {
  var g = 20;
  return e * f * g;
}

c = multiply(20, 30);
*/

/* 全局执行上下文 */
GlobalExecutionContext = {
  /* this绑定为全局对象 */
  ThisBinding: '<Global Object>',
  /* 词法环境 */
  LexicalEnvironment: {
    // 环境记录
    EnvironmentRecord: {
      Type: "Object", // 对象环境记录
      // 方法标识符绑定在这里 let const创建的变量在这里
      a: '<uninitialized>',
      b: '<uninitialized>',
      multiply: '<func>'
    },
    // 外部环境引入
    outer: '<null>'
  },
  /* 变量环境 */
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // var创建的变量绑定在这里
      c: undefined
    },
    outer: null
  }
}

/* 函数执行上下文 */
FunctionExecutionContext = {
  ThisBinding: '<Global Object>',
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: 'Declarative',  // 声明性环境记录
      // 标识符绑定在这里  arguments对象在这里
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: '<GlobalEnvironment>'
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: 'Declarative',
      g: undefined
    },
    outer: '<GlobalEnvironment>'
  }
}

/*
console.log(add(1, 2))

function add(a, b) {
  return a + b
}
*/
