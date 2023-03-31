let score = document.querySelector('.score-number');

const gameOptions = {
    'scissors': 'images/icon-scissors.svg',
    'paper':'images/icon-paper.svg',
    'rock':'images/icon-rock.svg',
    'lizard': 'images/icon-lizard.svg',
    'spock': 'images/icon-spock.svg'
}
const rulesBtn = document.querySelector('.rules-btn');
const rulesModal = document.querySelector('.rules-modal');
const userOptions = document.querySelector('.user-choice');
const choicesSection = document.querySelector('.choices');
rulesBtn.addEventListener('click',() => {
    rulesModal.style.visibility = rulesModal.style.visibility ==='hidden' ? 'visible':'hidden';
});


const replayBtn = document.querySelector('.replay-btn');
replayBtn.addEventListener('click',()=> {
    choicesSection.classList.add('hidden');
    userOptions.classList.remove('hidden');
})

const closeRules = document.querySelector('.rules-header');
closeRules.addEventListener('click',() => {
    rulesModal.style.visibility ='hidden';
})

function confirmChoice(choice) {
    const chosenOption = document.querySelector('.' + choice);
    console.log(chosenOption.querySelector('img'));
    const imgSrc = chosenOption.querySelector('img').src;
    if(imgSrc) {
        // hide the choice section
        userOptions.classList.add('hidden');


        //set the correct src for user-choice
        const userPick = document.querySelector('.user-play');
        const userPickImg = userPick.querySelector('img');
        userPick.classList.add(`${choice}-background`);
        console.log(userPick.classList);
        userPickImg.src = imgSrc;
        
        // house choice
        let houseChoice = getHouseChoice();

        //show choices
        choicesSection.classList.remove('hidden');
        choicesSection.classList.add('.show-result');

        //determine winner
        compareChoices(choice, houseChoice);
    }
}

function getHouseChoice() {
    const choices = ['rock','paper','scissors','lizard','spock'];

    const randomChoice = choices[Math.floor(Math.random() * 5)];
    const housePick = document.querySelector('.house-play');
    const houseImgSrc = housePick.querySelector('img');
    houseImgSrc.src = gameOptions[randomChoice];
    //style house pick
    housePick.classList.add(`${randomChoice}-background`);

    return randomChoice;
}

function compareChoices(playerChoice, computerChoice) {
    const resultMsg = document.querySelector('.result-message');
    // Define the rules for the game
    const rules = {
      rock: ['scissors', 'lizard'],
      paper: ['rock', 'spock'],
      scissors: ['paper', 'lizard'],
      lizard: ['paper', 'spock'],
      spock: ['rock', 'scissors']
    };
  
    // Check for tie
    if (playerChoice === computerChoice) {
      resultMsg.textContent = 'Tie';
      return;
    }
  
    // Check for win
    if (rules[playerChoice].includes(computerChoice)) {
        let userScore = parseInt(localStorage.getItem('userScore')) || 0;
        resultMsg.textContent = 'You win';
        userScore +=1;
        localStorage.setItem('userScore', userScore.toString());
        score.textContent = (parseInt(localStorage.getItem('userScore')) || 0).toString();

        return;
    }
  
    // Otherwise, it's a loss
    resultMsg.textContent = 'You loose';
}
  