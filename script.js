// HTML Elements
const cells = document.querySelectorAll(".grid__cell");
const grid = document.querySelector(".grid");
const button = document.querySelector(".reset");
const endWindow = document.querySelector(".message");
const endMessage = document.querySelector(".message--text");
const resetButton = document.querySelector(".message--button");
const trapButton = document.querySelector(".trapdoor__button");

// Sound Elements
const selectAudio = new Audio("./audio/click-sound.wav");
const negativeAudio = new Audio("./audio/not-allowed.wav");
const winAudio = new Audio("./audio/win.wav");
const lostAudio = new Audio("./audio/lose.wav");
const cleanAudio = new Audio("./audio/clear-board.wav");
const startAudio = new Audio("./audio/start.wav");



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

// Starting window
const welcomeWindow = () => {
    endWindow.style.opacity = "1";
    endWindow.classList.add("show");
    endMessage.innerHTML = "Tic-Tac-Toe"
    resetButton.innerHTML = "Start Game";
}

// Final window with the result
const gameOver = () => {
    endWindow.style.opacity = "0.9";
    resetButton.innerHTML = "Start Again"
    endWindow.classList.add("show");
}

// Winning Message
const winningMessage = (winner) => {
    winAudio.play();
    endMessage.innerHTML = `Player ${winner} Wins !`;
}

// Tie Message
const tieMessage = () => {
    endMessage.innerHTML = `It's a Tie !`
}

// Swap Turn Hover 
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
const clearBoard = () => {
    gridStoredValues = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";

    cells.forEach((cell) => resetCellsData(cell));

    endWindow.classList.remove("show")
    
    grid.classList.remove(O_CLASS);
    grid.classList.add(X_CLASS);
}

// Reset Button
resetButton.addEventListener("click", () => {
    if(resetButton.innerHTML === "Start Game") {
        startAudio.play();
    }
    clearBoard();
});

// Trap Button
trapButton.addEventListener("click", () => {
    if(gridStoredValues.every(value => value === "")){
        negativeAudio.play();
    } else {
        cleanAudio.play();
        clearBoard();
    } 
});

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
            gameOver();
            break;
        }
        // Tie & Message
        if(!gridStoredValues.includes("")){
            tieMessage();
            gameOver();
        }
    } 
}

// Commands handler
const handleCommand = (clickedCell, index) => {
    if(clickedCell.innerHTML === ""){
        selectAudio.play();
        updateBoard(clickedCell, index);           
        changeTurn();   
        resultCheck(); 
    } else {
        negativeAudio.play();
    }
}

// Game Start Function
const gameStart = () => {
    welcomeWindow();
    cells.forEach((clickedCell, index) => 
        clickedCell.addEventListener("click", () => handleCommand(clickedCell, index)));
}

gameStart();




