"use strict";

// Bring html elements
var cells = document.querySelectorAll(".grid__cell");
var grid = document.querySelector(".grid");
var button = document.querySelector(".reset");
var endWindow = document.querySelector(".message");
var endMesaage = document.querySelector(".message--text");
var resetButton = document.querySelector(".message--button"); // Empty array to store keep track of the board

var gridStoredValues = ["", "", "", "", "", "", "", "", ""];
var X_CLASS = "x";
var O_CLASS = "o";
var currentPlayer = "X";
var winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [2, 5, 8], [1, 4, 7], [2, 4, 6], [0, 4, 8]]; // Update the Array with the value inserted in a cell

var updateBoard = function updateBoard(index) {
  gridStoredValues[index] = currentPlayer;
}; // Place the correct mark inside the grid element & change the current player


var changeTurn = function changeTurn(clickedCell) {
  if (currentPlayer === "X") {
    grid.classList.add(O_CLASS);
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(O_CLASS);
    currentPlayer = "O";
  } else {
    grid.classList.remove(O_CLASS);
    grid.classList.add(X_CLASS);
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(X_CLASS);
    currentPlayer = "X";
  }
};

var winningMessage = function winningMessage(winner) {
  endMesaage.innerHTML = "Player ".concat(winner, " Wins !");
  endWindow.classList.add("show");
};

var tieMessage = function tieMessage() {
  endMesaage.innerHTML = "It's a tie !";
};

var resultCheck = function resultCheck() {
  for (var index = 0; index < winConditions.length; index++) {
    var winSubArray = winConditions[index];
    var first = gridStoredValues[winSubArray[0]];
    var second = gridStoredValues[winSubArray[1]];
    var third = gridStoredValues[winSubArray[2]]; // If empty continue

    if (first === "" || second === "" || third === "") {
      continue;
    }

    if (first === second && second === third) {
      // win message
      winningMessage(first);
      break;
    }
  } // Tie check


  if (!gridStoredValues.includes("")) {
    tieMessage();
  }
}; // Clear Board Function


var clearBoard = function clearBoard() {
  resetButton.addEventListener("click", function () {
    gridStoredValues = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
  });
}; // Main funtction that takes only one click/cell


cells.forEach(function (clickedCell, index) {
  clickedCell.addEventListener("click", function () {
    // Populate the array with values
    updateBoard(index); // Display and change the turn

    changeTurn(clickedCell); // Check if there is a winner

    resultCheck(); // Board Reset

    clearBoard();
  }, {
    once: true
  });
});