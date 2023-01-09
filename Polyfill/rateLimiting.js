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
  }

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
      return
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      if (trailing) {
        func.call(this, ...args);
      }
      leadingFuncInvoked = false; // make leadingFuncInvoked false, in case of leading , leading function should able to execute after the wait.
    }, wait)
  }

}

// Basic Throtte Function
/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) { 
  let shouldWait = false;
  return (...args)=>{
    if(shouldWait) return;

    func(...args);
    shouldWait = true;
    setTimeout(()=> shouldWait = false, wait);
  }
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

function throttleEdgeCase(func, wait){
  let shouldWait = false;
  let waitingArgs;
  return (...args)=>{

    const timeoutFunc = ()=>{
      if(waitingArgs === null){
        shouldWait = false;
      }else{
        func.apply(this, args);
        waitingArgs = null;
        setTimeout(timeoutFunc, wait);
      }
    }
    
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

  }
}