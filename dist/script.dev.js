"use strict";

// Bring html elements
var cells = document.querySelectorAll(".grid__cell"); // Empty array to store keep track of the board

var boardStoredValues = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X"; // Update the Array with the value inserted in a cell

var updateBoard = function updateBoard(index) {
  boardStoredValues[index] = currentPlayer; // console.log(boardStoredValues);
}; // Place the correct mark inside the grid element & change the current player


var changeTurn = function changeTurn(clickedCell) {
  if (currentPlayer === "X") {
    clickedCell.innerHTML = currentPlayer;
    currentPlayer = "O"; // console.log(currentPlayer);
  } else {
    clickedCell.innerHTML = currentPlayer;
    currentPlayer = "X"; // console.log(currentPlayer);
  }
}; // Main funtction that takes only one click/cell


cells.forEach(function (clickedCell, index) {
  clickedCell.addEventListener("click", function () {
    // Populate the array with values
    updateBoard(index); // Display and change the turn

    changeTurn(clickedCell); // Check if there is a winner
  }, {
    once: true
  });
});