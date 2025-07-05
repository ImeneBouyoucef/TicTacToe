export class AIPlayer {
    constructor(symbol, level) {
        this.symbol = symbol;
        this.level = level;
    }

    play(cells) {
        const emptyCells = Array.from(cells).filter(cell => cell.textContent === "");

        if (emptyCells.length === 0) return;
        
        if (this.level === 1) {
            this.playRandom(emptyCells);
        }
        else if (this.level === 2) {
            if (!this.playToWin(cells)) {
                this.playRandom(emptyCells); 
            }
        }
    }

    /**
     * Plays randomly.
     * @param {HTMLElement[]} emptyCells 
     */
    playRandom(emptyCells) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = this.symbol;
    }

     /**
     * Try to find a winning move. Return true if a move was played.
     * @param {NodeList} cells 
     * @returns {boolean}
     */
    playToWin(cells) {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combo of winCombos) {
            const [i, j, k] = combo;
            const values = [cells[i].textContent, cells[j].textContent, cells[k].textContent];
            const symbols = [i, j, k];

            // if there are 2 AI symbols and 1 empty one : play here
            const countAI = values.filter(v => v === this.symbol).length;
            const countEmpty = values.filter(v => v === "").length;

            if (countAI === 2 && countEmpty === 1) {
                const index = symbols[values.indexOf("")];
                cells[index].textContent = this.symbol;
                return true;
            }
        }

        return false;
    }
}

