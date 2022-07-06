// Buttons
let tempFButton = document.querySelector("#fahrenheit-button");
let tempCButton = document.querySelector("#celsius-button");

function updateCelsiusButton(event) {
  event.preventDefault();
  tempCButton.classList.add("active");
  tempFButton.classList.remove("active");
}

function updateFahrenheitButton(event) {
  event.preventDefault();
  tempCButton.classList.remove("active");
  tempFButton.classList.add("active");
}

tempFButton.addEventListener("click", updateFahrenheitButton);
tempCButton.addEventListener("click", updateCelsiusButton);
