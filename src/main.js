const greetItem = document.querySelector("#greeting");
const choiceButtons = document.querySelectorAll(".choice-btn");
const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");

const playerPick = document.querySelector("#player-pick");
const computerPick = document.querySelector("#computer-pick");

const resultMessage = document.querySelector("#result");
const resetButton = document.querySelector("#reset-btn");

let loseCount = 0;
let winCount = 0;
let roundOfPlay = 0;

const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const emojis = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};
const computerChoices = Object.keys(beats);

let userName = "";
let winingScore = 5;
let userScore = 0;
let botScore = 0;
let gameOver = false;

function getComputerChoice() {
  let index = Math.floor(Math.random() * computerChoices.length);
  return computerChoices[index];
}

function getResult(userChoice, compChoice) {
  if (userChoice === compChoice) return "draw";
  if (beats[userChoice] === compChoice) return "win";
  return "lose";
}

function endGame(winner) {
  gameOver = true;
  if (winner === "user") {
    resultMessage.innerHTML = "شما برنده شده اید🎉";
  } else if (winner === "computer") {
    resultMessage.innerHTML = "حریف برنده شد💻";
  }
  resetButton.classList.remove("hidden");

  saveData(loseCount, winCount, roundOfPlay);
}

choiceButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (gameOver) return;

    const userChoice = btn.dataset.choice;
    const compChoice = getComputerChoice();
    const result = getResult(userChoice, compChoice);

    if (result === "win") userScore += 1;
    else if (result === "lose") botScore += 1;

    playerScore.textContent = userScore;
    computerScore.textContent = botScore;

    playerPick.textContent = emojis[userChoice];
    computerPick.textContent = emojis[compChoice];

    if (userScore === winingScore) {
      winCount += 1;
      roundOfPlay++;
      endGame("user");
    } else if (botScore === winingScore) {
      loseCount += 1;
      roundOfPlay++;
      endGame("computer");
    }
  });
});

function saveData(lose, win, rounds) {
  localStorage.setItem("win", JSON.stringify(win));
  localStorage.setItem("lose", JSON.stringify(lose));
  localStorage.setItem("rounds", JSON.stringify(rounds));
}

showHistory();
function showHistory() {
  let win = localStorage.getItem("win");
  console.log(win);
}

resetButton.addEventListener("click", () => {
  console.log("reset");
  userScore = 0;
  botScore = 0;
  gameOver = false;
  playerScore.textContent = userScore;
  computerScore.textContent = botScore;

  playerPick.textContent = "❔";
  computerPick.textContent = "❔";

  resultMessage.innerHTML = "حرکت رو انتخاب کن";
  resetButton.classList.add("hidden");
});

// greeting
function getGreeting(hour, name) {
  let greeting;
  if (hour < 6) greeting = "شب بخیر";
  else if (hour < 12) greeting = "صبح بخیر";
  else if (hour < 18) greeting = "بعداز ظهر بخیر";
  else greeting = "شب بخیر";

  greetItem.innerHTML = `${greeting}, ${name} :)`;

  if (hour >= 18) {
    document.querySelector("html").classList.add("dark");
  } else {
    document.querySelector("html").classList.remove("dark");
  }
}

getGreeting(new Date().getHours(), userName);
