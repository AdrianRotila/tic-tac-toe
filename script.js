// Bring html elements
const cells = document.querySelectorAll(".grid__cell");
let turn = "";

// Function to change the turn
const changeTurn = (cell) => {
    if(turn === "X") {
        turn = "O";
        cell.innerHTML = "O";
        // console.log(turn);
    } else {
        turn = "X";
        cell.innerHTML = "X";
        // console.log(turn);
    }
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", (e) => {
        // Place the mark inside the grid element
        
        changeTurn(cell);
    }, {once: true})
});
