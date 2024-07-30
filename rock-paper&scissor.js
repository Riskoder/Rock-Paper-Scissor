const buttons = document.querySelectorAll('.button');
const round = document.querySelector('.round');
const result = document.querySelector('.round-results');
const roundtext = document.querySelector('.round-result');
const winner = document.querySelector('.winner');
const playerPoints = document.querySelector('.player-points')
const computerPoints = document.querySelector('.computer-points')
let rounds = 1

function getComputerChoice(possibleChoices) {
  const computerInput = Math.floor(Math.random() * possibleChoices.length);
  return possibleChoices[computerInput]
};

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return 'tie';
  }
  if (
    (humanChoice === 'paper' && computerChoice === 'rock') ||
    (humanChoice === 'rock' && computerChoice === 'scissors') || 
    (humanChoice === 'scissors' && computerChoice === 'paper') 
  ) {
    return 'player';
  } else {
    return 'computer';
  };
};

function disableButtons() {
  buttons.forEach((button) => {
    button.setAttribute('disabled', '');
  })
}

function countRounds() {
  rounds++;
  round.innerHTML = `Ronda: ${rounds}`;
  return rounds
};

function resetGame() {
  const resetButton = document.createElement('button')
  resetButton.textContent = 'RESET';
  resetButton.style.cssText = 'width: 80px, height: 40px'
  winner.appendChild(resetButton);
  resetButton.addEventListener('click', () => {
    window.location.reload()
  })
}

function playGame() {
  const possibleChoices = ['paper', 'rock', 'scissors'];

  let humanScore = 0;
  let computerScore = 0;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const humanSelection = button.value;
      const computerSelection = getComputerChoice(possibleChoices);
      
      const roundWinner = playRound(humanSelection, computerSelection);
    
      if (roundWinner === 'tie') {
        result.innerHTML = `Draw`;
        roundtext.innerHTML = `Both chose: ${humanSelection}`
      } else if (roundWinner === 'player') {
        humanScore++;
        result.innerHTML = `You Win!`;
        roundtext.innerHTML = `${humanSelection} Beats ${computerSelection}`
        playerPoints.innerHTML = `Puntos: ${humanScore}`
      } else {
        computerScore++;
        result.innerHTML = 'You lost...'
        roundtext.innerHTML = `${computerSelection} Beats ${humanSelection}`;
        computerPoints.innerHTML = `Points: ${computerScore}`
      };

      countRounds()
      
      if(humanScore >= 5 || computerScore >= 5) {
        disableButtons()
        if (humanScore > computerScore) {
          winner.innerHTML = `The Player Has Won!`
        } else {
          winner.innerHTML = `The Player lost...`
        }
        resetGame();
      };
    })
  })
};

playGame();