//partial Application: apply portion of the paraameters and next time i call apply rest of the parameters

//currying
const curriedMultiply = (a) => (b) => (c) => a * b * c;
curriedMultiply(4)(5)(3);

//partial
const multiply = (a, b, c) => a * b * c;
const partialMultiplyBy5 = multiply.bind(null, 5);
partialMultiplyBy5(4, 5);
