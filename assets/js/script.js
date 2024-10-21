const choices = ["rock", "paper", "scissors", "lizard", "spock"];
const rules = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper", ],
    spock: ["scissors", "rock"]
};
import CPUverbs from './quips';

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
    console.log("updateScore")
    if (winner === 'tie') {
        console.log("Its a tie!");
    } else if (winner === 'player') {
        console.log("You Win!");
        playerScore++;
        document.getElementById("audioPlayerWin").play();
        document.getElementById("CPUsay").innerHTML(CPUverbs.defeat);
    } else {
        console.log("Computer Wins!");
        computerScore++;
        document.getElementById("audioCPUwin").play();
        document.getElementById("CPUsay").innerHTML(CPUverbs.playerChoice);
    }
};
//event listeners for player choice buttons
document.querySelectorAll(".choiceButton").forEach(button => {
    button.addEventListener("click", function() {
        const playerChoice = this.getAttribute("data-type");
        const computerChoice = getComputerChoice();
        document.getElementById("audioBtnClick").play();

        // Show choices and result
        updateScore(getWinner, playerChoice, computerChoice);
        alert(`You chose ${playerChoice}, Computer chose ${computerChoice}.`);

    });
});
