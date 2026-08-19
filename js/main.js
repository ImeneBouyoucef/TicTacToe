import { Robot } from "./Robot.js";

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
  let robot = new Robot("O", parseInt(levelRange.value));

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
      whosturn.innerText = "";
      return true;
    }
    if (checkDraw()) {
      win.innerText = `Draw !`;
      gameStarted = false;
      playButton.innerText = "Play";
      turn = "X";
      whosturn.innerText = "";
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
    mode = (mode === "Player") ? "Robot" : "Player";
    modeButton.innerText = `Mode: Player vs ${mode}`;
  });

  // change in robot level
  levelRange.addEventListener("input", () => {
    levelValue.textContent = levelRange.value;
    robot = new Robot("O", parseInt(levelRange.value));
  });

  // click on a cell
  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      if (!gameStarted || cell.textContent !== "") return;
      if (mode === "Robot" && turn !== "X") return; // block click if it is the Robot's turn

      cell.textContent = turn;
      turn = turn === "X" ? "O" : "X";

      if (checkEndGame()) return;

      whosturn.innerText = `Turn : ${turn}`;

      if (mode === "Robot" && turn === robot.symbol && gameStarted) {
        setTimeout(() => {
          robot.play(cells); 
          turn = "X";

          if (!checkEndGame()) {
            whosturn.innerText = `Turn : ${turn}`;
          }
        }, 300);
      }
    });
  });
