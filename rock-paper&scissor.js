const buttonContainer = document.querySelector('.selections');
const round = document.querySelector('.round');
const result = document.querySelector('.round-results');
const roundtext = document.querySelector('.round-result');
const winner = document.querySelector('.winner');
const playerPoints = document.querySelector('.player-points');
const computerPoints = document.querySelector('.computer-points');

const possibleChoices = ['paper', 'rock', 'scissors'];

let rounds = 1
let humanScore = 0;
let computerScore = 0;

const rules = {
  'rock': 'scissors',
  'paper': 'rock',
  'scissors': 'paper'
};

function getComputerChoice(possibleChoices) {
  const randomIndex = Math.floor(Math.random() * possibleChoices.length);
  return possibleChoices[randomIndex]
};

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) return 'tie';
  return rules[humanChoice] === computerChoice ? 'player' : 'computer';
};

function disableButtons() {
  buttonContainer.querySelectorAll('.button').forEach(button => button.disabled = true);
}

function updateScores() {
  computerPoints.textContent = `Points: ${computerScore}`;
  playerPoints.textContent = `Puntos: ${humanScore}`;
};

function countRounds() {
  rounds++;
  round.textContent = `Ronda: ${rounds}`;
};

function resetGame() {
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  resetButton.style.width = '80px'
  resetButton.style.height = '40px';
  winner.appendChild(resetButton);
  resetButton.addEventListener('click', () => {
    humanScore = 0;
    computerScore = 0;
    rounds = 1;
    updateScores();
    result.textContent = '';
    roundtext.textContent = '';
    round.textContent = `Ronda ${rounds}`;
    buttonContainer.querySelectorAll('.button').forEach(button => button.disabled = false);
    winner.textContent = '';
  });
};

function playGame() {
  buttonContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('button')) {
      const humanSelection = event.target.value;
      const computerSelection = getComputerChoice(possibleChoices);
      
      const roundWinner = playRound(humanSelection, computerSelection);
    
      if (roundWinner === 'tie') {
        result.textContent = `Draw`;
        roundtext.textContent = `Both chose: ${humanSelection}`
      } else if (roundWinner === 'player') {
        humanScore++;
        result.textContent = `You Win!`;
        roundtext.textContent = `${humanSelection} Beats ${computerSelection}`
      } else {
        computerScore++;
        result.textContent = 'You lost...'
        roundtext.textContent = `${computerSelection} Beats ${humanSelection}`;
      };

      updateScores();
      countRounds();

      if (humanScore >= 5 || computerScore >= 5) {
        disableButtons();
        winner.textContent = humanScore > computerScore ? 'The Player Has Won!' : 'The Player Lost...';
        resetGame();
      }
    };
  });
};

playGame();