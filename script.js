// Bring html elements
const cells = document.querySelectorAll(".grid__cell");
const grid = document.querySelector(".grid");
const button = document.querySelector(".reset");
const endWindow = document.querySelector(".message");
const endMesaage = document.querySelector(".message--text");
const resetButton = document.querySelector(".message--button");

let gridStoredValues = ["", "", "", "", "", "", "", "", ""];

const X_CLASS = "X";
const O_CLASS = "O";
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

// Cells Value and Cells Classes Handling
const updateBoard = (clickedCell, index) => {
    gridStoredValues[index] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer);
}

// Turn Swapping
const changeTurn = () => {
    if(currentPlayer === "X") {
        gridClassSwap();
        currentPlayer = "O";
    } else {
        gridClassSwap();
        currentPlayer = "X";
    }
}

// Winning Message
const winningMessage = (winner) => {
    endMesaage.innerHTML = `Player ${winner} Wins !`;
    endWindow.classList.add("show");
}

// Tie Message
const tieMessage = () => {
    endMesaage.innerHTML = `It's a Tie !`
    endWindow.classList.add("show");
}

// Result Check
const resultCheck = () => {
    for (index in winConditions) {
        const winSubArray = winConditions[index];
        const first = gridStoredValues[winSubArray[0]];
        const second = gridStoredValues[winSubArray[1]];
        const third = gridStoredValues[winSubArray[2]];
        // Check if empty
        if(first === "" || second === "" || third === "") {
            continue;
        }
        // Win & Message
        if(first === second && second === third) {
            winningMessage(first);
            break;
        }
        // Tie & Message
        if(!gridStoredValues.includes("")){
            tieMessage();
        }
    }
}

// Swap Hover Turn
const gridClassSwap = () => {
    if(grid.classList.contains("O")) {
        grid.classList.remove(O_CLASS);
        grid.classList.add(X_CLASS);
    } else {
        grid.classList.remove(X_CLASS);
        grid.classList.add(O_CLASS);
    }
}

// Restore Cells Value and Classes
const resetCellsData = (cell) => {
    cell.innerHTML = "";
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
}

// Clear the Board
resetButton.addEventListener("click", () => {
    gridStoredValues = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";

    gridClassSwap();
    cells.forEach((cell) => resetCellsData(cell));

    endWindow.classList.remove("show")
})

const handleCommand = (clickedCell, index) => {
    if(clickedCell.innerHTML === ""){
        updateBoard(clickedCell, index);           
        changeTurn();   
        resultCheck(); 
    }   
}

const gameStart = () => {
    grid.classList.add(X_CLASS);
    cells.forEach((clickedCell, index) => 
        clickedCell.addEventListener("click", () => handleCommand(clickedCell, index)));
}

gameStart();




