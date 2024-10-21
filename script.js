// list of choices and the rules of these choices
const choices = [rock, paper, scissors, lizard, spock];
const rules = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper",],
    spock: ["scissors","rock"]
}
// assigning the computer a random choice
function randomComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}