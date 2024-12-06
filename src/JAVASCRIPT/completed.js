const allGames = document.querySelectorAll(".grid-item");
const path = window.location.pathname;
const gameIdURL = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
const resetBtn = document.getElementById("resetBtn");
const claimBtn = document.getElementById("claimBtn");
const verifyPopupClose = document.querySelector(".verify-popup-close");
const verifyPopup = document.querySelector(".verify-popup");
const popupOverlay = document.querySelector(".popup-overlay");
const verifyForm = document.getElementById("verify-popup-form");
const verifyInput = document.getElementById("verify-popup-input");

const final = "YmlsbHM=";
const finalatob = atob(final);

resetBtn.addEventListener("click", ()=> {
    let yesno = confirm("Are you sure you want to reset all your progress?")
    if(yesno) {
        resetLS();
    }
});

claimBtn.addEventListener("click", ()=> {
    verifyPopup.classList.add("active");
    popupOverlay.classList.add("popup-active");
});

verifyPopupClose.addEventListener("click", closeOverlay)
popupOverlay.addEventListener("click", closeOverlay);

verifyForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    let adjInput = verifyInput.value.toLowerCase();
    if(adjInput == finalatob) {
        alert('You solved the secret puzzle!')
    } else {
        alert(`${adjInput} is not correct.`);
        verifyInput.value = '';
        verifyInput.focus();
    }
});

function resetLS() {
    localStorage.clear();
    window.location.reload();
}

function closeOverlay() {
    verifyPopup.classList.remove("active");
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