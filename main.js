var readlineSync = require('readline-sync');

function calcScore(code, guess) {
    let codeCopy = JSON.parse(JSON.stringify(code));
    let guessCopy = JSON.parse(JSON.stringify(guess));
    let sol = { correctPos: 0, incorrectPos: 0 };
    let indexes = [];
    let checked = [];
    for (let i = 0; i < codeCopy.length; i++) {
        if (codeCopy[i] === guessCopy[i]) {
            indexes.push(i)
            sol.correctPos++;
        }
    }
    for (let index of indexes) {
        codeCopy.splice(index, 1, null);
        guessCopy.splice(index, 1, null)
    }
    for (let i = 0; i < codeCopy.length; i++) {
        if (codeCopy[i] !== guessCopy[i] && codeCopy.includes(guessCopy[i]) && codeCopy !== null && guessCopy !== null && !(checked.includes(i))) {
            sol.incorrectPos++;
            checked.push(i)
        }
    }
    return (sol);
}

function game() {
    let code = [];
    for (let i = 0; i < 4; i++) {
        code.push((Math.floor(Math.random() * 5) + 1))
    }

    console.log(`\n`)
    console.log(`-MASTERMIND GAME-`)
    console.log(`
Mastermind is a code-breaking game where the aim is to guess a randonm 4-digit code where each code digit is in the range 1-5.

For each guess you make you will get:
How many digits in the guess are correct in both value and position.

How many digits in the guess have the correct value but are in the wrong position
You lose if you cannot guess the code within 10 attempts.
Input must be a 4 digit number.
`
    )
    console.log(`\n`)
    console.log(`Generating  a 4 digit Random code...`)
    console.log(`Code Generated!`)
    console.log(`\n`)

    let attempts = 9;
    while (attempts >= 0) {
        var userGuess = readlineSync.question('Enter your guess: ');
        let guessString = userGuess.split("");
        let guess = [];
        for (let i = 0; i < 4; i++) {
            guess.push(Number(guessString[i]))
        }
        // console.log(code, guess)
        let score = calcScore(code, guess)
        if (score.correctPos == 4) {
            console.log(`\n`)
            console.log("Correct Guess! You are a MASTERMIND!");
            console.log(`\n`)
            return;
        }
        else {
            console.log(`-----`)
            console.log(`${score.correctPos} matching digit(s) in the correct position`)
            console.log(`${score.incorrectPos} matching digit(s) in the incorrect position`);
            console.log(`-----`)
            console.log(`You have ${attempts} guesses left`)
            console.log(`\n`)
            attempts--;
        }
    }
    console.log(`You Loose the code was: ${code.join('')}`)
    console.log(`\n`)
    return;

}


game();