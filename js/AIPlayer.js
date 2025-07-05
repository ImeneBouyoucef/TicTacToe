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
        else if (this.level === 3) {
            if (this.playToWin(cells)) {
                return;
            }
            if (this.blockOpponent(cells)) {
                return; 
            }
            this.playRandom(emptyCells); 
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
     * Check if the AI ​​can win now and play that move if possible.
     * @param {NodeList} cells 
     * @returns {boolean}
     */
    playToWin(cells) {
        return this.findAndPlayCombo(cells, this.symbol);
    }

     /**
     * Check if the opponent can win and block this move
     * @param {NodeList} cells 
     * @returns {boolean}
     */
    blockOpponent(cells) {
        const opponentSymbol = this.symbol === "X" ? "O" : "X";
        return this.findAndPlayCombo(cells, opponentSymbol);
    }

    /**
    * Searches for a potential winning combination for a given symbol
    * and plays in the empty box if there are 2 symbols + 1 empty box.
    * @param {NodeList} cells 
    * @param {string} symbol 
    * @returns {boolean}
    */
    findAndPlayCombo(cells, symbol) {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combo of winCombos) {
            const [i, j, k] = combo;
            const values = [cells[i].textContent, cells[j].textContent, cells[k].textContent];
            const positions = [i, j, k];

            const countSymbol = values.filter(v => v === symbol).length;
            const countEmpty = values.filter(v => v === "").length;

            if (countSymbol === 2 && countEmpty === 1) {
                const emptyIndex = positions[values.indexOf("")];
                cells[emptyIndex].textContent = this.symbol;
                return true;
            }
        }

        return false;
    }
}

