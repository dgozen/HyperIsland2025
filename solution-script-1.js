// Mouse
const btnClick = document.getElementById("btn-click");
const hoverBox = document.getElementById("hover-box");

//named function example
const handleClick = () => {
  btnClick.innerText = "Clicked!";
};

//function syntax example
function handleClick() {
  btnClick.textContent = "Clicked!";
}
// btnClick.addEventListener("click", handleClick);

//anonymous function example
btnClick.addEventListener("click", () => {
  btnClick.textContent = "Clicked!";
});

hoverBox.addEventListener("mouseover", () => {
  hoverBox.style.borderColor = "#2d7ef7";
});
hoverBox.addEventListener("mouseout", () => {
  hoverBox.style.borderColor = "transparent";
});

// Keyboard & Input
const nameInput = document.getElementById("name-input");
const liveOutput = document.getElementById("live-output");

nameInput.addEventListener("input", () => {
  const value = nameInput.value.trim();
  liveOutput.textContent = value ? `Live: ${value}` : "Live: (nothing yet)";
});

// Form
const form = document.getElementById("signup-form");
const email = document.getElementById("email");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = `Thanks, ${email.value}!`;
});

// Page / Window
const sizeEl = document.getElementById("window-size");
function updateSize() {
  sizeEl.textContent = `Size: ${window.innerWidth} × ${window.innerHeight}`;
}
window.addEventListener("load", updateSize);
window.addEventListener("resize", updateSize);
