let wins = {
    'rock': 'scissors',
    'paper': 'rock',
    'scissors': 'paper'
}
let userLives = 5;
let computerLives = 5;
let currRound = 0;

function getColorSelection(target, className) {
    // Remove color from other elements
    let userChoice = "";
    if (className.includes("fa-hand-back-fist")) {
        userChoice = "rock";
        target.style.color = "#9265c2";
    } else if (className.includes("fa-hand-scissors")) {
        userChoice = "scissors";
        target.style.color = "#b85a5a";
    } else {
        userChoice = "paper";
        target.style.color = "#63c26b";
    } 


    return userChoice;
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];

    return choices[Math.floor(Math.random() * choices.length)];
}

function reload() {
    window.location.reload();
}

function handleEndGame(userLives, computerLives) {
   // End game logic
   if (userLives == 0) {
        outputText = "You have been defeated! Better luck next time"
    } else if (computerLives == 0) {
        outputText = "You are victorious! The computer is no match for you"
    }

    // Make buttons unclickable
    let choices = Array.from(document.querySelectorAll('.user > .choice'));
    choices.forEach(choice => {
        choice.style.pointerEvents = "none";
    }); 

    // Final combat text
    let endGame = document.querySelector('.finalresult');
    endGame.children[0].textContent = outputText;

    let playAgain = document.createElement('button');
    playAgain.textContent = "Play again!";
    endGame.appendChild(playAgain);


    // Add listener to reload page if clicked button
    playAgain.addEventListener("click", reload, false);
}

function playRound(userChoice, computerChoice) {
    let outputText = "";
    if (userChoice == computerChoice) {
        outputText = "Tie game!";
    }

    if (userChoice == wins[computerChoice]) {
        userLives -= 1;
        outputText = "You lose! " + computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1) + " beats " + userChoice + "!";
    } else if (computerChoice == wins[userChoice]) {
        computerLives -= 1;
        outputText = "You win! " + userChoice.charAt(0).toUpperCase() + userChoice.slice(1) + " beats " + computerChoice + "!";
    }

    currRound += 1;

    // Render output text
    let combatText = document.querySelector('.results .container .combat');
    combatText.textContent = outputText;

    let roundNum = document.querySelector('.round');
    let userLivesDOM = document.querySelector('.userLives');
    let compLivesDOM = document.querySelector('.computerLives');

    roundNum.textContent = currRound;
    userLivesDOM.textContent = userLives;
    compLivesDOM.textContent = computerLives;

    // End game logic
    if (userLives == 0 || computerLives == 0) {
        handleEndGame(userLives, computerLives, combatText);
        return;
    }
}

function toggleGame(e) {
    // Grab the faded one in battleground
    let className = e.target.className;

    // Revert colors of other ones
    let siblings = Array.from(document.querySelectorAll('.user > .choice > i'));
    siblings.forEach(sibling => {
        sibling.style.color = null;
    });

    // Color selection and revert existing
    getColorSelection(e.target, e.target.className);

    // Add fade in to selected val
    let bgFadedContainer = Array.from(document.querySelectorAll('.user.choice .faded > *'));
    bgFadedContainer.forEach(
        fadedUserVal => {
            fadedUserVal.parentElement.removeAttribute('id');

            if (fadedUserVal.className === className) {
                fadedUserVal.parentElement.setAttribute('id', 'fadein');

                let userChoice = getColorSelection(fadedUserVal, className);

                // As soon as user choice fades in, fade in computer choice as well
                let shownCompVal = Array.from(document.querySelectorAll('.computer.choice > *'));
                shownCompVal.forEach(elem => elem.removeAttribute('id'));

                let computerChoice = getComputerChoice();
                let fadedCompVal = document.querySelector(`.computer.choice .faded.${computerChoice}`);
                fadedCompVal.setAttribute('id', 'fadein');

                // Play round
                playRound(userChoice, computerChoice);
            }
        }
    )
}

function game() {

    let choices = Array.from(document.querySelectorAll('.user > .choice'));
    choices.forEach(choice => {
        choice.addEventListener('click', toggleGame)
    });
}

game();