/*
function foo() {
  console.log('1');
  bar();
  console.log('3');
}

function bar() {
  console.log('2');
}

foo();
*/

GlobalExecutionContext = {
  ThisBinding: '<Global Object>',
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: 'Object',
      // 函数声明、let/const变量放在这里
      foo: '<func>',
      bar: '<func>'
    },
    outer: 'null'
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: 'Object'
      // var变量放在这里
    },
    outer: 'null'
  }
}

FunctionExecutionContext = {
  ThisBinding: '<Global Object>',
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: 'Declarative',
      // arguments对象在这里
      Arguments: {length: 0}
    },
    outer: '<GlobalEnvironment>'
  },
  VariableEnvironment: {
    EnvironmentRecord: {

    },
    outer: '<GlobalEnvironment>'
  }
}
