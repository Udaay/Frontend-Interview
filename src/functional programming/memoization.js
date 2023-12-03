function addTo80(num) {
  console.log(
    "This operation take long time some COmplex Operation running here"
  );
  return num + 80;
}

const memoizedFunction = (fn) => {
  let cache = {};
  return (num) => {
    if (num in cache) {
      return cache[num];
    }
    cache[num] = fn(num);
    return cache[num];
  };
};

const newAdd = memoizedFunction(addTo80);
