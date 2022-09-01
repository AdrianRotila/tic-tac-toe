"use strict";

// HTML Elements
var cells = document.querySelectorAll(".grid__cell");
var grid = document.querySelector(".grid");
var button = document.querySelector(".reset");
var endWindow = document.querySelector(".message");
var endMessage = document.querySelector(".message--text");
var resetButton = document.querySelector(".message--button");
var trapButton = document.querySelector(".trapdoor__button"); // Sound Elements

var selectAudio = new Audio("./audio/click-sound.wav");
var negativeAudio = new Audio("./audio/not-allowed.wav");
var winAudio = new Audio("./audio/win.wav");
var lostAudio = new Audio("./audio/lose.wav");
var cleanAudio = new Audio("./audio/clear-board.wav");
var startAudio = new Audio("./audio/start.wav");
var gridStoredValues = ["", "", "", "", "", "", "", "", ""];
var X_CLASS = "X";
var O_CLASS = "O";
var currentPlayer = "X";
var winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [2, 5, 8], [1, 4, 7], [2, 4, 6], [0, 4, 8]]; // Starting window

var welcomeWindow = function welcomeWindow() {
  endWindow.style.opacity = "1";
  endWindow.classList.add("show");
  endMessage.innerHTML = "Tic-Tac-Toe";
  resetButton.innerHTML = "Start Game";
}; // Final window with the result


var gameOver = function gameOver() {
  endWindow.style.opacity = "0.9";
  resetButton.innerHTML = "Start Again";
  endWindow.classList.add("show");
}; // Winning Message


var winningMessage = function winningMessage(winner) {
  winAudio.play();
  endMessage.innerHTML = "Player ".concat(winner, " Wins !");
}; // Tie Message


var tieMessage = function tieMessage() {
  endMessage.innerHTML = "It's a Tie !";
}; // Swap Turn Hover 


var gridClassSwap = function gridClassSwap() {
  if (grid.classList.contains("O")) {
    grid.classList.remove(O_CLASS);
    grid.classList.add(X_CLASS);
  } else {
    grid.classList.remove(X_CLASS);
    grid.classList.add(O_CLASS);
  }
}; // Restore Cells Value and Classes


var resetCellsData = function resetCellsData(cell) {
  cell.innerHTML = "";
  cell.classList.remove(X_CLASS);
  cell.classList.remove(O_CLASS);
}; // Clear the Board


var clearBoard = function clearBoard() {
  gridStoredValues = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  cells.forEach(function (cell) {
    return resetCellsData(cell);
  });
  endWindow.classList.remove("show");
  grid.classList.remove(O_CLASS);
  grid.classList.add(X_CLASS);
}; // Reset Button


resetButton.addEventListener("click", function () {
  if (resetButton.innerHTML === "Start Game") {
    startAudio.play();
  }

  clearBoard();
}); // Trap Button

trapButton.addEventListener("click", function () {
  if (gridStoredValues.every(function (cell) {
    return cell === "";
  })) {
    negativeAudio.play();
  } else {
    cleanAudio.play();
    clearBoard();
  }
}); // Cells Value and Cells Classes Handling

var updateBoard = function updateBoard(clickedCell, index) {
  gridStoredValues[index] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
  clickedCell.classList.add(currentPlayer);
}; // Turn Swapping


var changeTurn = function changeTurn() {
  if (currentPlayer === "X") {
    gridClassSwap();
    currentPlayer = "O";
  } else {
    gridClassSwap();
    currentPlayer = "X";
  }
}; // Result Check


var resultCheck = function resultCheck() {
  for (index in winConditions) {
    var winSubArray = winConditions[index];
    var first = gridStoredValues[winSubArray[0]];
    var second = gridStoredValues[winSubArray[1]];
    var third = gridStoredValues[winSubArray[2]]; // Check if empty

    if (first === "" || second === "" || third === "") {
      continue;
    } // Win & Message


    if (first === second && second === third) {
      winningMessage(first);
      gameOver();
      break;
    } // Tie & Message


    if (!gridStoredValues.includes("")) {
      tieMessage();
      gameOver();
    }
  }
}; // Commands handler


var handleCommands = function handleCommands(clickedCell, index) {
  if (clickedCell.innerHTML === "") {
    selectAudio.play();
    updateBoard(clickedCell, index);
    changeTurn();
    resultCheck();
  } else {
    negativeAudio.play();
  }
}; // Game Start Function


var gameStart = function gameStart() {
  welcomeWindow();
  cells.forEach(function (clickedCell, index) {
    return clickedCell.addEventListener("click", function () {
      handleCommands(clickedCell, index);
    });
  });
};

gameStart();