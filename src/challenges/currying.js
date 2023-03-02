
/**
 sum = currySum()
console.log(sum(10))  10
console.log(sum(20))  30
console.log(sum(10))  40
console.log(sum(30))  70 
console.log(sum(1))   1
*/

export const currySum = () => {
  let total = 0;
  return (num) => {
    total += num;
    return total;
  }
}
// above code has been enclose into IIFE , we can also write the same.

// console.log(currySum_IIFE(10))  10
// console.log(currySum_IIFE(20))  30
// console.log(currySum_IIFE(10))  40
// console.log(currySum_IIFE(30))  70
// console.log(currySum_IIFE(1))   1
export const currySum_IIFE = (() => {
  let total = 0;
  return (num) => {
    total += num;
    return total;
  }
})()


//Currying for sum, in which you can pass as many argument you wish
// sum(10)()  => 10
// sum(10)(20)()  => 30
// sum(10)(20)(10,10)()  => 60
//sum(10,20,10,10)() => 60
// console.log(sum(10, 20, 30, 40, 50, 60)(10, 20)())

export const sum = (...args) => {
  let params = [...args];
  if (args.length === 0) { // base for if no argument passed to it for first time. i.e sum() which will return 0.
    return 0;
  }
  return helper = (...args) => {
    if (args.length === 0) { // some params have been passed
      return params.reduce((a, b) => a + b, 0);
    } else { // no params have been passed
      params.push(...args);
      return helper
    }
  }
  // return helper  
}


function sumFn(a,b,c,d){
  return a + b + c +d;
}

/**
 * 
 * let curriedSum = curry(sumFn);
 * curriedSum(1,2,3,4)
 * curriedSum(1,2,3)(4)
 * curriedSum(1,2)(3,4)
 * curriedSum(1)(2)(3)(4)
 * 
 */


export const curry = (fn) => {
  return curried = (...args) => {
    /**
     * fn.length means , originally how many arguments does fn have.
     * args.length means, number of arguments that has been passed to curried function.
     */
    if (fn.length > args.length) {  // if (fn.length !== args.length) {
      return curried.bind(null, ...args)
    }
    return fn(...args);
  };
}
//Without bind
export const currySumLvl4 = (fn)=>{
  return helper = (...args)=>{
    if(args.length >= fn.length){
      return fn(...args);
    }
    return (...args2) => {
      return helper(...args, ...args2);
    }
  }
}


