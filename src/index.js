// Universal Functions

// Selects the text to be changed
function updateText(newText, destination) {
  let text = document.querySelector(destination);
  text.innerHTML = newText;
}

// Function to convert Fahrenheit to Celcius
function convertFtoC(x) {
  return Math.ceil((x - 32) * (5 / 9));
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

// Unit Bar Buttons
let tempFButton = document.querySelector("#fahrenheit-button");
let tempCButton = document.querySelector("#celsius-button");

function changeUnitDegree(unit) {
  let tempUnit = document.querySelector("#current-temp-unit");
  let rfUnit = document.querySelector("#current-rf-unit");
  let tempCurrent = document.querySelector("#current-temp-num");
  let tempCurrentRF = document.querySelector("#current-rf-num");
  let tempC = convertFtoC(tempF);
  let tempCRF = convertFtoC(tempRF);

  if (unit === "C") {
    tempUnit.innerHTML = unit;
    rfUnit.innerHTML = unit;
    tempCurrent.innerHTML = tempC;
    tempCurrentRF.innerHTML = tempCRF;
  } else {
    tempUnit.innerHTML = unit;
    rfUnit.innerHTML = unit;
    tempCurrent.innerHTML = tempF;
    tempCurrentRF.innerHTML = tempRF;
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

//Current Location Functionality

// Updates Page Values
function getCurrentData(response) {
  let temp = Math.round(response.data.main.temp);
  let forecast = response.data.weather[0].description;
  let feels_like = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;

  tempF = temp;
  tempRF = feels_like;

  updateText(temp, "#current-temp-num");
  updateText(forecast, "#current-description");
  updateText(feels_like, "#current-rf-num");
  updateText(humidity, "#current-hum-num");
}

function getCityHeading(response) {
  let city = response.data[0].name;
  let state = response.data[0].state;
  let country = response.data[0].country;

  if (state !== undefined) {
    updateText(`${city}, ${state}`, "#currrent-location");
  } else {
    updateText(`${city}, ${country}`, "#currrent-location");
  }
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "b8f1228856ca04cc31b22654a95bc412";
  let units = "imperial";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiURL = `${apiEndPoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(getCurrentData);

  let limit = 1;
  let apiEndPointGeoCoding = "https://api.openweathermap.org/geo/1.0/reverse?";
  let apiURLGC = `${apiEndPointGeoCoding}lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`;

  axios.get(apiURLGC).then(getCityHeading);
}

function searchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentButton = document.querySelector("#current-weather-button");
currentButton.addEventListener("click", searchCurrentLocation);

// Upon page load
searchCurrentLocation();
let now = new Date();
updateCurrentDateTime(now);
let tempF = null;
let tempRF = null;
