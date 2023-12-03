const personDetails1 = {
  firstName: "Uday",
  lastName: "Singh",
};

const personDetails2 = {
  firstName: "Barry",
  lastName: "Allen",
};

function getFullName(country) {
  console.log(`Hello ${this.firstName} ${this.lastName} welcome to ${country}`);
}

const greetPerson1 = getFullName.bind(personDetails1);
const greetPerson2 = getFullName.bind(personDetails2, "CentralCity");

greetPerson1("Mumbai");
greetPerson2();

/**
 * Bind polyfill using call or apply
 */

Function.prototype.myBind = function (context, ...args) {
  const myFunc = this; // Preserving the current function
  const params1 = args; // Preserving the default arguments passed with context

  return function (...params2) {
    myFunc.apply(context, [...params1, ...params2]);
    /** or we can use call also, only exception would argument will be passed as comma seprated
     * myFunc.call(context, ...params1, ...params2);
     */
  };
};

const greetPerson3 = getFullName.myBind(personDetails1);
const greetPerson4 = getFullName.myBind(personDetails2, "CentralCity");

greetPerson3("Mumbai");
greetPerson4();

/**
 * Bind polyfill without using call or apply
 */

// myBindfunction

Function.prototype.myBind2 = function (context, ...args) {
  const myFunc = this;
  const params1 = args;

  return function (...params2) {
    context.__myFunction = myFunc;
    context.__myFunction(...params1, ...params2);
    delete context.__myFunction;
  };
};

const greetPerson5 = getFullName.myBind2(personDetails1);
const greetPerson6 = getFullName.myBind2(personDetails2, "CentralCity");

greetPerson5("Mumbai");
greetPerson6();

/**
 * Call Polyfill
 */

Function.prototype.myCall = function (context, ...args) {
  const myFunc = this;
  // it is possible that __myFunction already exist in context,
  // for that we have to generate unique key for appending function to context
  context.__myFunction = myFunc;
  context.__myFunction(...args);
};

/**
 * PolyFill for apply
 */
//in this args will be array, so we don't need to spread it in function defination
Function.prototype.myApply = function (context, args) {
  const myFunc = this;
  // it is possible that __myFunction already exist in context,
  // for that we have to generate unique key for appending function to context
  context.__myFunction = myFunc;
  context.__myFunction(...args);
};

getFullName.myCall(personDetails2, ["CentralCity"]);

for (var i = 0; i < 10; i++) {
  (function (i) {
    setTimeout(() => console.log(i), 0);
  })(i);
}
