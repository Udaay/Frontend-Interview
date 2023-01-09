// Flatten a nested object that contains arrays and objects as children.
// The task is to make the object flat, 
// i.e.there should be no nested children left and everything should be on a single level.

const response = {
  name: 'Manu',
  age: 21,
  characteristics: {
    height: '6 feet',
    complexion: 'dark',
    hair: 'black',
  },
  favouriteMovie: ['Arrow', 'Flash', 'Prison Break'],
  techStack: {
    language: 'Javascript',
    framework: {
      name: 'Nextjs',
      version: '12',
    },
  },
};

const flattenObj = (obj, root = null) => {
  const result = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    let modifiedKey = root === null ? key : `${root}.${key}`;
    if (typeof value !== 'string' && Object.keys(value).length) {
      // if keys length greater than 0, than it mean it's a object
      Object.assign(result, flattenObj(value, modifiedKey));
    } else {
      result[modifiedKey] = value;
    }
  });
  return result;
};

console.log(flattenObj(response));