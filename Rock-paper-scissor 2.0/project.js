// Game variables
let playerScore = 0;
let computerScore = 0;
const choices = ['rock', 'paper', 'scissors'];
const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// DOM elements
const choiceButtons = document.querySelectorAll('.choice-btn');
const resultDisplay = document.getElementById('result');
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const playerChoiceDisplay = document.getElementById('playerChoice');
const computerChoiceDisplay = document.getElementById('computerChoice');
const resetBtn = document.getElementById('resetBtn');

// Event listeners
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.getAttribute('data-choice');
        playGame(playerChoice);
    });
});

resetBtn.addEventListener('click', resetScore);

function playGame(playerChoice) {
    // Remove active class from all buttons
    choiceButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to clicked button
    event.target.closest('.choice-btn').classList.add('active');

    // Get computer choice
    const computerChoice = getComputerChoice();

    // Display choices
    playerChoiceDisplay.textContent = emojis[playerChoice];
    computerChoiceDisplay.textContent = emojis[computerChoice];

    // Determine winner
    const result = determineWinner(playerChoice, computerChoice);

    // Update scores and display result
    if (result === 'win') {
        playerScore++;
        resultDisplay.textContent = 'You Win! 🎉';
        resultDisplay.style.color = '#4CAF50';
    } else if (result === 'lose') {
        computerScore++;
        resultDisplay.textContent = 'Computer Wins! 🤖';
        resultDisplay.style.color = '#f44336';
    } else {
        resultDisplay.textContent = "It's a Draw! 🤝";
        resultDisplay.style.color = '#2196F3';
    }

    // Update score display
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }

    // Winning conditions
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }

    return 'lose';
}

function resetScore() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';
    playerChoiceDisplay.textContent = '-';
    computerChoiceDisplay.textContent = '-';
    resultDisplay.textContent = '';

    // Remove active class from all buttons
    choiceButtons.forEach(btn => btn.classList.remove('active'));
}
