const coinChange = function (coins, amount) {
  let max = amount + 1;
  const dp = new Array(amount + 1).fill(max);
  dp[0] = 0;
  for (let i = 1; i <= amount; ++i) {
    for (let j = 0; j < coins.length; ++j) {
      if (coins[j] <= i) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
};

// 示例1：
let coins = [1, 2, 5],
  amount = 11;
// 输出: 3
// 解释: 11 = 5 + 5 + 1

// 示例2：
// let coins = [2],
//   amount = 3;
// 输出: -1

const res = coinChange(coins, amount);
console.log("res: ", res);
