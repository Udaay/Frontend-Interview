`compose` and `pipe` are both higher-order functions used in functional programming to combine multiple functions into a single function. They operate in opposite directions when chaining functions together.

### `compose`:

- **Right-to-left Execution**: In `compose`, the functions are executed from right to left.
- **Usage**: The result of the rightmost function becomes the argument for the next function, and so on until all functions are executed.
- **Example**:

```javascript
const compose = (...functions) => (arg) =>
  functions.reduceRight((acc, fn) => fn(acc), arg);
```

### `pipe`:

- **Left-to-right Execution**: In `pipe`, the functions are executed from left to right.
- **Usage**: The result of the leftmost function becomes the argument for the next function, and so on until all functions are executed.
- **Example**:

```javascript
const pipe = (...functions) => (arg) =>
  functions.reduce((acc, fn) => fn(acc), arg);
```

### Implementations:

Here's how you can implement `compose` and `pipe` in JavaScript:

```javascript
const compose = (...functions) => (arg) =>
  functions.reduceRight((acc, fn) => fn(acc), arg);

const pipe = (...functions) => (arg) =>
  functions.reduce((acc, fn) => fn(acc), arg);

// Example usage:
const add = (x) => x + 10;
const multiply = (x) => x * 2;
const subtract = (x) => x - 5;

const composed = compose(subtract, multiply, add);
const piped = pipe(add, multiply, subtract);

console.log(composed(5)); // Output: 15 (add -> multiply -> subtract)
console.log(piped(5)); // Output: 15 (subtract -> multiply -> add)
```

Both `compose` and `pipe` allow you to create a new function by combining multiple functions. The difference lies in the order in which the functions are applied. `compose` applies functions from right to left, while `pipe` applies them from left to right.