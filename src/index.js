// Universal Functions

// Selects the text to be changed
function updateText(newText, destination) {
  let text = document.querySelector(destination);
  text.innerHTML = newText;
}
//Reformats hour to be 12hour clock
function correctHour(hour) {
  if (hour > 12) {
    return hour - 12;
  } else if (hour === 0) {
    return 12;
  } else {
    return hour;
  }
}
// Reformats 1-9 minutes to display correctly
function correctMinutes(minutes) {
  if (minutes < 10) {
    return "0" + minutes;
  } else {
    return minutes;
  }
}

//Formats the dates on the page
function formatDate(now, section) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let meridiem = "AM";

  //Updates meridem depending on hour
  if (hour >= 12) {
    meridiem = "PM";
  }

  let newHour = correctHour(hour);
  let newMinutes = correctMinutes(minutes);

  //Formats current date
  if (section === "main") {
    return `${day}, ${month} ${date} ${newHour}:${newMinutes} ${meridiem}`;
  }
}

//Change current page Date and Time
function updateCurrentDateTime(date) {
  updateText(formatDate(date, "main"), "#current-date");
}

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

// Upon page load
let now = new Date();
updateCurrentDateTime(now);
