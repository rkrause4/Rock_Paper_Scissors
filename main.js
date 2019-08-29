const images = document.querySelectorAll('img'),
  userScoreDisplayOutput = document.querySelector('#user-score-output'),
  compScoreDisplayOutput = document.querySelector('#comp-score-output'),
  userMoveOutput = document.querySelector('#users-last-move'),
  compMoveOutput = document.querySelector('#comp-last-move'),
  currentRound = document.querySelectorAll('.current-round'),
  totalRounds = document.querySelectorAll('.round-total'),
  gameOverBtn = document.querySelector('#game-reset');
winMessage = document.querySelector('#modal-winning-message');

// Modal Variables
const roundWinnerModalBg = document.querySelector('.round-winner-modal'),
  modalDrawMessage = document.querySelector('#modal-draw'),
  modalWinnerMessage = document.querySelector('#modal-winner'),
  modalWinnerPerson = document.querySelector('#modal-winner-title');

const optionArray = ['Rock', 'Paper', 'Scissors'];

let userScore = 0,
  computerScore = 0,
  roundCount = 0,
  roundTotal = 3,
  gameOver = false;

// Event Listeners
document.addEventListener('DOMContentLoaded', pageLoadSetup);
gameOverBtn.addEventListener('click', resetGame);

function pageLoadSetup() {
  images.forEach(item => {
    item.addEventListener('click', getDeats);
  });

  totalRounds.forEach(item => (item.innerHTML = roundTotal));
}

// Functions
function getDeats(e) {
  let usersPick = e.target.dataset.type;
  let computersPick = getRandomOption();
  displayUserMoves(usersPick.toLowerCase());
  displayCompMoves(computersPick.toLowerCase());
  validateAnswer(usersPick.toLowerCase(), computersPick.toLowerCase());

  // checkGameOver();
}

function getRandomOption() {
  let computersPick =
    optionArray[Math.floor(Math.random() * optionArray.length)];
  return computersPick;
}

function validateAnswer(user, computer) {
  let draw = false;
  if (user === computer) {
    draw = true;
    displayRoundWinner('', draw);
  }
  if (
    (user === 'rock' && computer === 'paper') ||
    (user === 'paper' && computer === 'scissors') ||
    (user === 'scissors' && computer === 'rock')
  ) {
    computerScore += 1;
    roundCount += 1;
    alterScoreAndRounds();
    displayRoundWinner('AI', draw);
  } else if (
    (user === 'paper' && computer === 'rock') ||
    (user === 'scissors' && computer === 'paper') ||
    (user === 'rock' && computer === 'scissors')
  ) {
    userScore += 1;
    roundCount += 1;
    alterScoreAndRounds();
    displayRoundWinner('User', draw);
  }
}

function checkGameOver() {
  if (roundCount === roundTotal) {
    gameOver = true;
  }
}

function displayUserMoves(userPick) {
  userMoveOutput.innerHTML = userPick;
}
function displayCompMoves(compPick) {
  compMoveOutput.innerHTML = compPick;
}

function alterScoreAndRounds() {
  userScoreDisplayOutput.innerHTML = userScore;
  compScoreDisplayOutput.innerHTML = computerScore;

  // Change all current and total rounds across the app
  currentRound.forEach(item => (item.innerHTML = roundCount));
  totalRounds.forEach(item => (item.innerHTML = roundTotal));
}

function displayRoundWinner(msg, draw) {
  roundWinnerModalBg.classList.add('show');
  checkGameOver();
  // Alter modal details
  if (draw === true) {
    modalDrawMessage.style.display = 'block';
    modalWinnerMessage.style.display = 'none';
  } else {
    if (modalDrawMessage.style.display === 'block') {
      modalDrawMessage.style.display = 'none';
    }
    if (modalWinnerMessage.style.display === 'none') {
      modalWinnerMessage.style.display = 'block';
    }
    modalWinnerPerson.innerHTML = msg;
  }

  if (gameOver === true) {
    gameOverBtn.style.display = 'block';

    if (userScore > computerScore) {
      winMessage.innerHTML = 'You have won!';
    } else {
      winMessage.innerHTML = 'You have lost';
    }

    winMessage.style.display = 'block';
    modalWinnerMessage.style.display = 'none';
  } else {
    setTimeout(function() {
      roundWinnerModalBg.classList.remove('show');
    }, 1500);
  }
}

function resetGame(e) {
  // Remove button display
  gameOverBtn.style.display = 'none';
  roundWinnerModalBg.classList.remove('show');
  // Reset stats
  userScore = 0;
  computerScore = 0;
  roundCount = 0;
  gameOver = false;
  userMoveOutput.innerHTML = '';
  compMoveOutput.innerHTML = '';

  userScoreDisplayOutput.innerHTML = userScore;
  compScoreDisplayOutput.innerHTML = computerScore;

  winMessage.style.display = 'none';
  modalWinnerMessage.style.display = 'block';

  currentRound.forEach(item => {
    item.innerHTML = roundCount + 1;
  });
  totalRounds.forEach(item => (item.innerHTML = roundTotal));
  e.preventDefault();
}
