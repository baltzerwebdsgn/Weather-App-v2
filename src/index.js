// Buttons
let tempFButton = document.querySelector("#fahrenheit-button");
let tempCButton = document.querySelector("#celsius-button");

function changeUnitDegree(unit) {
  let tempUnit = document.querySelector("#current-temp-unit");
  let rfUnit = document.querySelector("#current-rf-unit");
  if (unit === "C") {
    tempUnit.innerHTML = unit;
    rfUnit.innerHTML = unit;
  } else {
    tempUnit.innerHTML = unit;
    rfUnit.innerHTML = unit;
  }
}

function updateCelsiusButton(event) {
  event.preventDefault();
  tempCButton.classList.add("active");
  tempFButton.classList.remove("active");
  changeUnitDegree("C");
}

function updateFahrenheitButton(event) {
  event.preventDefault();
  tempCButton.classList.remove("active");
  tempFButton.classList.add("active");
  changeUnitDegree("F");
}

tempFButton.addEventListener("click", updateFahrenheitButton);
tempCButton.addEventListener("click", updateCelsiusButton);
