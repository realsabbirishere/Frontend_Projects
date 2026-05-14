// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

// Initialize game
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    // Check if cell is already played or game is over
    if (board[clickedIndex] !== '' || !gameActive) {
        return;
    }

    // Update board and UI
    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
    clickedCell.classList.add('disabled');

    // Check for winner
    if (checkWinner()) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        statusDisplay.classList.add('winner');
        gameActive = false;
        disableAllCells();
        return;
    }

    // Check for draw
    if (board.every(cell => cell !== '')) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function disableAllCells() {
    cells.forEach(cell => {
        cell.classList.add('disabled');
    });
}

function resetGame() {
    // Reset game state
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    // Clear board UI
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'disabled');
    });

    // Reset status
    statusDisplay.textContent = "Player X's Turn";
    statusDisplay.classList.remove('winner');
}
