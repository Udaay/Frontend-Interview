/**
 * Creates a circuit breaker function that wraps the given function and adds failure handling and cooldown period.
 *
 * @param {function} fn - The function to be wrapped by the circuit breaker.
 * @param {number} maxFailedCount - The maximum number of consecutive failures allowed before triggering the cooldown period.
 * @param {number} thresholdTime - The duration in milliseconds that defines the cooldown period.
 * @return {function} - The wrapped function that implements the circuit breaker logic.
 */
const circuitBreaker = (fn, maxFailedCount, thresholdTime) => {
  let failedCount = 0;
  let lastResetTime = Date.now();

  return function (...args) {
    const isThresholdPeriodOver = Date.now() - lastResetTime > thresholdTime;

    if (isThresholdPeriodOver) {
      failedCount = 0;
      lastResetTime = Date.now();
    }

    if (failedCount < maxFailedCount || isThresholdPeriodOver) {
      try {
        const result = fn(...args);
        failedCount = 0; // Reset failedCount on successful execution
        return result; // Return the result of the original function
      } catch (e) {
        failedCount++;
        lastResetTime = Date.now();
        console.log("Error occurred");
      }
    } else {
      console.log("Cool Down period");
    }
  };
};

//Below code are for testing purpose only
// Define a mock function to simulate behavior
const mockFunction = (i) => {
  const randomNumber = Math.random();
  if (randomNumber > 0.6) {
    return `Success ${i}`;
  } else {
    console.log(`Failed ${i}`);
    throw new Error(`Failed ${i}`);
  }
};

// Wrap the mock function with the circuit breaker
const wrappedFunction = circuitBreaker(mockFunction, 3, 2500); // Assuming 3 failures within 2.5 seconds

// Test the wrapped function
for (let i = 0; i < 45; i++) {
  setTimeout(() => {
    console.log(`Attempt ${i + 1}:`);
    try {
      const result = wrappedFunction(i);
      console.log(`Result: ${result}`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
    console.log("---");
  }, i * 200);
}
