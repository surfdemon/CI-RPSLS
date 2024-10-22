// QUIPS
const quipsDefeat = [ // CPU if player wins
    "Live long and prosper.",
    "That move was... illogical. Well done!",
    "I am defeated.",
    "Well played.",
    "Bested? By a human!?"

];

const quipsTie = [ // CPU draw
    "An impass.",
    "Stalemates are unavoidable",
    "You played logically. So did I.",
    "This only delays the inevitable.",
    "What are the odds? They're 20%."

]

const quips = [ // general CPU win
    "You are defeated.",

];

const quipsRock = [ // CPU win against rock
    "Such a primative instrument.",
    "Perhaps build a wall with it next time.",
    "Your civilization has yet evolved beyond stone?"

];

const quipsPaper = [ // CPU win against paper
    "Your defence was... fickle.",
    "Paper? At a moment like this?",
    "We use datapads in the 25th century."

];

const quipsScissors = [ // CPU win against scissors
    "The choice of a blade was obvious... too obvious.",
    "A bold time to assume the offense. Foolish all the same.",
    "En Garde!"

];

const quipsLizard = [ // CPU win against lizard
    "I have rendered your reptile inert.",
    "Your lizard, my friend, is dead.",
    "It hissed at me. I killed the beast..."

];

const quipsSpock = [ // CPU win against spock
    "Of all the souls I have encountered in my travels, his was the most human.",
    "You will serve under me yet, Spock.",
    "Perhaps send a search party for him?"

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
// AUDIO CONTROL
const toggleMuteAudio = () => {
    var muteBtn = document.getElementById('btnMute');
    var soundBtn = document.getElementById("audioBtnClick");
    var soundCPU = document.getElementById("audioCPUwin");
    var soundPla = document.getElementById("audioPlayerWin");
    var muteBtn = document.getElementById("btnMute");
    console.log('toggle mute');
if (soundBtn.muted === true) {
    muteBtn.innerHTML = "Unmuted"
    soundBtn.muted = false;
    soundCPU.muted = false;
    soundPla.muted = false;
    console.log('on');
} else {
    muteBtn.innerHTML = "Muted"
    soundBtn.muted = true;
    soundCPU.muted = true;
    soundPla.muted = true;
    console.log('off');
}};
toggleMuteAudio(); // mutes audio on boot-up
// AUDIO CONTROL ENDS

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

const showUserForm = () => {
    document.getElementById('submitUsername').classList.add('show');
    document.getElementById('newUsername').classList.add('show');
}

const cookiesAccepted = () => { 
    localStorage.logScores = true;
    updateUsernameOnScreen();
    showUserForm();
    hideCookieMsg();
}

const cookiesRejected = () => {
    hideCookieMsg();
}

const showCookieMsg = () => {
    document.getElementById('cookieMsg').classList.add('showCookieMsg');
}

const hideCookieMsg = () => {
    document.getElementById('cookieMsg').classList.remove('showCookieMsg');
}


document.addEventListener('DOMContentLoaded', () => { 
    document.getElementById('btnMute').addEventListener('click', toggleMuteAudio);
    document.getElementById('cookieButtonAccept').addEventListener('click', cookiesAccepted);
    document.getElementById('cookieButtonReject').addEventListener('click', cookiesRejected);
    if ( localStorage.logScores !== 'true' ) { 
        showCookieMsg();
    } else { 
        showUserForm();
    }

    let username = localStorage.username;
    if (username !== undefined && localStorage.logScores === 'true' ){
        updateUsernameOnScreen(username);
    }
})

const logScoresToLocalStorage = (winner) => { 
    if ( localStorage.logScores === 'true' ){ 
        let scoreHistory = JSON.parse(localStorage.getItem('scoreHistory'));
        if (scoreHistory !== null){ 
            if ( localStorage.username !== undefined && winner === 'player' ){
                scoreHistory.push(localStorage.username);
            } else {
                scoreHistory.push(winner);
            }
            localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
        } else { 
            scoreHistory = [winner];
            localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
        }
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
        document.getElementById("audioCPUwin").load();
        document.getElementById("audioPlayerWin").load();
        document.getElementById("audioPlayerWin").play();
        document.getElementById("CPUsay").innerHTML = CPUverbs.defeat[Math.floor(Math.random()*CPUverbs.defeat.length)];
    } else {
        console.log("computer win");
        document.getElementById("resultSay").innerHTML = "Computer Wins!"
        computerScore++;
        document.getElementById("computerScore").innerHTML = computerScore;
        document.getElementById("audioCPUwin").load();
        document.getElementById("audioPlayerWin").load();
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
        document.getElementById("audioBtnClick").load();
        document.getElementById("audioBtnClick").play();

        // Show choices and result
        document.getElementById("plaChoice").innerHTML = `${playerChoice}`
        document.getElementById("choiceSay").innerHTML = `You chose ${playerChoice}, Computer chose ${computerChoice}`;
        updateScore(getWinner(playerChoice, computerChoice), playerChoice, computerChoice);
    });
});

const updateUsernameOnScreen = (username) => {
    if ( localStorage.username !== undefined || username !== undefined){
        playerUsername.innerText = localStorage.username !== undefined ? localStorage.username : username;
        document.querySelector("#newUsername").value = localStorage.username !== undefined ? localStorage.username : username;
    }
}

const createNewUsername = () => {
    const newUsername = document.querySelector("#newUsername").value;
    const playerUsername = document.querySelector("#playerUsername");

    if (newUsername.length > 15) {
        alert("Please chose a shorter username...")
    } else {
        updateUsernameOnScreen(newUsername)
        if ( localStorage.logScores === 'true' ){     
            localStorage.username = newUsername;
        } 
    }
}

document.getElementById("submitUsername").addEventListener("click", createNewUsername)

document.getElementById("newUsername").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        createNewUsername();
    }
})