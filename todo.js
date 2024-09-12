const addButton = document.getElementById("button-add-item");
const clearButton = document.getElementById("clear");
const toDoContainer = document.getElementById("todo-container");
const inputField = document.getElementById("input-field");
const bannedWords = ["dick", "bitch", "fuck", "cunt"];
const items = JSON.parse(localStorage.getItem("items")) || [];

if (items.length) {
  for (x of items) {
    const paragraph = document.createElement("li");
    toDoContainer.appendChild(paragraph);
    paragraph.innerText = x.item;
    paragraph.classList.add("paragraph-style");

    x.checked
      ? paragraph.classList.add("line-through")
      : paragraph.classList.remove("line-through");

    giveListeners(paragraph, x.id);
  }
}

addButton.addEventListener("click", () => {
  const paragraph = document.createElement("li");
  const inputValue = document.getElementById("input-field").value;
  const inputToLowerCase = inputValue.toLowerCase();

  for (let word of bannedWords) {
    if (inputToLowerCase.includes(word.toLowerCase())) {
      return throwError("Banned word");
    }
  }

  if (inputValue.length === 0) {
    return throwError("Please enter a value");
  }

  toDoContainer.appendChild(paragraph);
  paragraph.innerText = inputValue;
  paragraph.id = items.length;
  paragraph.classList.add("paragraph-style");
  inputField.value = "";
  items.push({ id: paragraph.id, item: inputValue, checked: true });
  localStorage.setItem("items", JSON.stringify(items));

  giveListeners(paragraph, paragraph.id);
});

clearButton.addEventListener("click", () => {
  localStorage.clear();
  while (toDoContainer.firstChild) {
    toDoContainer.removeChild(toDoContainer.firstChild);
  }
});

function giveListeners(paragraph, id) {
  paragraph.addEventListener("click", () => {
    console.log(id);
    paragraph.className.includes("line-through")
      ? paragraph.classList.remove("line-through")
      : paragraph.classList.add("line-through");
  });

  paragraph.addEventListener("dblclick", () => {
    toDoContainer.removeChild(paragraph);
  });
}

document.addEventListener("keydown", (event) => {
  event.key === "Enter" && addButton.click();
});

function throwError(message) {
  alert(message);
}
