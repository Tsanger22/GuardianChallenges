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

// Holds all user-hidden challenges (localStorage)
let hiddenChallenges = JSON.parse(localStorage.getItem('hiddenChallenges')) || [];

// Unique pool = all non-repeatables minus hidden
function getUniquePool() {
  return allChallenges.filter(r => !repeatableSet.has(r) && !hiddenChallenges.includes(r));
}

// Repeatables pool = all repeatables minus hidden
function getRepeatablePool() {
  return Array.from(repeatableSet).filter(r => !hiddenChallenges.includes(r));
}

let selectedUnique = [];

const rollBtn = document.getElementById("rollbtn");
const result = document.getElementById("result");
const selectedChallengesList = document.getElementById("selectedChallengesList");

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

function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popup-content");
  popupContent.textContent = message;
  popup.classList.remove("hidden");

  popupContent.onclick = () => {
    popup.classList.add("hidden");
  };
}

rollBtn.addEventListener("click", () => {
  rollBtn.disabled = true;

  let count = 0;
  const maxCount = 20;
  let finalChoice = "";

  const spin = setInterval(() => {
    let uniquePool = getUniquePool();
    let repeatablePool = getRepeatablePool();

    let pool = [];

    if (uniquePool.length > 0 && Math.random() < 0.5) {
      pool = uniquePool;
    } else {
      pool = repeatablePool;
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

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (repeatableSet.has(finalChoice)) {
        return; // repeatables do not persist
      }

      // Remove unique from pool by hiding it too:
      hiddenChallenges.push(finalChoice);
      localStorage.setItem('hiddenChallenges', JSON.stringify(hiddenChallenges));

      selectedUnique.push(finalChoice);
      const li = document.createElement("li");
      li.textContent = finalChoice;
      li.onclick = () => {
        li.remove();
        selectedUnique = selectedUnique.filter(r => r !== finalChoice);
        // Also unhide from hiddenChallenges
        hiddenChallenges = hiddenChallenges.filter(h => h !== finalChoice);
        localStorage.setItem('hiddenChallenges', JSON.stringify(hiddenChallenges));
        renderSidebar();
      };
      selectedChallengesList.appendChild(li);

      renderSidebar();
    }
  }, 100);
});

document.getElementById("resetHiddenBtn")?.addEventListener("click", () => {
  hiddenChallenges = [];
  localStorage.removeItem('hiddenChallenges');
  renderSidebar();
});

window.addEventListener("load", () => {
  const popup = document.getElementById("popup");
  if (popup && !popup.classList.contains("hidden")) {
    popup.classList.add("hidden");
  }
});

