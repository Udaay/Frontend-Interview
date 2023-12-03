// Call 100 times and should retuen the same results always
//http api get call is idempotence

function notGood(num) {
  console.log(num);
}

Maths.abs(-50);

// not a idempotence
function randomNum() {
  console.log(Math.random());
}
