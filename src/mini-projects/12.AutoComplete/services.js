import { fruits } from "./data.js";

export const getFruits = async (keyword, signal) => {
  const response = await fetch(
    "https://my-json-server.typicode.com/Udaay/dummyData/fruits",
    {
      signal,
    }
  );
  const fruits = await response.json();

  const results = fruits.filter((fruit) =>
    fruit.toLowerCase().includes(keyword.toLowerCase())
  );
  return results;
};

// Mimic Api Call
export const getFruits2 = async (keyword, signal) => {
  console.log("Network Call");
  const results = fruits.filter((fruit) =>
    fruit.toLowerCase().includes(keyword.toLowerCase())
  );

  return new Promise((res) => {
    setTimeout(() => res(results), 150);
  });
};

export const debounce = (callback, delay) => {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback(...args), delay);
  };
};
