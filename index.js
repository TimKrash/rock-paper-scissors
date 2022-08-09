let wins = {
    'rock': 'scissors',
    'paper': 'rock',
    'scissors': 'paper'
}
let userScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];

    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(userChoice, computerChoice) {
    if (userChoice == computerChoice) {
        return "Tie game!";
    }

    if (userChoice == wins[computerChoice]) {
        computerScore += 1
        return "You lose! " + computerChoice.charAt(0) + computerChoice.slice(1) + " beats " + userChoice + "!";
    } else if (computerChoice == wins[userChoice]) {
        userScore += 1
        return "You win! " + userChoice.charAt(0) + userChoice.slice(1) + " beats " + computerChoice + "!"; 
    }
}

function toggleChoice(e) {
    // Grab the faded one in battleground
    let className = e.target.className;

    // Add fade in to selected val
    let bgFadedContainer = Array.from(document.querySelectorAll('.user.choice .faded > *'));
    bgFadedContainer.forEach(
        fadedUserVal => {
            if (fadedUserVal.className === className) {
                fadedUserVal.parentElement.setAttribute('id', 'fadein');

                // As soon as user choice fades in, fade in computer choice as well
                let fadedCompVal = document.querySelector(`.computer.choice .faded.${getComputerChoice()}`);
                fadedCompVal.setAttribute('id', 'fadein');
            }
        }
    )
}

function game() {

    let choices = Array.from(document.querySelectorAll('.user > .choice'));
    choices.forEach(choice => {
        choice.addEventListener('click', toggleChoice)
    });

    // Get user input
    var userInput = "rock";

    userChoice = userInput.toLowerCase();
    computerChoice = getComputerChoice();

    let result = playRound(userChoice, computerChoice);

    if (userScore > computerScore) {
        console.log("You win!!!");
    } else {
        console.log("You lose :( better luck next time!");
    }
}

game();
