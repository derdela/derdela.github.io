'use strict';

const
  greenDuration = 5 * 60,
  bigGreenDuration = 15 * 60,
  redDuration = 25 * 60;

const
  redMinutes = document.getElementById('red-minutes'),
  redSeconds = document.getElementById('red-seconds'),
  greenMinutes = document.getElementById('green-minutes'),
  greenSeconds = document.getElementById('green-seconds'),
  green = document.getElementById('green'),
  red = document.getElementById('red');

let
  interval,
  counter;

doGreen();
updatePomodoroCounter();


function startRed() {
  doRed();
  startCountdown(redDuration, redMinutes, redSeconds, doYellow);
}

function startGreen() {
  doGreen();
  startCountdown(timeForBigBreak() ? bigGreenDuration : greenDuration, greenMinutes, greenSeconds, doBlue);
}

function timeForBigBreak() {
  return counter % 4 === 0;
}

function startCountdown(clock, minutes, seconds, next) {
  interval = setInterval(() => {
      seconds.innerHTML = leftPad(clock % 60);
      minutes.innerHTML = leftPad(Math.floor(clock / 60));
      clock--;
      if(clock < 0) {
        next();
      }
  }, 1000);
}

function doGreen() {
  resetTimers();
  resetColors();
  document.body.classList = ["green"];
  green.style.display = "Block";
}

function doRed() {
  resetTimers();
  resetColors();
  document.body.classList = ["red"];
  red.style.display = "Block";
}

function doYellow() {
  resetTimers();
  resetColors();
  document.body.classList = ["yellow"];
  yellow.style.display = "Block";
  incrementPomodoroCounter();
}

function doBlue() {
  resetTimers();
  resetColors();
  document.body.classList = ["blue"];
  blue.style.display = "Block";
}

function resetStates() {
  resetColors();
  resetTimers();
}

function resetColors() {
  green.style.display = "None";
  red.style.display = "None";
  yellow.style.display = "None";
  blue.style.display = "None";
}

function resetTimers() {
  clearInterval(interval);
  greenMinutes.innerHTML = leftPad(greenDuration / 60);
  greenSeconds.innerHTML = "00";
  redMinutes.innerHTML = leftPad(redDuration / 60);
  redSeconds.innerHTML = "00";
}

function incrementPomodoroCounter() {
  const counter = parseInt(localStorage.getItem("pomodoroCounter-" + getDayTimestamp()) || 0);
  localStorage.setItem("pomodoroCounter-" + getDayTimestamp(), counter + 1);
  updatePomodoroCounter();
}

function getPomodoroCounter() {
  return localStorage.getItem("pomodoroCounter-" + getDayTimestamp()) || 0;
}

function updatePomodoroCounter() {
  counter = getPomodoroCounter();
  document.getElementById("counter").innerHTML = getPomodoroCounter();
}

function getDayTimestamp() {
  const date = new Date();
  return date.getUTCFullYear().toString() + date.getUTCMonth().toString() + date.getUTCDay().toString();
}

function leftPad(number) {
  if( number < 10) {
    number = "0" + (number).toString()
  }
  return number;
}
