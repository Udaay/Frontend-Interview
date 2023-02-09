import { ComputeAmount, calculator } from "./src/challenges/method-chaining.js"


const computeAmount = new ComputeAmount();
const amount = computeAmount.lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();
console.log(amount === 143545000);


calculator.add(10).subtract(2).divide(2).multiply(5);
console.log(calculator.total);