const allGames = document.querySelectorAll(".grid-item");
const path = window.location.pathname;
const gameIdURL = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
const resetBtn = document.getElementById("resetBtn");
const claimBtn = document.getElementById("claimBtn");
const closeBtn = document.getElementById("closeBtn");
const codePopup = document.querySelector(".codePopup");
const popupOverlay = document.querySelector(".popup-overlay");
const secretInput = document.getElementById("secretInput");
const secretForm = document.getElementById("secretForm");

const secret = "bills"

resetBtn.addEventListener("click", ()=> {
    localStorage.clear();
    window.location.reload();
});

claimBtn.addEventListener("click", ()=> {
    codePopup.classList.add("popup-active");
    popupOverlay.classList.add("popup-active");
});

closeBtn.addEventListener("click", closeOverlay);
popupOverlay.addEventListener("click", closeOverlay);

secretForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    let adjInput = secretInput.value.toLowerCase();
    if(adjInput == secret) {
        alert('Working')
    } else {
        alert(`${adjInput} is not correct.`)
    }
})

function closeOverlay() {
    codePopup.classList.remove("popup-active");
    popupOverlay.classList.remove("popup-active");
}

allGames.forEach((game) => {
    const gameId = game.getAttribute('data-game-id');
    const secretLetter = game.getAttribute('data-game-secret');

    console.log(gameId);

    if(localStorage.getItem(gameId) === "Completed") {
        const completedSpan = document.createElement('span');
        completedSpan.classList.add('completed-tag');
        completedSpan.innerText = "Completed";

        // Append the span to the game card
        game.appendChild(completedSpan);

        const hiddenLetter = document.createElement('span');
        hiddenLetter.classList.add('secret-letter');
        hiddenLetter.innerText = `Letter: ${secretLetter}`;

        // Append the span to the game card
        game.appendChild(hiddenLetter);
    }
})