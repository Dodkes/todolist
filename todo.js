const addButton = document.getElementById("button-add-item");
const clearButton = document.getElementById("clear");
const toDoContainer = document.getElementById("todo-container");
const inputField = document.getElementById("input-field");
const bannedWords = ["dick", "bitch", "fuck", "cunt"];

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
  paragraph.classList.add("paragraph-style");
  inputField.value = "";

  paragraph.addEventListener("click", function () {
    paragraph.className.includes("line-through")
      ? paragraph.classList.remove("line-through")
      : paragraph.classList.add("line-through");
  });

  paragraph.addEventListener("dblclick", function () {
    toDoContainer.removeChild(paragraph);
  });

  clearButton.addEventListener("click", function () {
    while (toDoContainer.firstChild) {
      toDoContainer.removeChild(toDoContainer.firstChild);
    }
  });
});

document.addEventListener("keydown", (event) => {
  event.key === "Enter" && addButton.click();
});

function throwError(message) {
  alert(message);
}
