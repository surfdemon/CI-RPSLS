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
    let muteBtn = document.getElementById('btnMute');
    let soundBtn = document.getElementById("audioBtnClick");
    let soundCPU = document.getElementById("audioCPUwin");
    let soundPla = document.getElementById("audioPlayerWin");

const muteSound = () => {
    localStorage.unMuted = 'false';
    muteBtn.innerHTML = "Muted"
    soundBtn.muted = true;
    soundCPU.muted = true;
    soundPla.muted = true;
}

const unMuteSound = () => {
    localStorage.unMuted = 'true';
    // var muteBtn = document.getElementById('btnMute');
    // var soundBtn = document.getElementById("audioBtnClick");
    // var soundCPU = document.getElementById("audioCPUwin");
    // var soundPla = document.getElementById("audioPlayerWin");
    // var muteBtn = document.getElementById("btnMute");
    muteBtn.innerHTML = "Unmuted"
    soundBtn.muted = false;
    soundCPU.muted = false;
    soundPla.muted = false;
}

const toggleMuteAudio = () => {
    var soundBtn = document.getElementById("audioBtnClick");
    console.log(`the muted state in local storage is ${localStorage.unMuted}`);
    localStorage.unMuted = localStorage.unMuted === 'true' ? 'false' : 'true';
    if (localStorage.unMuted === 'true') {
        console.log('should now unmute sound in the togglemuteaudio function');
        unMuteSound();
    } else if (localStorage.unMuted === 'false' || localStorage.unMuted === 'undefined') {
        console.log('should now mute sound in the togglemuteaudio function');
        muteSound();
    }
};

const setAudio = () => { 
    const soundBtn = document.getElementById("audioBtnClick");
    console.log(`the muted state in local storage is ${localStorage.muted}`);
    if ( localStorage.unMuted === 'true' ) {
        console.log('sound should be unmuted');
        unMuteSound();
    } else if (localStorage.unMuted === 'false' || localStorage.unMuted === 'undefined') {
        console.log('sound should be muted');
        muteSound();
    }
}


// AUDIO CONTROL ENDS

const choices = ["rock", "paper", "scissors", "lizard", "spock"];
const rules = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper",],
    spock: ["scissors", "rock"]
};

// assigning the computer a random choice
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
};

// function to track scoring
let playerScore = localStorage.playerScore !== undefined ? localStorage.playerScore : 0;
let computerScore = localStorage.computerScore !== undefined ? localStorage.computerScore : 0;

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
    document.getElementById('confirmNewGame').addEventListener('click', resetGameData);
    if ( localStorage.logScores !== 'true' ) { 
        showCookieMsg();
    } else {
        showUserForm();
    }
    let username = localStorage.username;
    if (username !== undefined && localStorage.logScores === 'true' ){
        updateUsernameOnScreen(username);
    }
    populateLogHistory();
    setAudio();
})


const logScoresToLocalStorage = (winner, cpuSay) => { 
    if ( localStorage.logScores === 'true' ){ 
        let scoreHistory = JSON.parse(localStorage.getItem('scoreHistory'));
        if (scoreHistory !== null) {
            if (localStorage.username !== undefined && winner === 'player') {
                scoreHistory.push({ 'winner': localStorage.username, 'quip': cpuSay, 'playerScore': playerScore, 'computerScore': computerScore });
            } else {
                scoreHistory.push({ 'winner': winner, 'quip': cpuSay, 'playerScore': playerScore, 'computerScore': computerScore });
            }
            localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
        } else {
            scoreHistory = [{ 'winner': winner, 'quip': cpuSay, 'playerScore': playerScore, 'computerScore': computerScore }];
            localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
        }
    }
}

const updateScoresOnPage = () => {
    document.getElementById("playerScore").innerHTML = playerScore;
    document.getElementById("computerScore").innerHTML = computerScore;
}

