// CPU one-liners on win or lose

const quipsDefeat = [ // CPU if player wins
    "Live long and prosper.",
    "That move was... illogical.",
    "I am defeated."

];

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

export default CPUverbs = {
    rock: quipsRock,
    paper: quipsPaper,
    scissors: quipsScissors,
    lizard: quipsLizard,
    spock: quipsSpock,
    defeat: quipsDefeat
}
