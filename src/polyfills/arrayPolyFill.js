/**
 * Map Polyfill
 */
let numbers = [1, 2, 3, 4, 5];
// Always returns a new array.
const square = numbers.map(num => num ** 2);
console.log('square', square);

//Polyfill for map function
const myMap = function (callback) {
  const arr = this;
  let index = -1;

  const newArray = [];
  const length = arr.length ? arr.length : 0;

  while (++index < length) {
    newArray[index] = callback(arr[index], index, arr);
  }
  return newArray;
}

Array.prototype.myMap = myMap;
const mySquare = numbers.myMap(a => a ** 2);
console.log('mySquare', mySquare);

/**
 * Filter Polyfill
 */
const evenNum = numbers.filter(num => num % 2);
console.log('evenNum', evenNum);

const myFilter = function (callback) {
  const arr = this;
  const newArray = [];
  const length = arr.length ? arr.length : 0;

  let index = -1;
  let resIndex = 0;

  while (++index < length) {
    const value = arr[index];
    if (callback(value)) {
      newArray[resIndex++] = value;
    }
  }
  return newArray;
}

Array.prototype.myFilter = myFilter;
const myEvenNum = numbers.myFilter(num => num % 2);
console.log('myEvenNum', myEvenNum);

/**
 * Reduce Polyfill
 */
const sum = numbers.reduce((prev, curr) => prev + curr, 0);
console.log(sum, 'sum');

const myReduce = function (callback, initialValue) {
  const arr = this;
  const length = arr.length ? arr.length : 0;
  let index = -1;
  let accumulator = initialValue ?? arr[++index];
  while (++index < length) {
    accumulator = callback(accumulator, arr[index], index, arr);
  }
  return accumulator;
}

Array.prototype.myReduce = myReduce;

const mysum = numbers.myReduce((prev, curr) => prev * curr);
console.log(mysum, 'sum');


export const flatArray = (nestedArr, depth = 1) => {
  const flat = [];
  let currentDepth = 0
  const handleArray = (array, currentDepth) => {
    array.forEach(ele => {
     if(ele instanceof Array && currentDepth <= depth){
       handleArray(ele, ++currentDepth);
     } else flat.push(ele);
    });
  }
  handleArray(nestedArr, ++currentDepth);
  return flat;
}