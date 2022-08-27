// Bring html elements
const cells = document.querySelectorAll(".grid__cell");
const grid = document.querySelector(".grid");
const button = document.querySelector(".reset");
const endWindow = document.querySelector(".message");
const endMesaage = document.querySelector(".message--text");
const resetButton = document.querySelector(".message--button");

// Empty array to store keep track of the board
let gridStoredValues = ["", "", "", "", "", "", "", "", ""];

const X_CLASS = "x";
const O_CLASS = "o";
let currentPlayer = "X";

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
    [2, 4, 6],
    [0, 4, 8],
];



// Update the Array with the value inserted in a cell
const updateBoard = (index) => {
    gridStoredValues[index] = currentPlayer;
}

// Place the correct mark inside the grid element & change the current player
const changeTurn = (clickedCell) => {
    if(currentPlayer === "X") {
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
}

const winningMessage = (winner) => {
    endMesaage.innerHTML = `Player ${winner} Wins !`;
    endWindow.classList.add("show");
}

const tieMessage = () => {
    endMesaage.innerHTML = `It's a tie !`
}

const resultCheck = () => {
    for (let index = 0; index < winConditions.length; index++) {
        const winSubArray = winConditions[index];
        const first = gridStoredValues[winSubArray[0]];
        const second = gridStoredValues[winSubArray[1]];
        const third = gridStoredValues[winSubArray[2]];

        // If empty continue
        if(first === "" || second === "" || third === "") {
            continue;
        }
        if(first === second && second === third) {
            // win message
            winningMessage(first);
            break;
        }
    }
    
    // Tie check
    if(!gridStoredValues.includes("")){
        tieMessage();
    }
}

// Clear Board Function
const clearBoard = () => {
    resetButton.addEventListener("click", () => {
        gridStoredValues = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";

    })
}

// Main funtction that takes only one click/cell
cells.forEach((clickedCell, index) => {
    clickedCell.addEventListener("click", () => {
            
        // Populate the array with values
        updateBoard(index);
            
        // Display and change the turn
        changeTurn(clickedCell);
    
        // Check if there is a winner
        resultCheck(); 
        
        // Board Reset
        clearBoard();
        }, {once: true})
    });


