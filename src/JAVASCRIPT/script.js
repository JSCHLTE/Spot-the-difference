import { onUserWin } from './confetti.js';

const msg = document.querySelector('.msg');
const gameWinner = document.querySelector('.game-winner');
const gameWinnerOverlay = document.querySelector('.game-winner-overlay');
const closeBtn = document.querySelector('#closeBtn');

let counter = 0;
const max = 5;
let isClickable = true; // Flag for click debounce

// Handles click events for all clickable areas
const handleClick = (e) => {
  // Prevent if click is not allowed or already found
  if (!isClickable || e.target.classList.contains('found')) {
    return;
  }

  // Mark area as found
  e.target.classList.add('found');
  counter++;
  msg.innerText = `You found ${counter}/${max} differences.`;

  // Check if the user has won
  checkWin();

  // Disable further clicks temporarily
  isClickable = false;
  setTimeout(() => {
    isClickable = true;
  }, 1500); // Delay before re-enabling click (1500ms)
};

// Adds event listeners for each clickable area
document.querySelectorAll('.clickable-area').forEach(area => {
  area.addEventListener('click', handleClick);
});

// Checks if the user has won the game
function checkWin() {
  if (counter === max) {
    onUserWin();
    gameWinner.classList.add('winner-active');
    gameWinnerOverlay.classList.add('winner-active');
  }
}

// Resets the game state when the close button is clicked
closeBtn.addEventListener("click", () => {
  gameWinner.classList.remove('winner-active');
  gameWinnerOverlay.classList.remove('winner-active');
  counter = 0;
  msg.innerText = `0 differences found.`;

  // Reset all clickable areas
  document.querySelectorAll('.clickable-area').forEach(area => {
    area.classList.remove('found');
  });
});