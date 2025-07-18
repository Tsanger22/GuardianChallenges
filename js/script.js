// List of all challenges
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
  "Put on a “off-meta” exotic",
  "No 5th level artifact",
  "Only one element for damage",
  "No finishers",
  "No fonts",
  "Equip a sword",
  "Paracasual Switch (Swap to a light or dark class based on current)"
];


const excludedHistory = [
  "Put on a “off-meta” exotic",
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


// Set up constants
const button = document.getElementById("rollbtn");
const result = document.getElementById("result");
let history = [];
let customRestrictions = [];
let hiddenRestrictions = [];


// Engram Sound
document.addEventListener("DOMContentLoaded", () => {
  const rollSound = document.getElementById("rollSound");

  // your existing JS code that uses rollSound goes here
});


//Load History
loadHistory();
loadCustomRestrictions();
loadHiddenRestrictions();


// Render all possible challenges via function
renderAllRestrictions();

// Roll Challenge Button
button.addEventListener("click", () => {
  if (button.disabled) return; // If already disabled, do nothing

  // Disable the button
  button.disabled = true;
  
  // Making a list of available restrictions
  const available = restrictions.filter(r => !history.includes(r));
  
  
  if (available.length ===0) {
    result.textContent = "No more restrictions available."
    button.disabled = false;
    return;
  }
  
  
  let count = 0;
  const spin = setInterval(() => {
    final = available[Math.floor(Math.random() * available.length )];
    result.textContent = final;
    // Flash glow on each spin step
  result.style.boxShadow = '0 0 60px #66fcf1';

  setTimeout(() => {
    result.style.boxShadow = '0 0 20px #66fcf1';
  }, 200);
    count++;
    if (count > 20) {
      clearInterval(spin);
      addToHistory(result.textContent);
      
      // Show Pop Up
      showRollModal(`${result.textContent}`);
      
      // Play sound on roll finish
      rollSound.currentTime = 0;
      rollSound.play();
      
      // Confetti
      launchConfetti();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
      startConfettiRain();
      
      button.disabled = false;
    }
  }, 100);
});



// Adds appended to history
function addToHistory(text) {
  if (!excludedHistory.includes(text)) {
    history.push(text);
    renderHistory();
  }
}


// Confetti...
function launchConfetti() {
  const duration = 1 * 1000; // 1 second
  const end = Date.now() + duration;

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
  }());
}

function startConfettiRain() {
  const duration = 3000; // 3 seconds
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 120,
    zIndex: 0
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    // More particles per burst
    const particleCount = 50 * (timeLeft / duration);

    // Left side burst
    confetti({
      ...defaults,
      particleCount: particleCount,
      origin: { x: randomInRange(0, 1), y: Math.random() - 0.2 }
    });
  }, 200);
}



// Shows rolled challenges and button to remove them
function renderHistory() {
  const list = document.getElementById("history");
  list.innerHTML = "";

  history.forEach((item, index) => {
    const li = document.createElement("li");
    
    // Create a span for the text
    const span = document.createElement("span");
    span.textContent = item;

    // Create the remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", () => {
      history.splice(index, 1);
      renderHistory();
    });

    // Build the li
    li.appendChild(span);
    li.appendChild(removeBtn);

    list.appendChild(li);
  });
  saveHistory();
}


// History helper functions
function saveHistory() {
  localStorage.setItem("history", JSON.stringify(history));
}

function loadHistory() {
  const storedHistory = localStorage.getItem("history");
  if (storedHistory) {
    history = JSON.parse(storedHistory);
    renderHistory();
  }
}


//Render all the restrictions
function renderAllRestrictions() {
  const list = document.getElementById("allRestrictions");
  list.innerHTML = "";
  
  getVisibleRestrictions().forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.style.marginLeft = "10px";
    removeBtn.addEventListener("click", () => {
      // Add to hiddenRestrictions and save
      hiddenRestrictions.push(item);
      saveHiddenRestrictions();
      renderAllRestrictions();
    });
    li.appendChild(removeBtn);

    list.appendChild(li);
  });
}


// Helper function for saving local storage for custom challenges
function saveCustomRestrictions() {
  localStorage.setItem("customRestrictions", JSON.stringify(customRestrictions));
}


function loadCustomRestrictions(){
  const saved = localStorage.getItem("customRestrictions");
  if (saved) {
    customRestrictions = JSON.parse(saved);

    // Merge customs into restrictions if not present
    customRestrictions.forEach(cust => {
      if (!restrictions.includes(cust)) {
        restrictions.push(cust);
      }
    });
  }

  renderAllRestrictions();  // Render only once AFTER merging
}

function loadHiddenRestrictions() {
  const saved = localStorage.getItem("hiddenRestrictions");
  if (saved) {
    hiddenRestrictions = JSON.parse(saved);
  } else {
    hiddenRestrictions = [];
  }
}


function saveHiddenRestrictions() {
  localStorage.setItem("hiddenRestrictions", JSON.stringify(hiddenRestrictions));
}

// Get combined restrictions filtered by hidden
function getVisibleRestrictions() {
  return restrictions.filter(r => !hiddenRestrictions.includes(r));
}



// Adding Custom Challenges
document.getElementById("addCustomBtn").addEventListener("click", () => {
  const input = document.getElementById("customInput");
  const customText = input.value.trim();

  if (customText && !customRestrictions.includes(customText)) {
    customRestrictions.push(customText);    // Add to customRestrictions
    restrictions.push(customText);           // Add also to restrictions for rolling
    saveCustomRestrictions();                // Save updated customs
    // Make sure custom isn’t hidden if user re-adds it
    hiddenRestrictions = hiddenRestrictions.filter(r => r !== customText);
    saveHiddenRestrictions();
    renderAllRestrictions();  
    input.value="";
  }
});


// Clear History
document.getElementById("clearAllBtn").addEventListener("click", () => {
  history = [];
  localStorage.removeItem("history");
  renderHistory();
});


// Reset Page
document.getElementById("resetBtn").addEventListener("click", () => {
  history = [];
  localStorage.removeItem("history");
  renderHistory();
  customRestrictions = [];
  hiddenRestrictions =[];
  localStorage.removeItem("customRestrictions");
  localStorage.removeItem("hiddenRestrictions");
    restrictions.length = 0;
  restrictions.push(
    "Grenade Launchers each slot",
    "No Exotics",
    "RanDIM",
    "Swap Characters",
    "Spec all stats to Health",
    "Equip Stasis",
    "No Aspects",
    "No Surges",
    "Fusion Rifles in each slot",
    "Equip a sidearm",
    "Swap heavy",
    "No Fragments",
    "Can’t use super",
    "Equip a waveframe",
    "Double special",
    "Put on a “off-meta” exotic",
    "No 5th level artifact",
    "Only one element for damage",
    "No finishers",
    "No fonts",
    "Use a sword"
  );
  renderAllRestrictions();
})


// Pop Up
const modal = document.getElementById("rollModal");
const modalText = document.getElementById("modalText");


// Optional: clicking outside also closes
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Show the modal when you finish the spin:
function showRollModal(message) {
  modalText.textContent = message;
  modal.style.display = "block";

  const content = document.querySelector(".modal-content");
  // Small timeout to ensure display is set before adding class
  setTimeout(() => {
    content.classList.add("show");
  }, 10);
}


// Return
document.getElementById("returnBtn").addEventListener("click", () => {
  window.location.href = "https://codepen.io/Tsanger22/full/MYaKWNg";
});
