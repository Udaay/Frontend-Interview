//HOF

//take 1 or more fucntion as a argument
//or
// return a another function

const hof = () => () => 5;

const newHof = (fn) => fn(5);
newHof((x) => x);

//Closure
//when a fucntion access to a variable which is define outside to it's immediate function scope
//increment function remembers the variable used in local which is used in outer function, even if the outer function is finished running

const closureFn = function () {
  let count = 0;
  return function increment() {
    count++;
    return count;
  };
};
