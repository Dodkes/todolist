let toDoButton = document.getElementById("addItem");
let toDoContainer = document.getElementById("toDoContainer");
let inField = document.getElementById("input-field");

toDoButton.addEventListener("click", function () {
  var paragraph = document.createElement("li");
  var inputValue = document.getElementById("input-field").value;
  if (
    inputValue !== "" &&
    inputValue !== "dick" &&
    inputValue !== "fuck" &&
    inputValue !== "bitch"
  ) {
    toDoContainer.appendChild(paragraph);
    paragraph.innerText = inputValue;
    paragraph.classList.add("paragraph-style");
    inField.value = "";
  } else if (
    inputValue == "dick" ||
    inputValue == "fuck" ||
    inputValue == "bitch"
  ) {
    alert("Cooldown you" + " " + inputValue + " :)");
  } else {
    alert("Please enter a value");
  }

  var clicked = 0;
  paragraph.addEventListener("click", function () {
    if (clicked == 0) {
      paragraph.style.textDecoration = "line-through";
      paragraph.style.textDecorationColor = "red";
      paragraph.style.textDecorationThickness = "15%";

      clicked = 1;
    } else {
      paragraph.style.textDecoration = "none";
      clicked = 0;
    }
  });
  paragraph.addEventListener("dblclick", function () {
    toDoContainer.removeChild(paragraph);
  });

  let clearButton = document.getElementById("clear");

  clearButton.addEventListener("click", function () {
    while (toDoContainer.firstChild) {
      toDoContainer.removeChild(toDoContainer.firstChild);
    }
  });
});

document.addEventListener("keydown", (event) => {
  event.key === "Enter" && toDoButton.click();
});
