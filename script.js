// How many colors to show. Try changing this to 3 or 7, then commit and push!
const NUMBER_OF_COLORS = 5;

const paletteEl = document.getElementById("palette");
const generateBtn = document.getElementById("generate");
const toastEl = document.getElementById("toast");

// Each color is stored as { hex: "#AABBCC", locked: false }
let colors = [];

function randomHex() {
  const value = Math.floor(Math.random() * 0xffffff);
  return "#" + value.toString(16).padStart(6, "0").toUpperCase();
}

function generatePalette() {
  for (let i = 0; i < NUMBER_OF_COLORS; i++) {
    if (!colors[i] || !colors[i].locked) {
      colors[i] = { hex: randomHex(), locked: false };
    }
  }
  render();
}

function render() {
  paletteEl.innerHTML = "";

  colors.forEach((color, index) => {
    const swatch = document.createElement("div");
    swatch.className = "swatch";
    swatch.style.background = color.hex;
    swatch.title = "Click to copy " + color.hex;

    const hex = document.createElement("span");
    hex.className = "hex";
    hex.textContent = color.hex;

    const lock = document.createElement("button");
    lock.className = "lock";
    lock.textContent = color.locked ? "🔒 Locked" : "🔓 Lock";
    lock.addEventListener("click", (event) => {
      event.stopPropagation(); // don't also copy the color
      colors[index].locked = !colors[index].locked;
      render();
    });

    swatch.addEventListener("click", () => copyColor(color.hex));

    swatch.appendChild(hex);
    swatch.appendChild(lock);
    paletteEl.appendChild(swatch);
  });
}

function copyColor(hex) {
  navigator.clipboard.writeText(hex).then(
    () => showToast("Copied " + hex),
    () => showToast("Couldn't copy, try again")
  );
}

function showToast(message) {
  toastEl.textContent = message;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => (toastEl.textContent = ""), 1500);
}

generateBtn.addEventListener("click", generatePalette);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault(); // stop the page from scrolling
    generatePalette();
  }
});

generatePalette();
