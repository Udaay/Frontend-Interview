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

export const memoProduct = memoizedFunc(product);

const first = performance.now();
console.log(`Result: `, memoProduct(123893, 1299123));
console.log('Time: ', performance.now() - first);

const second = performance.now();
console.log(`Result:`, memoProduct(123893, 1299123));
console.log('Time: ', performance.now() - second);

export const memoizedFibonacci = (
  () => {
    const cache = {};

    return (n) => {
      if (n in cache) {
        return cache[n];
      } else {
        if (n < 2) {
          return n;
        } else {
          cache[n] = memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
          return cache[n];
        }
      }
    };
  }
)();

// converted above code into short.
const memoizedFibo = (() => {
  let cache = {}
  return (n) => {
    if (n <= 2) return n;
    else if (!cache[n]) {
      cache[n] = memoizedFibo(n - 1) + memoizedFibo(n - 2);
    }
    return cache[n];
  }
})()


export const increment = (
  () => {
    let counter = 0;
    return()=>{
      counter++;
      console.log(counter);
    }
  }
)();
