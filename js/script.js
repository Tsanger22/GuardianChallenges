// === Base Restrictions ===
const restrictions = [
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
  "Equip a sword",
  "Paracasual Switch (Swap to a light or dark class based on current)"
];

// Challenges that do NOT go into history:
const excludedHistory = [
  "Put on an off-meta exotic",
  "RanDIM",
  "Swap Characters",
  "Grenade Launchers each slot",
  "Equip a waveframe",
  "Double special",
  "Fusion Rifles in each slot",
  "Equip a sidearm",
  "Swap heavy",
  "Equip a sword",
  "Paracasual Switch (Swap to a light or dark class based on current)"
];

// === State ===
let history = [];
let customRestrictions = [];
let hiddenRestrictions = [];

const rollBtn = document.getElementById("rollbtn");
const result = document.getElementById("result");
const rollSound = document.getElementById("rollSound");

// === INIT ===
loadHistory();
loadCustomRestrictions();
loadHiddenRestrictions();
renderHistory();
renderAllRestrictions();

// === ROLL BUTTON ===
rollBtn.addEventListener("click", () => {
  if (rollBtn.disabled) return;

  rollBtn.disabled = true;

  const available = getVisibleRestrictions().filter(r => !history.includes(r));

  if (available.length === 0) {
    result.textContent = "No more restrictions available.";
    rollBtn.disabled = false;
    return;
  }

  let count = 0;
  const spin = setInterval(() => {
    const final = available[Math.floor(Math.random() * available.length)];
    result.textContent = final;

    result.style.boxShadow = '0 0 60px #66fcf1';
    setTimeout(() => result.style.boxShadow = '0 0 20px #66fcf1', 200);

    count++;
    if (count > 20) {
      clearInterval(spin);
      if (!excludedHistory.includes(final)) {
        addToHistory(final);
      }
      showRollModal(final);

      // Play sound
      rollSound.currentTime = 0;
      rollSound.play();

      // Confetti
      launchConfetti();
      startConfettiRain();

      rollBtn.disabled = false;
    }
  }, 100);
});

// === HISTORY ===
function addToHistory(item) {
  history.push(item);
  saveHistory();
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("history");
  list.innerHTML = "";

  history.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = item;

    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.addEventListener("click", () => {
      history.splice(i, 1);
      saveHistory();
      renderHistory();
    });

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function saveHistory() {
  localStorage.setItem("history", JSON.stringify(history));
}

function loadHistory() {
  const saved = localStorage.getItem("history");
  if (saved) {
    history = JSON.parse(saved);
  }
}

// === RESTRICTIONS LIST ===
function renderAllRestrictions() {
  const list = document.getElementById("allRestrictions");
  list.innerHTML = "";

  getVisibleRestrictions().forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;

    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.addEventListener("click", () => {
      hiddenRestrictions.push(item);
      saveHiddenRestrictions();
      renderAllRestrictions();
    });

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function getVisibleRestrictions() {
  return restrictions.filter(r => !hiddenRestrictions.includes(r));
}

function saveHiddenRestrictions() {
  localStorage.setItem("hiddenRestrictions", JSON.stringify(hiddenRestrictions));
}

function loadHiddenRestrictions() {
  const saved = localStorage.getItem("hiddenRestrictions");
  if (saved) {
    hiddenRestrictions = JSON.parse(saved);
  }
}

function saveCustomRestrictions() {
  localStorage.setItem("customRestrictions", JSON.stringify(customRestrictions));
}

function loadCustomRestrictions() {
  const saved = localStorage.getItem("customRestrictions");
  if (saved) {
    customRestrictions = JSON.parse(saved);
    customRestrictions.forEach(cust => {
      if (!restrictions.includes(cust)) {
        restrictions.push(cust);
      }
    });
  }
}

// === ADD CUSTOM ===
document.getElementById("addCustomBtn").addEventListener("click", () => {
  const input = document.getElementById("customInput");
  const val = input.value.trim();
  if (val && !customRestrictions.includes(val)) {
    customRestrictions.push(val);
    restrictions.push(val);
    saveCustomRestrictions();
    hiddenRestrictions = hiddenRestrictions.filter(r => r !== val);
    saveHiddenRestrictions();
    renderAllRestrictions();
    input.value = "";
  }
});

// === CLEAR & RESET ===
document.getElementById("clearAllBtn").addEventListener("click", () => {
  history = [];
  saveHistory();
  renderHistory();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  history = [];
  hiddenRestrictions = [];
  customRestrictions = [];
  localStorage.clear();

  restrictions.length = 0;
  restrictions.push(
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
    "Equip a sword",
    "Paracasual Switch (Swap to a light or dark class based on current)"
  );

  saveHistory();
  saveHiddenRestrictions();
  saveCustomRestrictions();

  renderHistory();
  renderAllRestrictions();
});

// === MODAL ===
const modal = document.getElementById("rollModal");
const modalText = document.getElementById("modalText");

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

function showRollModal(msg) {
  modalText.textContent = msg;
  modal.style.display = "block";

  const content = document.querySelector(".modal-content");
  content.classList.remove("show");
  setTimeout(() => content.classList.add("show"), 10);
}

// === CONFETTI ===
function launchConfetti() {
  const end = Date.now() + 1000;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function startConfettiRain() {
  const end = Date.now() + 3000;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 120
  };

  const interval = setInterval(() => {
    const timeLeft = end - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    confetti({
      ...defaults,
      particleCount: 50 * (timeLeft / 3000),
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
  }, 200);
}

// === RETURN BUTTON ===
document.getElementById("returnBtn").addEventListener("click", () => {
  window.location.href = "https://codepen.io/Tsanger22/full/MYaKWNg";
});
