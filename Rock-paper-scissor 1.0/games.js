let userScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#message");

const userScorePara = document.querySelector("#player-Score");
const computerScorePara = document.querySelector("#computer-Score");

const getComputerChoice = () => {
    const choices = ["rock", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
const draw = (userChoice, computerChoice) => {
    msg.innerHTML = `It's a draw! You both chose ${userChoice}`;
    msg.style.color = "Black";
    msg.style.backgroundColor = "white";
}

const showWinner = (userWins, userChoice, computerChoice) => {
    if(userWins) {
        msg.innerHTML = `You win! ${userChoice} beats ${computerChoice}`;
        msg.style.color = "green";
        msg.style.backgroundColor = "lightgreen";
        userScore++;
        userScorePara.textContent = userScore;
    } else {
        msg.innerHTML = `You lose! ${computerChoice} beats ${userChoice}`;
        msg.style.color = "red";
        msg.style.backgroundColor = "lightcoral";
        computerScore++;
        computerScorePara.textContent = computerScore;
    }
}

const playgame = (userChoice) => {
    const computerChoice = getComputerChoice();
    
    if(userChoice === computerChoice) {
        draw(userChoice, computerChoice);
    }
    else{
        let userWins = true;
        if(userChoice === "rock" ){
            userWins = computerChoice === "paper" ? false : true;
        }
        else if(userChoice === "paper"){
            userWins = computerChoice === "scissor" ? false : true;
        }
        else{
            userWins = computerChoice === "rock" ? false : true;
        }
        showWinner(userWins, userChoice, computerChoice);
    }
}

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playgame(userChoice);
    });
});
