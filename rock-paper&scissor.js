function getComputerChoice(possibleChoices) {
  const computerInput = Math.floor(Math.random() * possibleChoices.length);
  return possibleChoices[computerInput]
};

function getHumanChoice(possibleChoices) {
  while (true) {
    const userInput = String(prompt('Escoga alguna opcion: Piedra - Papel o Tijera')).toLowerCase()
    if (!possibleChoices.includes(userInput)) {
      console.log('Opción no válida. Por favor eliga otra!');
      continue;
    };
    return userInput;
  };
};

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return 'tie';
  }
  if (
    (humanChoice === 'paper' && computerChoice === 'rock') ||
    (humanChoice === 'rock' && computerChoice === 'scissor') || 
    (humanChoice === 'scissor' && computerChoice === 'paper') 
  ) {
    return 'player';
  } else {
    return 'computer';
  };
};

function playGame() {
  const possibleChoices = ['paper', 'rock', 'scissor'];

  let humanScore = 0;
  let computerScore = 0;

  for (let countRounds = 1; countRounds <= 5; countRounds++) {
    
    const humanSelection = getHumanChoice(possibleChoices);
    const computerSelection = getComputerChoice(possibleChoices);
    
    console.log(`Ronda Número: ${countRounds}`);
    console.log(`La Máquina ha escogido: ${computerSelection}\nEl jugador ha escogido: ${humanSelection}\n`)

    const roundWinner = playRound(humanSelection, computerSelection);

    if (roundWinner === 'tie') {
      console.log('Ha sido un empate');
    } else if (roundWinner === 'player') {
      humanScore++
      console.log(`El jugado ha ganado la ronda. Ha ganado un punto! | puntos: ${humanScore}`);
    } else {
      computerScore++
      console.log(`La Máquina ha ganado la ronda...Ha sumado un punto. | puntos: ${computerScore}`);
    };
  };
  

  if(humanScore > computerScore) {
    console.log('El jugador ha ganado la partida con un puntaje de: ',humanScore);
  } else if (humanScore < computerScore) {
    console.log('El jugador ha perdido contra la maquina. La maquina ha ganado con un puntaje de: ',computerScore);
  } else {
    console.log('Ha sido un empate!');
  };
};

playGame();