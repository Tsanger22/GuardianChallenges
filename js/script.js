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

const rollBtn = document.getElementById("rollbtn");
const result = document.getElementById("result");
const selectedChallengesList = document.getElementById("selectedChallengesList");

rollBtn.addEventListener("click", () => {
  rollBtn.disabled = true;

  let count = 0;
  const maxCount = 20;

  const spin = setInterval(() => {
    const choice = restrictions[Math.floor(Math.random() * restrictions.length)];
    result.textContent = choice;
    count++;
    if (count > maxCount) {
      clearInterval(spin);
      rollBtn.disabled = false;

      const li = document.createElement("li");
      li.textContent = choice;
      selectedChallengesList.appendChild(li);
    }
  }, 100);
});
