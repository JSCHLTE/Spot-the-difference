import { onUserWin } from './confetti.js';

const msg = document.querySelector('.msg');
const gameWinnerOverlay = document.querySelector('.game-winner-overlay');
const overlay = document.querySelector('.overlay');
const timerElement = document.getElementById('timer');
const path = window.location.pathname; // E.g., '/play/game1.html'
const gameIdURL = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.')); // Extract 'game1'

let counter = 0; // Tracks differences found
let clicks = 0; // Tracks user clicks
let limit = 10; // Maximum allowed clicks
const max = 5; // Total differences to find
let isClickable = true; // Global debounce flag
let timerInterval; // Stores the timer interval

// Handles click events for all clickable areas
const handleClick = (e) => {
  if (!isClickable || e.target.classList.contains('found')) {
    return; // Ignore if click not allowed or area already found
  }

  e.target.classList.add('found'); // Mark area as found
  counter++;
  clicks++;
  updateClickMessage();

  // Check if the user has won
  checkWin();

  // Temporarily disable clicking globally to prevent spam
  debounceClicks();
};

// Updates the message displaying found differences and clicks
function updateClickMessage() {
  msg.innerText = `Spotted: ${counter}/${max} differences. Clicks: ${clicks}/${limit}`;
}

// Adds event listeners for each clickable area
document.querySelectorAll('.clickable-area').forEach(area => {
  area.addEventListener('click', handleClick);
});

// Global click handler for the overlay
overlay.addEventListener('click', (e) => {
  if (!isClickable) {
    return; // Ignore clicks if debounce is active
  }

  // Only increment clicks if user clicks anywhere and debounce is not active
  clicks++;
  updateClickMessage();

  if (clicks >= limit) {
    alert('You clicked too much!');
    gameReset();
  }

  // Temporarily disable clicking globally to prevent spam
  debounceClicks();
});

// Checks if the user has won the game
function checkWin() {
  if (counter === max) {
    clearInterval(timerInterval); // Stop the timer on win
    onUserWin();
    const gameWinnerWrapper = document.createElement(`div`);
    gameWinnerWrapper.classList.add(`game-winner`);
    gameWinnerWrapper.innerHTML = `
        <h4>Born Buffalo</h4>
        <p>Congratulations! You spotted all the differences.</p>
        <button id="resetBtn">RESET</button>
        <button id="closeBtn">CLOSE</button>`
    document.body.appendChild(gameWinnerWrapper);
    gameWinnerOverlay.classList.add('winner-active');
    localStorage.setItem(gameIdURL, "Completed");
    let resetBtn = gameWinnerWrapper.querySelector('#resetBtn');
    resetBtn.addEventListener("click", () => gameReset(gameWinnerWrapper));
    closeBtn.addEventListener("click", () => removeWinner(gameWinnerWrapper));
  }
}

function removeWinner(arg) {
  arg.remove();
  gameWinnerOverlay.classList.remove('winner-active');
}

function gameReset(arg) {
  // Reset all game variables
  counter = 0;
  clicks = 0;
  clearInterval(timerInterval); // Stop the timer
  msg.innerText = `0 differences found. Clicks: 0/${limit}`;
  
  // Reset all clickable areas
  document.querySelectorAll('.clickable-area').forEach(area => {
    area.classList.remove('found');
  });

  // Reset UI and restart timer
  arg.remove();
  gameWinnerOverlay.classList.remove('winner-active');
  startTimer(90); // Restart the timer for x minutes
}

// Starts a countdown timer and updates the display
function startTimer(durationInSeconds) {
  let remainingTime = durationInSeconds;

  // Clear any existing timer
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    // Format minutes and seconds to always show two digits
    const formattedTime = 
      String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    
    timerElement.textContent = formattedTime;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      alert('Time is up!');
      gameReset();
    }

    remainingTime--;
  }, 1000); // Update every second
}

// Temporarily disables clicking globally to prevent spam
function debounceClicks() {
  isClickable = false;
  setTimeout(() => {
    isClickable = true;
  }, 1500); // Debounce duration (1.5 seconds)
}

// Start the initial timer when the game loads
startTimer(90);