// function to update the score and show the result
function updateScore(winner, playerChoice, computerChoice) {
    showComputerChoice(computerChoice);
    let cpuSay;
    if (winner === 'tie') {
        document.getElementById("resultSay").innerHTML = "No one Wins..."
        cpuSay = CPUverbs.tie[Math.floor(Math.random() * CPUverbs.tie.length)];
        document.getElementById("CPUsay").innerHTML = cpuSay;
        document.getElementById("narrator").style.background = '#b8b8b8';
    } else if (winner === 'player') {
        document.getElementById("resultSay").innerHTML = "Player Wins!"
        playerScore++;
        if (localStorage.logScores === 'true') {
            localStorage.playerScore = playerScore;
        }
        updateScoresOnPage();
        document.getElementById("audioCPUwin").load();
        document.getElementById("audioPlayerWin").load();
        document.getElementById("audioPlayerWin").play();
        cpuSay = CPUverbs.defeat[Math.floor(Math.random() * CPUverbs.defeat.length)];
        document.getElementById("CPUsay").innerHTML = cpuSay;
        document.getElementById("narrator").style.background = '#bbf1c0';
    } else {
        document.getElementById("resultSay").innerHTML = "Computer Wins!"
        computerScore++;
        if (localStorage.logScores === 'true') {
            localStorage.computerScore = computerScore;
        }
        updateScoresOnPage();
        document.getElementById("audioCPUwin").load();
        document.getElementById("audioPlayerWin").load();
        document.getElementById("audioCPUwin").play();
        cpuSay = CPUverbs[playerChoice][Math.floor(Math.random() * CPUverbs[playerChoice].length)];
        document.getElementById("CPUsay").innerHTML = cpuSay;
        document.getElementById("narrator").style.background = '#eca2a2';
    }
    logScoresToLocalStorage(winner, cpuSay);
    updateHistoryLog(winner, cpuSay, playerScore, computerScore);
};

//event listeners for player choice buttons
document.querySelectorAll(".choiceButton").forEach(button => {
    button.addEventListener("click", function () {
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

const showComputerChoice = (computerChoice) => {
    document.getElementById(`${computerChoice}TargetComputer`).classList.add('show');
    setTimeout(() => { document.getElementById(`${computerChoice}TargetComputer`).classList.remove('show') }, 2000);
}

const updateUsernameOnScreen = (username) => {
    if (username !== undefined && localStorage.username === undefined) {
        localStorage.username = username;
    }
    const playerUsername = document.querySelector("#playerUsername");
    if (localStorage.username !== undefined || username !== undefined) {
        playerUsername.innerText = localStorage.username !== undefined ? localStorage.username : username;
        document.querySelector("#newUsername").value = localStorage.username !== undefined ? localStorage.username : username;
    }
    if (localStorage.username !== username) {
        playerUsername.innerText = username;
        document.querySelector("#newUsername").value = username;
    }
}

const createNewUsername = () => {
    const newUsername = document.querySelector("#newUsername").value;
    if (newUsername.length > 15) {
        alert("Please chose a shorter username...")
    } else {
        updateUsernameOnScreen(newUsername)
        if (localStorage.logScores === 'true') {
            localStorage.username = newUsername;
        }
    }
}

document.getElementById("submitUsername").addEventListener("click", createNewUsername)

document.getElementById("newUsername").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        createNewUsername();
    }
})

const updateHistoryLog = (winner, quip, playerScore, computerScore) => {
    let log = document.getElementsByClassName('log')[0];
    let logEntry;
    if (winner === "tie") {
        logEntry = "<p><b>(" + playerScore + ":" + computerScore + ")</b> " + winner + " no one wins</p><p></p><p>" + quip + "</p>";
    } else {
        logEntry = "<p><b>(" + playerScore + ":" + computerScore + ")</b> " + winner + " wins</p><p></p><p>" + quip + "</p>";
    }
    log.innerHTML = log.innerHTML + logEntry;
}

const populateLogHistory = () => {
    let logs = JSON.parse(localStorage.scoreHistory);
    logs.forEach((log) => {
        updateHistoryLog(log.winner, log.quip, log.playerScore, log.computerScore);
    });
}


// This has to be outside the resetGameData function to work!
var newGameModal = new bootstrap.Modal(document.getElementById('newGameModal'));

const resetGameData = () => {
    localStorage.removeItem('scoreHistory');
    localStorage.removeItem('playerScore');
    localStorage.removeItem('computerScore');
    let log = document.getElementsByClassName('log')[0];
    log.innerHTML = "";
    playerScore = 0;
    computerScore = 0;
    newGameModal.hide();
    updateScoresOnPage();
    document.getElementById('CPUsay').innerHTML = "Greetings. I am the computer.";
    document.getElementById('choiceSay').innerHTML = "Welcome to";
    document.getElementById('resultSay').innerHTML = "Rock, Paper, Scissors, Lizard, Spock!";
    document.getElementById("narrator").style.background = '#ECF0F1';
}