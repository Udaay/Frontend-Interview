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

//WRONG CODE
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

//--------------Salary---Pipe
/**
 * Create a pipe function that composes these three functions into a pipeline. 
 * The pipeline will take a person object, extract the salary, add a bonus, and then deduct taxes to calculate the final salary.

The pipe function should execute these functions in sequence, 
with each function taking the result of the previous one as input, 
to ultimately produce the final calculated salary.
 */
const person = { salary: 10000 };

const getSalary = (person) => person.salary;
const addBonus = (salary) => salary + 200000;
const deductTax = (salary) => salary - salary / 10;

/**
 * A function that takes multiple functions as arguments and returns a new function.
 *
 * @param {Array<function>} funcs - An array of functions.
 * @return {function} A new function that applies each function in the given array to the input object sequentially.
 */
const pipe = (...funcs) => {
  return function (obj) {
    return funcs.reduce((obj, fn) => {
      return fn(obj);
    }, obj);
  };
};

const result = pipe(getSalary, addBonus, deductTax)(person);

///-------------------
/**
+ * Creates a function that, when invoked, executes each function stored as a value in the provided object.
+ * The created function accepts as many arguments as the function values of the object.
+ * 
+ * @param {Object} obj - An object where each key has a function as its value.
+ * @returns {Function} A function that, when executed, calls each function in the object with provided arguments.
+ *
+ * @example
+ * const obj = { a: (x, y) => x + y, b: (x, y) => x - y };
+ * const func = createFunctionFromObject(obj);
+ * func(5, 3);  // Executes: obj.a(5, 3) and obj.b(5, 3)
+ */
const obj = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
};

function createFunctionFromObject(obj) {
  return (...args) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "function") {
        obj[key] = obj[key](...args);
      } else {
        obj[key] = createFunctionFromObject(obj[key])(...args);
      }
    });
    return obj;
  };
}

console.log(createFunctionFromObject(obj)(1, 1, 1));
