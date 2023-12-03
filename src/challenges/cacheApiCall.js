//Below solution is wrong written by by me , for multiple fetch call with diffrenct endpoint it fails
// because isCacheInValidated is kind of global , it must be associated with the url

const cachedApiCall = (cacheTimer) => {
  let cache = new Map();
  let isCacheInValidated = true;

  return async (url, options = {}) => {
    const key = `${url}${JSON.stringify(options)}`;
    const isKeycached = cache.has(key);
    if (!isKeycached || isCacheInValidated) {
      try {
        let response = await fetch(url, options);
        response = await response.json();
        isCacheInValidated = false;
        setTimeout(() => (isCacheInValidated = true), cacheTimer);
        cache.set(key, response);
      } catch (error) {
        console.log("Error while making fetch call", error);
      }
    }
    return cache.get(key);
  };
};

// Proper Solution

const newCacheApiCall = (cacheTimer) => {
  const cache = new Map();

  return async (url, options = {}) => {
    const key = `${url}${JSON.stringify(options)}`;
    const entry = cache.get(key);

    if (!entry || Date.now() > entry.expiryTime) {
      try {
        console.log("New API call");
        let response = await fetch(url, options);
        response = await response.json();
        cache.set(key, {
          value: response,
          expiryTime: Date.now() + cacheTimer,
        });
      } catch (e) {
        console.log("Error while making fetch call", e);
      }
    }
    return cache.get(key).value;
  };
};

const call = newCacheApiCall(1500);

// first call
// an API call will be made and its response will be cached
call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
  console.log(a)
);
// cached response will be returned
// it will be quick
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log(a)
  );
}, 700);

// a fresh API call is made
// as time for cached entry is expired
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log(a)
  );
}, 2000);
