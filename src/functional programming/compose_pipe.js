// Compose: ramdajs library which provide inbuilt
// in compose we go right to left

// data --> fn --> data --> fn
//for starter make a pipeline that multiply & remove the negative sign

const multiplyBy30 = (num) => {
  return num * 30;
};

const absolute = (num) => {
  return Math.abs(num);
};

// Now I want to combine these two function somethinf like this => compose(multiplyBy30, absolute)

const simpleCompose = (f, g) => (data) => f(g(data));
const mulAndAbsSimple = simpleCompose(multiplyBy30, absolute);
mulAndAbsSimple(-3);

// pipe is same as compose
//in pipe we go from left to right

const simplePipe = (f, g) => (data) => g(f(data));

// Suppose we wanna call like this
f1(f2(f3(30)));
//with pipe => execution will be from left to right
simplePipe(f3, f2, f1)(30);

//with compose => execution will be from right to left
simpleCompose(f1, f2, f3)(30);

// kind of more close towards generic, where we can pass as many functions as we want,
//this may not work for more than two function passed to compose
const compose =
  (...fns) =>
  (num) =>
    fns.reduce((acc, curr) => {
      return acc(curr(num));
    });

const mulAndAbs = compose(multiplyBy30, absolute);

mulAndAbs(-4);

const addby10 = (num) => {
  console.log("adding");
  return num + 10;
};

const composeNew =
  (...fns) =>
  (num) =>
    fns.reduce((output, fn) => fn(output), num);

const mulAndAbsAdd = composeNew(multiplyBy30, addby10, absolute);
mulAndAbsAdd(4);

// const compose = (f, g) => (...args) => f(g(...args));
// const purchased = (...fns) => fns.reduce((compose));

/**
 *
 const multiplyBy30 = (num) => {
    console.log('mul')
  return num * 30;
};

const absolute = (num) => {
    console.log('abs')
  return Math.abs(num);
};

const addby10 = (num) =>{ 
    console.log('adding')
    return num + 10;}


const compose =
  (...fns) =>
  (num) => fns.reduce((output, fn) => {
      console.log(output, fn);
      return fn(output)}, num);

const mulAndAbs = compose(multiplyBy30, addby10, absolute);

mulAndAbs(4);
 *
 */
