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

    x.class && paragraph.classList.add(x.class);
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
  items.push({ id: paragraph.id, item: inputValue, class: "" });
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
    const index = items.findIndex((item) => item.id === id);

    if (paragraph.className.includes("line-through")) {
      paragraph.classList.remove("line-through");
      items[index].class = "";
    } else {
      paragraph.classList.add("line-through");
      items[index].class = "line-through";
    }
    localStorage.setItem("items", JSON.stringify(items));
  });

  paragraph.addEventListener("dblclick", () => {
    console.log(id);
    toDoContainer.removeChild(paragraph);
    const index = items.findIndex((item) => item.id === id);
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
  });
}

document.addEventListener("keydown", (event) => {
  event.key === "Enter" && addButton.click();
});

function throwError(message) {
  alert(message);
}
