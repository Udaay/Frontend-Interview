//currying

const multiply = (a, b) => a * b;
multiply(3, 4);

const curriedMultiply = (a) => (b) => a * b;
curriedMultiply(4)(5);
