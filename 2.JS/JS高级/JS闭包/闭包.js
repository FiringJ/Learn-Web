function f () {
  let a = 1
  return function () {
    console.log(a++)
  }
}

let f1 = f()
f1()
f1()
f1()
f1 = null  // 变量被回收

/*
函数执行上下文
*/
FunctionExecutionContext = {
  ThisBinding: 'global',
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: 'Declarative',
      a: 'uninitialized'
    },
    outer: 'global'
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: 'Declarative'
    },
    outer: 'global'
  }
}
