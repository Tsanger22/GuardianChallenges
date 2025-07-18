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
  "Use a sword"
];

const button = document.getElementById('rollbtn');
const result = document.getElementById('result');

button.addEventListener('click', () => {
  button.disabled = true;
  let count = 0;
  const maxCount = 20;
  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * restrictions.length);
    result.textContent = restrictions[randomIndex];

    // Flicker/glow effect on result
    result.style.boxShadow = '0 0 40px #66fcf1';

    setTimeout(() => {
      result.style.boxShadow = '0 0 20px #66fcf1';
    }, 100);

    count++;
    if (count > maxCount) {
      clearInterval(interval);
      button.disabled = false;
    }
  }, 100);
});
