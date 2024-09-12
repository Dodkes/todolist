let toDoButton = document.getElementById("addItem"); //gets button
let toDoContainer = document.getElementById("toDoContainer"); //gets container
let inField = document.getElementById("input-field"); //gets input element

toDoButton.addEventListener("click", function () {
  //used variable for click event
  var paragraph = document.createElement("li"); //create element <li>
  var inputValue = document.getElementById("input-field").value; //gets the input value
  if (
    inputValue !== "" &&
    inputValue !== "dick" &&
    inputValue !== "fuck" &&
    inputValue !== "bitch"
  ) {
    toDoContainer.appendChild(paragraph); //adds child paragraph to toDoContainer
    paragraph.innerText = inputValue; //adds inputValue to <li>
    paragraph.classList.add("paragraph-style"); //add styling for <p> from css ext document
    inField.value = ""; //resets input field after click
  } else if (
    inputValue == "dick" ||
    inputValue == "fuck" ||
    inputValue == "bitch"
  ) {
    //if forbidden words
    alert("Cooldown you" + " " + inputValue + " :)");
  } else {
    //if no value entered
    alert("Please enter a value");
  }

  //onclick <li> line through and restore on next click
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
    toDoContainer.removeChild(paragraph); // from container delete <li> on double click
  });

  //CLEAR BUTTON
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
