import { AIPlayer } from "./AIPlayer.js";

// makes sure the DOM is loaded before attaching the event listeners
document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");
  const modeButton = document.getElementById("modeToggle");
  const cells = document.querySelectorAll(".cell");
  const win = document.getElementById("win");
  const whosturn = document.getElementById("turn");
  const levelRange = document.getElementById("levelRange");
  const levelValue = document.getElementById("levelValue");

  let turn = "X";
  let gameStarted = false;
  let mode = "Player";
  let ai = new AIPlayer("O", parseInt(levelRange.value));

  /**
   * reset the game
   */
  function resetGame() {
    gameStarted = false;
    playButton.innerText = "Play";
    turn = "X";
    win.innerText = "";
    whosturn.innerText = "";
    cells.forEach(cell => {
      cell.textContent = "";
    });
  }

  /**
   * check if there is a winner
   * @returns the winner's symbol
   */
  function checkWinner() {
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

    for (let combo of winCombos) {
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

  /**
   * check if there is a draw
   * @returns true if there is a draw
   */
  function checkDraw() {
    return Array.from(cells).every(cell => cell.textContent !== "");
  }

  /**
   * check if the game ended
   * @returns true if the game ended
   */
  function checkEndGame() {
    const winner = checkWinner();
    if (winner) {
      win.innerText = `${winner} won!`;
      gameStarted = false;
      playButton.innerText = "Play";
      turn = "X";
      return true;
    }
    if (checkDraw()) {
      win.innerText = `Draw !`;
      gameStarted = false;
      playButton.innerText = "Play";
      turn = "X";
      return true;
    }
    return false;
  }

  // bouton play
  playButton.addEventListener("click", () => {
    if (!gameStarted) { 
      gameStarted = true;
      playButton.innerText = "Quit";
      cells.forEach(cell => {
        cell.textContent = "";
      });
      win.innerText = "";
      whosturn.innerText = `Turn : ${turn}`;
    } else {
      resetGame();
    }
  });

  // toggle mode PVP / PVE
  modeButton.addEventListener("click", () => {
    mode = (mode === "Player") ? "AI" : "Player";
    modeButton.innerText = `Mode: Player vs ${mode}`;
  });

  // change in AI level
  levelRange.addEventListener("input", () => {
    levelValue.textContent = levelRange.value;
    ai = new AIPlayer("O", parseInt(levelRange.value));
  });

  // click on a cell
  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      if (!gameStarted || cell.textContent !== "") return;

      cell.textContent = turn;
      turn = turn === "X" ? "O" : "X";

      if (checkEndGame()) return;

      whosturn.innerText = `Turn : ${turn}`;

      if (mode === "AI" && turn === ai.symbol && gameStarted) {
        setTimeout(() => {
          ai.play(cells); 
          turn = "X";

          if (!checkEndGame()) {
            whosturn.innerText = `Turn : ${turn}`;
          }
        }, 300);
      }
    });
  });
});
