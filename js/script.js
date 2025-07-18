const restrictions = [
  "Grenade Launchers each slot",
  "No Exotics",
  "RanDIM",
  "Swap Characters",
  "Spec all stats to Health",
  "No Aspects",
  "No Surges"
];

const rollBtn = document.getElementById("rollbtn");
const result = document.getElementById("result");
const selectedChallengesList = document.getElementById("selectedChallengesList");

rollBtn.addEventListener("click", () => {
  const choice = restrictions[Math.floor(Math.random() * restrictions.length)];
  result.textContent = choice;

  const li = document.createElement("li");
  li.textContent = choice;
  selectedChallengesList.appendChild(li);
});
