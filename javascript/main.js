/**
 * check if there is a winner
 * @returns the winner's symbol
 */
function checkWinner(){
  const winCombos = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
  ];

  for (let combo of winCombos){
    const [x, y, z] = combo;
        const valX = cells[x].textContent;
        const valY = cells[y].textContent;
        const valZ = cells[z].textContent;

        if (valX && valX === valY && valX === valZ) {
            return valZ; 
        }
  }

  return null;
}

const playButton = document.getElementById("playButton");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");

let turn = "X";
let gameStarted = false;

playButton.addEventListener("click", () => {
    if (!gameStarted) { 
        gameStarted = true;
        playButton.innerText = "Quit";
      } else {
        gameStarted = false;
        playButton.innerText = "Play";

      cells.forEach(cell => {
        cell.textContent = "";
      });
      turn = "X";
      }
  });

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameStarted || cell.textContent !== "") return;

    cell.textContent = turn;
    turn = turn === "X" ? "O" : "X";
    
    const winner = checkWinner();
    if (winner) {
      message.innerText = `${winner} won!`;
      gameStarted = false;
      playButton.innerText = "Play";
    }});
});