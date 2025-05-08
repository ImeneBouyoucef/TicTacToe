const playButton = document.getElementById("playButton");

let turn = "X";
let gameStarted = false;
const cells = document.querySelectorAll(".cell");

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
    });
});