const INTERVAL_MS = 1000/60; //It will be 60FPS

const startButton = document.querySelector('#start-button');
const stopButton = document.querySelector('#stop-button');
const resetButton = document.querySelector('#reset-button');
const minuteTimer = document.querySelector('#minute-timer');
const secondTimer = document.querySelector('#second-timer');
const millisecTimer = document.querySelector('#millisec-timer');

startButton.addEventListener('click', handleStart);
stopButton.addEventListener('click', handleStop);
resetButton.addEventListener('click', handleReset);


let timeInterval;
let timerID;
let startTime = 0;
let elapsedMiliSecondAfterStop = 0;

function setTimer(min, sec, miliSec) {
  minuteTimer.textContent = min;
  secondTimer.textContent = sec;
  millisecTimer.textContent = miliSec;
}

function handleStart() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;

  startTime = Date.now();

  // Using Reques Animation Frame
  // timerID = requestAnimationFrame(updateTimer)

  //Using SetInterval

  timerID = setInterval(updateTimer, INTERVAL_MS);

}

function handleStop() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  elapsedMiliSecondAfterStop = Date.now() - startTime + elapsedMiliSecondAfterStop;
  // cancelAnimationFrame(timerID);

  clearInterval(timerID);
}

function handleReset() {
  startButton.disabled = false;
  resetButton.disabled = true;
  setTimer('00','00','000');
}

function updateTimer() {
  const elapsedMilliSecond = Date.now() - startTime + elapsedMiliSecondAfterStop;
  const elapsedSecond = elapsedMilliSecond / 1000;
  const elapsedMinutes = elapsedSecond / 60

  const miliText = formatNumber(elapsedMilliSecond % 1000, 3);
  const secText = formatNumber(Math.floor(elapsedSecond) % 60, 2);
  const minText = formatNumber(Math.floor(elapsedMinutes), 2);

  setTimer(minText, secText, miliText);
  // timerID = requestAnimationFrame(updateTimer)
}

function formatNumber(number, desiredLength) {
  let stringNumber = String(number);

  if(stringNumber.length > desiredLength){
    return stringNumber.slice(0, desiredLength);
  }

  return stringNumber.padStart(desiredLength, 0);
}
