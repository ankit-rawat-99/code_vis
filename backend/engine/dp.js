function fibonacciDP(n) {

    let states = [];
    let dp = new Array(n + 1).fill(null);

    dp[0] = 0;
    states.push({ dp: [...dp], highlight: [0] });

    if (n >= 1) {
        dp[1] = 1;
        states.push({ dp: [...dp], highlight: [1] });
    }

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];

        states.push({
            dp: [...dp],
            highlight: [i],
            formula: `${dp[i-1]} + ${dp[i-2]}`
        });
    }

    return states;
}

// =================== REAL 0/1 KNAPSACK ===================

function knapsackDP(input) {

    const { weights, values, capacity } = input;

    let n = weights.length;
    let dp = Array.from({ length: n + 1 }, () =>
        new Array(capacity + 1).fill(0)
    );

    let states = [];

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {

            if (weights[i-1] <= w) {

                dp[i][w] = Math.max(
                    values[i-1] + dp[i-1][w - weights[i-1]],
                    dp[i-1][w]
                );

            } else {
                dp[i][w] = dp[i-1][w];
            }

            states.push({
                dp: dp.map(row => [...row]),
                highlight: [i, w],
                item: i,
                weight: w
            });
        }
    }

    return states;
}

function lcsDP(input) {

    const { str1, str2 } = input;

    let m = str1.length;
    let n = str2.length;

    let dp = Array.from({ length: m + 1 }, () =>
        new Array(n + 1).fill(0)
    );

    let states = [];

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {

            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }

            states.push({
                dp: dp.map(row => [...row]),
                highlight: [i, j],
                char1: str1[i - 1],
                char2: str2[j - 1]
            });
        }
    }

    return states;
}


module.exports = {
  fibonacciDP,
  knapsackDP,
  lcsDP
};
