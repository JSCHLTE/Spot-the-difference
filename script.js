const msg = document.querySelector('.msg');
let counter = 0;
let max = 5;

document.querySelectorAll('.clickable-area').forEach(area => {
    area.addEventListener('click', (e) => {
    if(e.target.classList.contains('found')) {
        return;
    }
      const differenceId = e.target.getAttribute('data-difference');
      e.target.classList.add('found');
      counter++;
      msg.innerText = `You found ${counter}/${max} differences.`;
      if(counter === max) {
        alert("You found all the differences! Stay tuned next friday for a new puzzle.")
      }
    });
  });
  