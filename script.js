// Bring html elements
const cells = document.querySelectorAll(".grid__cell");
const board = document.querySelector(".grid");
const button = document.querySelector(".reset");

// Empty array to store keep track of the board
let boardStoredValues = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

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

const resultCheck = () => {

    for (let index = 0; index < winConditions.length; index++) {
        const winSubArray = winConditions[index];
        const first = boardStoredValues[winSubArray[0]];
        const second = boardStoredValues[winSubArray[1]];
        const third = boardStoredValues[winSubArray[2]];

        // If empty continue
        if(first === "" || second === "" || third === "") {
            continue;
        }
        // If the entries match break
        if(first === second && second === third) {
            // win message
            console.log(`Player ${first.toString()} won`);

            // stop inserting values
            // clear the board and restart the game
            // clear the stored values
            // clear the innerhtml
            gameActive = false;
            
            // Clear the board
            clearBoard();
          
            

            break;
        }
    }
    
    // Tie check
    if(!boardStoredValues.includes("")){
        console.log("This is a TIE");
    }
}

const clearBoard = () => {
    boardStoredValues = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    button.addEventListener("click", () =>{
        cells.forEach((cell) => {
            cell.innerHTML = "";
        })
    })
    
}

// Main funtction that takes only one click/cell
if(gameActive){
    cells.forEach((clickedCell, index) => {
        clickedCell.addEventListener("click", () => {
            
            // Populate the array with values
            updateBoard(index);
            
            // Display and change the turn
            changeTurn(clickedCell);
    
            // Check if there is a winner
            resultCheck();
    
            
            
            
    
        }, {once: true})
    });
}
