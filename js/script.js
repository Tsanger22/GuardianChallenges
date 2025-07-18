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
  "Swap to a dark subclass if you are light and vise versa"
];

// Define which are repeatable
const repeatableSet = new Set([
  "Equip a sword",
  "Swap to a dark subclass if you are light and vise versa",
  "Equip a waveframe",
  "Double special",
  "Put on a “off-meta” exotic",
  "Fusion Rifles in each slot",
  "Equip a sidearm",
  "Swap heavy",
  "RanDIM",
  "Swap Characters",
  "Grenade Launchers each slot"
]);

rollBtn.addEventListener("click", () => {
  const choice = restrictions[Math.floor(Math.random() * restrictions.length)];
  result.textContent = choice;

  if (repeatableSet.has(choice)) {
    // Show in result but don't add to list
    return;
  }

  // For unique ones, check duplicates and add
  const existingItems = Array.from(selectedChallengesList.children).map(li => li.textContent);

  if (existingItems.includes(choice)) {
    alert("This challenge is already selected!");
    return; // no duplicate
  }

  const li = document.createElement("li");
  li.textContent = choice;
  selectedChallengesList.appendChild(li);
});
