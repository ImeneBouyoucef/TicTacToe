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

        // TODO: niveaux 2 et 3
    }

    /**
     * Plays randomly.
     * @param {HTMLElement[]} emptyCells 
     */
    playRandom(emptyCells) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = this.symbol;
    }
}

