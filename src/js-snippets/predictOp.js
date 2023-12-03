export function add(a, b) {
  this.a = a;
  this.b = b;

  console.log(this.a, this.b, "Initial value");

  add.prototype.assignA = function (a) {
    this.a = a;
    console.log("Assign a", this.a);
  };

  add.prototype.assignB = function (b) {
    this.b = b;
    console.log("Assign b", this.b);
  };

  this.logValue = () => {
    console.log(this);
  };
}

async function test() {
  setTimeout(() => {
    console.log("1");
  }, 1000);

  new Promise((resolve) => {
    console.log("2");
    setTimeout(() => {
      console.log("3");
    }, 2000);
  });
}

//---------------

const generatePromise = (name, baseValue) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(`${name} ${baseValue || ""} ${Date.now()}`);
    }, 3000);
  });
};

const arr = [
  generatePromise.bind(null, "Apple"),
  generatePromise.bind(null, "Ball"),
  generatePromise.bind(null, "Cat"),
];

/**
 * use the above arr to print the following o/p
 * Apple 3482093482
 * ball Apple 849834023
 * Car Ball Apple 38294723
 */
// const p1 = generatePromise.bind(null, "Apple");
// console.log(p1().then(d => {}));

//Solution-------------------

Promise.all(arr.map((promise) => promise()))
  .then((results) => {
    results.forEach((result) => {
      console.log(result);
    });
  })
  .catch((error) => {
    console.error(error);
  });
