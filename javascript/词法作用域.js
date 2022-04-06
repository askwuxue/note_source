var a = 2;

// let 声明的变量不会挂载到window对象上
// let a = 2;
// 词法作用域在代码书写结果确定结果
function foo() {
  console.log(a);
}

function bar() {
  var a = 3;
  foo();
}

bar();
