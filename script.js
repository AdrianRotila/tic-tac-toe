// Bring html elements
const cells = document.querySelectorAll(".grid__cell");

// Empty array to store keep track of the board
let boardStoredValues = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";


// Update the Array with the value inserted in a cell
const updateBoard = (index) => {
    boardStoredValues[index] = currentPlayer;
    // console.log(boardStoredValues);
}

// Place the correct mark inside the grid element & change the current player
const changeTurn = (clickedCell) => {
    if(currentPlayer === "X") {
        clickedCell.innerHTML = currentPlayer;
        currentPlayer = "O";
        // console.log(currentPlayer);
    } else {
        clickedCell.innerHTML = currentPlayer;
        currentPlayer = "X";
        // console.log(currentPlayer);
    }
}

// Main funtction that takes only one click/cell
cells.forEach((clickedCell, index) => {
    clickedCell.addEventListener("click", () => {
        
        // Populate the array with values
        updateBoard(index);
        
        // Display and change the turn
        changeTurn(clickedCell);

        // Check if there is a winner

        

    }, {once: true})
});
