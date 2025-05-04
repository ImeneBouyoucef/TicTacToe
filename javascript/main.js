const playButton = document.getElementById("playButton");

let turn = "X";
let gameStarted = false;

playButton.addEventListener("click", () => {
    if (!gameStarted) {
        gameStarted = true;
        playButton.innerText = "Quit";
      } else {
        gameStarted = false;
        playButton.innerText = "Play";
      }
  });