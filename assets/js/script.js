const choices = ["rock", "paper", "scissors", "lizard", "spock"];
const rules = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper",],
    spock: ["scissors","rock"]
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
    return "tie!"
}
else if (rules[playerChoice].includes(computerChoice)){
return "player!"
}
else {
    return "computer!"
}
};