let logScores = true; 

// QUIPS
const quipsDefeat = [ // CPU if player wins
    "Live long and prosper.",
    "That move was... illogical. Well done!",
    "I am defeated."

];

const quipsTie = [ // CPU draw
    "An impass.",
    "Stalemates are unavoidable",
    "You played logically. So did I."

]

const quips = [ // general CPU win
    "You let your emotions cloud your judgement.",
    "I am of a superior intellect.",
    "You are defeated."

];

const quipsRock = [ // CPU win against rock
    "Such a primative instrument.",
    "Perhaps build a build a wall with it next time."

];

const quipsPaper = [ // CPU win against paper
    "Your defence was... fickle.",
    "Paper? At a moment like this?"

];

const quipsScissors = [ // CPU win against scissors
    "The choice of a blade was obvious... too obvious.",
    "A bold time to assume the offense. Foolish all the same."

];

const quipsLizard = [ // CPU win against lizard
    "I have rendered your reptile inert.",
    "Your lizard, my friend, is dead."

];

const quipsSpock = [ // CPU win against spock
    "Of all the souls I have encountered in my travels, his was the most human.",
    "You will serve under me yet, Spock."

];

// push general wins onto specfic win arrays
quipsRock.push(quips);
quipsPaper.push(quips);
quipsScissors.push(quips);
quipsLizard.push(quips);
quipsSpock.push(quips);

const CPUverbs = {
    rock: quipsRock,
    paper: quipsPaper,
    scissors: quipsScissors,
    lizard: quipsLizard,
    spock: quipsSpock,
    defeat: quipsDefeat,
    tie: quipsTie
}
// QUIPS ENDS

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




const showCookieMsg = () => {
    document.getElementById('cookieMsg').classList.add('showCookieMsg');
}

document.addEventListener('DOMContentLoaded', () => { 
    if ( document.cookies == "logscores"){
        console.log('should be logging the scores!');
        logScores = true;
    } else if ( document.cookies == "nologs") { 
        console.log('should not log the scores');
        logScores = false;
    } else {
        console.log('need to show the cookie msg');
        showCookieMsg();
    }
})

const logScoresToLocalStorage = (winner) => { 
    console.log('log scores to local storage has run');
    if ( logScores == true ){ 
        let scoreHistory = JSON.parse(localStorage.getItem('scoreHistory'));
        if (scoreHistory !== null){ 
            scoreHistory.push(winner);
            localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
            console.log(`we have score history! ${scoreHistory}`);
        } else { 
            scoreHistory = [winner];
            localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
            console.log('There is no score history');
        }
    } else { 
        console.log('logscores is false');
    }
}




// function to update the score and show the result
function updateScore(winner, playerChoice, computerChoice) {


    console.log("updateScore. playerChoice = " + playerChoice + " computerChoice = " + computerChoice)

    if (winner === 'tie') {
        console.log("Its a tie!");
        document.getElementById("resultSay").innerHTML = "No one Wins..."
        document.getElementById("CPUsay").innerHTML = CPUverbs.tie[Math.floor(Math.random()*CPUverbs.tie.length)];
    } else if (winner === 'player') {
        console.log("player win");
        document.getElementById("resultSay").innerHTML = "Player Wins!"
        playerScore++;
        document.getElementById("playerScore").innerHTML = playerScore;
        document.getElementById("audioPlayerWin").play();
        document.getElementById("CPUsay").innerHTML = CPUverbs.defeat[Math.floor(Math.random()*CPUverbs.defeat.length)];
    } else {
        console.log("computer win");
        document.getElementById("resultSay").innerHTML = "Computer Wins!"
        computerScore++;
        document.getElementById("computerScore").innerHTML = computerScore;
        document.getElementById("audioCPUwin").play();
        document.getElementById("CPUsay").innerHTML = CPUverbs[playerChoice][Math.floor(Math.random()*CPUverbs[playerChoice].length)];
    }
    logScoresToLocalStorage(winner);
};
//event listeners for player choice buttons
document.querySelectorAll(".choiceButton").forEach(button => {
    button.addEventListener("click", function() {
        const playerChoice = this.getAttribute("data-type");
        const computerChoice = getComputerChoice();
        document.getElementById("audioBtnClick").play();

        // Show choices and result
        updateScore(getWinner(playerChoice, computerChoice), playerChoice, computerChoice);
        document.getElementById("choiceSay").innerHTML = `You chose ${playerChoice}, Computer chose ${computerChoice}`;

    });
});

