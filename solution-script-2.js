// Grab targets
const title = document.getElementById("main-title");
const colorList = document.getElementById("color-list");
const listItems = document.querySelectorAll("#color-list li");
const container = document.querySelector(".container");

// Grab buttons
const btnChangeTitle = document.getElementById("change-title");
const btnHighlightList = document.getElementById("highlight-list");
const btnAddItem = document.getElementById("add-item");
const btnRemoveItem = document.getElementById("remove-item");
const btnToggleTheme = document.getElementById("toggle-theme");

// 1) Change the title text use
btnChangeTitle.addEventListener("click", () => {
  title.textContent = "DOM Manipulated!";
});

// 2) Highlight all list items
btnHighlightList.addEventListener("click", () => {
  listItems.forEach((li) => {
    li.classList.add("highlight");
  });
});

// 3) Add a new list item
btnAddItem.addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = "New Color";
  colorList.appendChild(li);
});

// 4) Remove the last list item
btnRemoveItem.addEventListener("click", () => {
  const items = colorList.querySelectorAll("li");
  const last = items[items.length - 1];
  if (last) last.remove();
});

// 5) Toggle dark theme on container
btnToggleTheme.addEventListener("click", () => {
  container.classList.toggle("dark-theme");
});
