// Time complexity: O(2^n)
// Space complexity: O(n)
function fibRec(n) {
  if (n < 2) return n;
  return fibRec(n - 1) + fibRec(n - 2);
}

// Time complexity: O(n)
// Space complexity: O(n)
function fibRecMemo(n, memo = {}) {
  if (n < 2) return n;
  if (memo[n]) return memo[n];
  memo[n] = fibRecMemo(n - 1, memo) + fibRecMemo(n - 2, memo);
  return memo[n];
}
