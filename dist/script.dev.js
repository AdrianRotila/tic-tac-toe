"use strict";

// Bring html elements
var cells = document.querySelectorAll(".grid__cell");
var turn = ""; // Function to change the turn

var changeTurn = function changeTurn(cell) {
  if (turn === "X") {
    turn = "O";
    cell.innerHTML = "O"; // console.log(turn);
  } else {
    turn = "X";
    cell.innerHTML = "X"; // console.log(turn);
  }
};

cells.forEach(function (cell, index) {
  cell.addEventListener("click", function (e) {
    // Place the mark inside the grid element
    changeTurn(cell);
  }, {
    once: true
  });
});