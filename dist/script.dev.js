"use strict";

// Bring html elements
var cells = document.querySelectorAll(".grid__cell");
var board = document.querySelector(".grid");
var button = document.querySelector(".reset"); // Empty array to store keep track of the board

var boardStoredValues = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var gameActive = true;
var winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [2, 5, 8], [1, 4, 7], [2, 4, 6], [0, 4, 8]]; // Update the Array with the value inserted in a cell

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
};

var resultCheck = function resultCheck() {
  for (var index = 0; index < winConditions.length; index++) {
    var winSubArray = winConditions[index];
    var first = boardStoredValues[winSubArray[0]];
    var second = boardStoredValues[winSubArray[1]];
    var third = boardStoredValues[winSubArray[2]]; // If empty continue

    if (first === "" || second === "" || third === "") {
      continue;
    } // If the entries match break


    if (first === second && second === third) {
      // win message
      console.log("Player ".concat(first.toString(), " won")); // stop inserting values
      // clear the board and restart the game
      // clear the stored values
      // clear the innerhtml

      gameActive = false; // Clear the board

      clearBoard();
      break;
    }
  } // Tie check


  if (!boardStoredValues.includes("")) {
    console.log("This is a TIE");
  }
};

var clearBoard = function clearBoard() {
  boardStoredValues = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  button.addEventListener("click", function () {
    cells.forEach(function (cell) {
      cell.innerHTML = "";
    });
  });
}; // Main funtction that takes only one click/cell


if (gameActive) {
  cells.forEach(function (clickedCell, index) {
    clickedCell.addEventListener("click", function () {
      // Populate the array with values
      updateBoard(index); // Display and change the turn

      changeTurn(clickedCell); // Check if there is a winner

      resultCheck();
    }, {
      once: true
    });
  });
}