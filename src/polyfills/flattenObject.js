// Flatten a nested object that contains arrays and objects as children.
// The task is to make the object flat, 
// i.e.there should be no nested children left and everything should be on a single level.



const flattenObj = (obj, root = null) => {
  let result = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    let modifiedKey = root === null ? key : `${root}.${key}`;
    if (typeof value !== 'string' && Object.keys(value).length) {
      // if keys length greater than 0, than it mean it's a object
      // Object.assign(result, flattenObj(value, modifiedKey));
      result = { ...result, ...flattenObj(value, modifiedKey) }
    } else {
      result[modifiedKey] = value;
    }
  });
  return result;
};

export const deepCopy = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    // It's a primitive value.
    return obj;
  }

  let copy;
  if (Array.isArray(obj)) {
    // passing deepCopy as a callback to map method, which will return a new array.
    return obj.map(deepCopy);
  } else {
    copy = {}
    Object.keys(obj).forEach((key) => {
      console.log('first', key)
      copy[key] = deepCopy(obj[key]);
    });
  }
  return copy;
}

const curry = (fn) => {
  return curried = (...args) => {
    if (fn.length < args.length) {
      return curried.bind(null, ...args)
    }
    return fn(...args);
  };
}