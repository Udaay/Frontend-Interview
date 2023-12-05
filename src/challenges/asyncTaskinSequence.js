/**
 * Generates a Promise that either resolves or rejects based on a random value.
 *
 * @returns {Promise} A Promise that resolves with a message and the value multiplied by 1000 if the random value is more than 5,
 * or rejects with a message and the value multiplied by 100 if the random value is less than or equal to 5.
 */
const createAsyncTask = () => {
  const value = Math.floor(Math.random() * 10);
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      if (value > 5) {
        reslove(`Success ${value * 100}`);
      } else {
        reject(`Error ${value * 100}`);
      }
    }, value * 100);
  });
};

const asyncSequence = async (asyncTaskList, callback) => {
  let results = [],
    errors = [];
  for (asyncTask of asyncTaskList) {
    try {
      const result = await asyncTask;
      results.push(result);
    } catch (error) {
      errors.push(error);
    }
  }

  callback(results, errors);
};

const asyncSequence2 = async (asyncTaskList, callback) => {
  let results = [],
    errors = [];
  for (let i = 0; i < asyncTaskList.length; i++) {
    const asyncTask = asyncTaskList[i];
    try {
      const result = await asyncTask;
      results.push(result);
    } catch (error) {
      errors.push(error);
    }
  }

  callback(results, errors);
};

const runSequentially = async (asyncTasks, callback) => {
  let results = [],
    errors = [],
    completedTask = 0;
  asyncTasks.reduce((prev, curr) => {
    return prev.finally(() => {
      curr
        .then((res) => {
          results.push(res);
        })
        .catch((error) => {
          errors.push(error);
        })
        .finally(() => {
          if (++completedTask === asyncTasks.length) callback(results, errors);
        });
    });
  }, Promise.resolve());
};

let tasks = [
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
];

asyncSequence2(tasks, (results, errors) => {
  console.log("Results", results);
  console.log("Errors", errors);
});

// runSequentially(tasks, (results, errors) => {
//   console.log("Results", results);
//   console.log("Errors", errors);
// });
