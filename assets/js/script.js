const choices = ["rock", "paper", "scissors", "lizard", "spock"];
const rules = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper", ],
    spock: ["scissors", "rock"]
};
// assigning the computer a random choice
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
};
// function to track scoring
let playerScore = 0;
let computerScore = 0;
// function to determine the winner
function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie'
    } else if (rules[playerChoice].includes(computerChoice)) {
        return 'player'
    } else {
        return 'computer'
    }
};
// function to update the score and show the result
function updateScore(winner, playerChoice, computerChoice) {
    if (winner === 'tie') {
        message += "Its a tie!";
    } else if (winner === 'player') {
        message += "You Win!";
        playerScore++;
    } else {
        message += "Computer Wins!";
        computerScore++;
    }
};
//event listeners for player choice buttons
document.querySelectorAll(".choiceButton").forEach(button => {
    button.addEventListener("click", function() {
        const playerChoice = this.getAttribute("data-type");
        const computerChoice = getComputerChoice();

        // Show choices and result
        alert(`You chose ${playerChoice}, Computer chose ${computerChoice}.`);
    });
});




