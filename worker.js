// worker.js
self.onmessage = function (e) {
  const result = e.data.numbers.reduce((sum, num) => sum + num, 0);
  self.postMessage(result);
};
