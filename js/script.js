const allRestrictions = [
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

// Unique pool starts with only non-repeatables
let uniquePool = allRestrictions.filter(r => !repeatableSet.has(r));
let selectedUnique = []; // to track which are currently picked

const rollBtn = document.getElementById("rollbtn");
const result = document.getElementById("result");
const selectedChallengesList = document.getElementById("selectedChallengesList");

function showPopup(message) {
  const popup = document.createElement("div");
  popup.textContent = message;
  popup.style.position = "fixed";
  popup.style.bottom = "30px";
  popup.style.right = "30px";
  popup.style.background = "#66fcf1";
  popup.style.color = "#0b0c10";
  popup.style.padding = "10px 20px";
  popup.style.borderRadius = "5px";
  popup.style.fontFamily = "Arial, sans-serif";
  popup.style.boxShadow = "0 0 10px #66fcf1";
  popup.style.zIndex = "9999";
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 2000);
}

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

      if (repeatableSet.has(finalChoice)) {
        return;
      }

      // Remove from uniquePool + add to selected
      uniquePool = uniquePool.filter(r => r !== finalChoice);
      selectedUnique.push(finalChoice);

      // Add to list with a ❌ button
      const li = document.createElement("li");
      li.textContent = finalChoice + " ";
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "❌";
      removeBtn.style.marginLeft = "10px";
      removeBtn.onclick = () => {
        li.remove();
        // Remove from selected + put back in pool
        selectedUnique = selectedUnique.filter(r => r !== finalChoice);
        uniquePool.push(finalChoice);
      };

      li.appendChild(removeBtn);
      selectedChallengesList.appendChild(li);
    }
  }, 100);
});

