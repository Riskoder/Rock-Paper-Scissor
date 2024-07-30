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
        result.innerHTML = `Empate`;
        roundtext.innerHTML = `Ambos escogieron: ${humanSelection}`
      } else if (roundWinner === 'player') {
        humanScore++;
        result.innerHTML = `HAS GANADO!`;
        roundtext.innerHTML = `${humanSelection} gana sobre ${computerSelection}`
        playerPoints.innerHTML = `Puntos: ${humanScore}`
      } else {
        computerScore++;
        result.innerHTML = 'Has Perdido...'
        roundtext.innerHTML = `${computerSelection} gana sobre ${humanSelection}`;
        computerPoints.innerHTML = `Puntos: ${computerScore}`
      };

      countRounds()
      
      if(humanScore >= 5 || computerScore >= 5) {
        disableButtons()
        if (humanScore > computerScore) {
          winner.innerHTML = `El jugado ha ganado!`
        } else {
          winner.innerHTML = `La maquina ha ganado...`
        }
        resetGame();
      };
    })
  })
};

playGame();