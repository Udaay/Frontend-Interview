const product = (num1, num2) => {
  // Expensive function.
  for (let i = 0; i < 400000; i++);
  return num1 * num2;
};

// Its a generalizef func to memoized the result of heavy operation.
const memoizedFunc = (func, context) => {
  const cache = {}
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      const result = func.call(context || this, ...args);
      cache[key] = result;
    }
    return cache[key];
  }
}

const memoProduct = memoizedFunc(product);

const first = performance.now();
console.log(`Result: `, memoProduct(123893, 1299123));
console.log('Time: ', performance.now() - first);

const second = performance.now();
console.log(`Result:`, memoProduct(123893, 1299123));
console.log('Time: ', performance.now() - second);