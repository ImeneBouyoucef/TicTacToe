export class AIPlayer {
    constructor(symbol) {
        this.symbol = symbol;
    }
    play(cells) {
        const emptyCells = Array.from(cells).filter(cell => cell.textContent === "");

        if (emptyCells.length === 0) return;

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = this.symbol;
    }
}