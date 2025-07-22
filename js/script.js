const allChallenges = [
  "Grenade Launchers each slot",
  "No Exotics",
  "RanDIM",
  "Swap Characters",
  "Spec all stats to Health",
  "No Aspects",
  "No Surges",
  "Fusion Rifles in each slot",
  "Equip a sidearm",
  "Swap heavy",
  "No Fragments",
  "Can’t use super",
  "Equip a waveframe",
  "Double special",
  "Put on an off-meta exotic",
  "No 5th level artifact",
  "Only one element for damage",
  "No finishers",
  "No fonts",
  "Use a sword"
];

const repeatableSet = new Set([
  "Equip a sword",
  "Equip a waveframe",
  "Double special",
  "Put on an off-meta exotic",
  "Fusion Rifles in each slot",
  "Equip a sidearm",
  "Swap heavy",
  "RanDIM",
  "Swap Characters",
  "Grenade Launchers each slot"
]);

let uniquePool = allChallenges.filter(r => !repeatableSet.has(r));
let selectedUnique = [];

const rollBtn = document.getElementById("rollbtn");
const result = document.getElementById("result");
const selectedChallengesList = document.getElementById("selectedChallengesList");

// Popup Message
function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popup-content");

  popupContent.textContent = message;
  popup.classList.remove("hidden");

  popupContent.onclick = () => {
    popup.classList.add("hidden");
  };
}

// Render the sidebar
function renderSidebar() {
  const list = document.getElementById('allChallenges');
  list.innerHTML = '';

  allChallenges.forEach(challenge => {
    if (hiddenChallenges.includes(challenge)) return;

    const li = document.createElement('li');
    li.textContent = challenge;

    li.onclick = () => {
      hiddenChallenges.push(challenge);
      localStorage.setItem('hiddenChallenges', JSON.stringify(hiddenChallenges));
      renderSidebar();
    };

    list.appendChild(li);
  });
}

renderSidebar();

// Roll challenge
rollBtn.addEventListener("click", () => {
  rollBtn.disabled = true;

  let count = 0;
  const maxCount = 20;
  let finalChoice = "";

  const spin = setInterval(() => {
    let pool = [];

    if (uniquePool.length > 0 && Math.random() < 0.5) {
      pool = uniquePool;
    } else {
      pool = Array.from(repeatableSet);
    }

    if (pool.length === 0) {
      clearInterval(spin);
      result.textContent = "No more challenges!";
      rollBtn.disabled = false;
      return;
    }

    const choice = pool[Math.floor(Math.random() * pool.length)];
    result.textContent = choice;
    finalChoice = choice;

    count++;
    if (count > maxCount) {
      clearInterval(spin);
      rollBtn.disabled = false;

      showPopup(`You rolled: ${finalChoice}`);

      // adds Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (repeatableSet.has(finalChoice)) {
        return; // repeatables don’t go in the list
      }

      // Remove from uniquePool + add to selected
      uniquePool = uniquePool.filter(r => r !== finalChoice);
      selectedUnique.push(finalChoice);

      // Add clickable list item — NO ❌, just click to remove
      const li = document.createElement("li");
      li.textContent = finalChoice;
      li.style.cursor = "pointer";

      li.onclick = () => {
        li.remove();
        selectedUnique = selectedUnique.filter(r => r !== finalChoice);
        uniquePool.push(finalChoice);
      };

      selectedChallengesList.appendChild(li);
    }
  }, 100);
});

window.addEventListener("load", () => {
  const popup = document.getElementById("popup");
  if (popup && !popup.classList.contains("hidden")) {
    popup.classList.add("hidden");
  }
});
