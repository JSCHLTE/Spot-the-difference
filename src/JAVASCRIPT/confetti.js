export function onUserWin() {
    createConfetti();
  }
  
  function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    
    // Ensure the confetti container exists
    if (!confettiContainer) return;
  
    // Create 1000 confetti pieces
    for (let i = 0; i < 1000; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
  
      // Randomize confetti appearance
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.left = `${Math.random() * 100}vw`; // Random horizontal position
      confetti.style.animationDelay = `${Math.random() * 5}s`; // Random animation start delay
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`; // Random rotation
  
      confettiContainer.appendChild(confetti);
  
      // Remove confetti after animation completes (10 seconds)
      setTimeout(() => confetti.remove(), 10000);
    }
  }
  