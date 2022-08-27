"use strict";

// Bring html elements
var cells = document.querySelectorAll(".grid__cell");
var grid = document.querySelector(".grid");
var button = document.querySelector(".reset");
var endWindow = document.querySelector(".message");
var endMesaage = document.querySelector(".message--text");
var resetButton = document.querySelector(".message--button");
var gridStoredValues = ["", "", "", "", "", "", "", "", ""];
var X_CLASS = "X";
var O_CLASS = "O";
var currentPlayer = "X";
var winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [2, 5, 8], [1, 4, 7], [2, 4, 6], [0, 4, 8]]; // Cells Value and Cells Classes Handling

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
}; // Winning Message


var winningMessage = function winningMessage(winner) {
  endMesaage.innerHTML = "Player ".concat(winner, " Wins !");
  endWindow.classList.add("show");
}; // Tie Message


var tieMessage = function tieMessage() {
  endMesaage.innerHTML = "It's a Tie !";
  endWindow.classList.add("show");
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
      break;
    } // Tie & Message


    if (!gridStoredValues.includes("")) {
      tieMessage();
    }
  }
}; // Swap Hover Turn


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


resetButton.addEventListener("click", function () {
  gridStoredValues = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gridClassSwap();
  cells.forEach(function (cell) {
    return resetCellsData(cell);
  });
  endWindow.classList.remove("show");
});

var handleCommand = function handleCommand(clickedCell, index) {
  if (clickedCell.innerHTML === "") {
    updateBoard(clickedCell, index);
    changeTurn();
    resultCheck();
  }
};

var gameStart = function gameStart() {
  grid.classList.add(X_CLASS);
  cells.forEach(function (clickedCell, index) {
    return clickedCell.addEventListener("click", function () {
      return handleCommand(clickedCell, index);
    });
  });
};

gameStart();