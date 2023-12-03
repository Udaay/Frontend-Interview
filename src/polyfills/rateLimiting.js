/**
 *  
Throttling is a technique used to control the rate at which a function gets called. It's useful when you want to limit the amount of times a function is executed, for example when handling events like scroll, resize, or key press. With throttling, you can ensure that a function is only called once every specified amount of time.

Debouncing, on the other hand, is a technique used to control the frequency of function calls. It's useful when you want to delay the execution of a function until after a certain amount of time has passed without it being called. For example, you might use debouncing when working with a search bar, to ensure that the search function is only executed after the user has stopped typing for a certain amount of time.

Question: Can we use throtttle in place of deboubce or vice versa ????

Yes, it's possible to use throttle in place of debounce, but they serve different purposes and may produce different results.

Throttling is used to limit the rate at which a function is executed, while debouncing is used to delay the execution of a function until after a specified amount of time has passed without it being called. 

=>If you use throttle in place of debounce, you may end up executing the function more frequently than you intended, especially if the events that trigger the function are happening frequently.

=>On the other hand, if you use debouncing in place of throttling, the function may not be executed as frequently as you would like, especially if the events that trigger the function are happening rapidly.

So, depending on your requirements, you should choose the right technique to use. If you want to limit the rate of function execution, use throttling. If you want to delay the execution of a function until a certain amount of time has passed without it being called, use debouncing.
 */

/** Basic Debounce function.
 * @param {(...args: any[]) => any} func
 * @param {number} wait.
 * @returns {(...args: any[]) => any}
 */
function debounce(func, wait) {
  // your code here
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), wait);
  };
}

/** debounce() with leading & trailing option.
 * @param {(...args: any[]) => any} func.
 * @param {number} wait.
 * @param {boolean} option.leading, whether to invoke right away.
 * @param {boolean} option.trailing, whether to invoke after the delay.
 * @returns {(...args: any[]) => any}.
 */
function debounce(func, wait, option = { leading: false, trailing: true }) {
  let timer;
  let leadingFuncInvoked = false;
  const { leading, trailing } = option;

  return (...args) => {
    if (!trailing && !leading) return;

    if (leading && !leadingFuncInvoked) {
      func.call(this, ...args);
      leadingFuncInvoked = true;
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      if (trailing) {
        func.call(this, ...args);
      }
      leadingFuncInvoked = false; // make leadingFuncInvoked false, in case of leading , leading function should able to execute after the wait.
    }, wait);
  };
}

// Basic Throtte Function
/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
  let shouldWait = false;
  return (...args) => {
    if (shouldWait) return;

    func(...args);
    shouldWait = true;
    setTimeout(() => (shouldWait = false), wait);
  };
}

//wait time = 1000ms, and suppose user is typing each character at interval of 300ms
// Type S - Call throttled function with S
// Type a - Do nothing: 700ms left to wait
// Type m - Do nothing: 400ms left to wait
// Type a - Do nothing: 100ms left to wait
// Delay is over - Nothing happens
// Type n - Call throttled function with Saman
// No more typing
// Delay is over - Nothing happens

/**
 * If you pay close attention you will notice that our second call to the throttled function
 * doesn't run until 1,200 milliseconds later.
 * That is 200 milliseconds after our delay.
 *  Now depending on your throttle needs this may be fine,
 * but in most cases you want to queue up any action that occurs in your throttle
 * so that as soon as your delay is over it will call the previous iteration of the function.
 * Let's look at how to implement that.
 */

function throttleEdgeCase(func, wait) {
  let shouldWait = false;
  let waitingArgs = null;
  return (...args) => {
    const timeoutFunc = () => {
      if (waitingArgs === null) {
        shouldWait = false;
      } else {
        func.apply(this, waitingArgs);
        waitingArgs = null;
        // As we have called the function the waiting arguments, will have to make
        //shouldWait to false after specified delay, this will again call the timeoutFunc
        // with waitingArgs as null;
        setTimeout(timeoutFunc, wait);
      }
    };

    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    func.apply(this, args);
    shouldWait = true;
    setTimeout(timeoutFunc, wait);

    /**
     * OR
     * setTimeout(()=> {
      if(waitingArgs == null){
        shouldWait = false;
      } else {
        func(waitingArgs)
        waitingArgs = null;
        setTimeout(() => shouldWait = false, wait);
      }
    }, wait)
     */
  };
}
