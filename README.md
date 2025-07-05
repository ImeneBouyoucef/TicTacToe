# Tic Tac Toe – JavaScript Game

A simple and responsive Tic Tac Toe (morpion) game built with HTML, CSS, and JavaScript. Includes 3 AI difficulty levels.

---

## Features

-  Player vs Player mode
-  Player vs AI with 3 difficulty levels:
  - **Level 1:** Random moves
  - **Level 2:** Tries to win if possible
  - **Level 3:** Tries to win, otherwise blocks the opponent

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<ton-pseudo>/TicTacToe.git
cd TicTacToe
```

### 2. Launch the game (you need a local server)

This project uses ES6 modules, so you **cannot** open the HTML file directly with `file://`.

You must run it from a local server. Choose one of the following options:

#### Option A – With Python (quick and simple)

If Python is installed:

```bash
python3 -m http.server 8000
```

Then open your browser at:

```
http://localhost:8000
```

####  Option B – With VS Code + Live Server

1. Install the **Live Server** extension in Visual Studio Code.  
2. Open the project folder in VS Code.  
3. Right-click on `index.html` and select **"Open with Live Server"**.
