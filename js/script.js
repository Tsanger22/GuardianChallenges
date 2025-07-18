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
  "Use a sword"
];

// Challenges that are allowed to repeat and NOT added to the list
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

const rollBtn = document.getElementById("rollbtn");
const result = document.getElementById("result");
const selectedChallengesList = document.getElementById("selectedChallengesList");

rollBtn.addEventListener("click", () => {
  rollBtn.disabled = true;

  let count = 0;
  const maxCount = 20;
  let finalChoice = "";

  const spin = setInterval(() => {
    const choice = restrictions[Math.floor(Math.random() * restrictions.length)];
    result.textContent = choice;
    finalChoice = choice;
    count++;
    if (count > maxCount) {
      clearInterval(spin);
      rollBtn.disabled = false;

      if (repeatableSet.has(finalChoice)) {
        // repeatable - show result but don't add
        return;
      }

      // Check duplicates before adding
      const existingItems = Array.from(selectedChallengesList.children).map(li => li.textContent);
      if (existingItems.includes(finalChoice)) {
        alert("This challenge is already selected!");
        return;
      }

      const li = document.createElement("li");
      li.textContent = finalChoice;
      selectedChallengesList.appendChild(li);
    }
  }, 100);
});
