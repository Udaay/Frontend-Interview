/*
Input:
computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();

Output:
143545000
*/

export function ComputeAmount() {
  this.amount = 0;
  this.crore = function(val){
    this.amount += (val * Math.pow(10, 7))
    return this;
  }
  this.lacs = function(val){
    this.amount += (val * Math.pow(10, 5))
    return this;
  }
  this.thousand = function(val){
    this.amount += (val * Math.pow(10, 3))
    return this;
  }
  this.hundred = function(val){
    this.amount += (val * 100)
    return this;
  }
  this.unit = function(val){
    this.amount += val
    return this;
  }
  this.value = function(){
    return this.amount;
  }
}

/**
 * calculator.add(10).subtract(2).divide(2).multiply(5);
    console.log(calculator.total);
//20
 */

export const calculator = {
  total: 0,
  test: function(){
    console.log(this === calculator); // true
  },
  testArrow: () => {
    //`this` inside arrow function points to object where `this` written outside arrow function points, OR where it is lexically placed inside code (staticly )
    console.log(this); // this points to window
  },
  testGlobal: this, // this points to window

  add: function (val) {
    this.total += val;
    return this;
  },
  subtract: function (val) {
    this.total -= val;
    return this;
  },
  divide: function (val) {
    this.total /= val;
    return this;
  },
  multiply: function (val) {
    this.total *= val;
    return this;
  }
};