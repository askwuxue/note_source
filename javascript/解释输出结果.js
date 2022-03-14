async function async1() {
  // 2. 同步任务
  console.log("1");
  await async2();
  // 9. 同步任务
  console.log("2");
}

async function async2() {
  // 3. 同步任务
  console.log("12");
  await async3();
  // 7. 同步任务
  console.log("3");
}

async function async3() {
  // 4.同步任务
  console.log("13");
}

// 1. script脚本中的红任务，先执行
console.log("4");

setTimeout(function () {
  // 10. 红任务队列中第一个红任务执行
  console.log("5");
  new Promise(function (resolve) {
    // 11. 同步任务执行
    console.log("6");
    resolve();
    // 13 最后一个微任务队列执行
  }).then(function () {
    console.log("7");
  });
});

// 12. 红任务队列的第二个红任务执行
setTimeout(function () {
  console.log("8");
}, 0);

// 2. 此时调用的第一个函数是同步任务，执行
async1();

// 5. 此时还没有进入微任务队列，同步任务执行
new Promise(function (resolve) {
  console.log("9");
  resolve();
  // 8. 微任务队列出队
}).then(function () {
  console.log("10");
});

// 6. 按照顺序，执行
console.log("11");

// 4  1  12  13  9  11  3  10   2   5  6  7  8
