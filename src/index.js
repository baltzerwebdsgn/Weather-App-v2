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
let icons = {
  "01d": {
    link: "1iiwtVnRGJtksffe6-8MVmUy2pAfZOT8A",
    class: "standard",
  },
  "01n": {
    link: "1oMAxtSVw9eSgymhKTuXT2fwC-y7jV9B5",
    class: "standard",
  },
  "02d": {
    link: "1WOSx8JLV9DxDZsdcbgq9UZmyjsUk49Z5",
    class: "standard",
  },
  "02n": {
    link: "11cajI7phCcdne6fGfI-FKoSxxWL4qkr4",
    class: "standard",
  },
  "03d": {
    link: "1IqscjHu-X5_FwqpDguh6YZtX_TujavLW",
    class: "small",
  },
  "03n": {
    link: "1o-GOCuFMDG6zqUnZN9Ch5L5y6Gn2-JrK",
    class: "small",
  },
  "04d": {
    link: "1n8fdFFgKOHXPg9S07_ibcjQnBMapiQHQ",
    class: "medium",
  },
  "04n": {
    link: "1MSmXxUj5_TkInzVz7FWJQ3zBE_PugRnq",
    class: "medium",
  },
  "09d": {
    link: "1U2-HaxWPYqvPOt22e9hwmeENWOlwCa8L",
    class: "standard",
  },
  "09n": {
    link: "14tXJRlicseb8v3-sgp1xJLqs0diCAKnn",
    class: "standard",
  },
  "10d": {
    link: "1fDpfP7uWLD96dZWscD3flGyooKFp7HqU",
    class: "large",
  },
  "10n": {
    link: "1ndrFoHms0rBTiY4w4us2uRXwziddRcpo",
    class: "large",
  },
  "11d": {
    link: "1GobkR3arkRXyZDsqMdysE0yV_qce0kxf",
    class: "standard",
  },
  "11n": {
    link: "1-ynpaWnbZc6hLvewY0d8xzW8milpcwvi",
    class: "standard",
  },
  "13d": {
    link: "1cytubf2CR30bahaQ_4qXMA-irJwfmLE4",
    class: "standard",
  },
  "13n": {
    link: "12oCTliahRyLy6OcHlSmDld90QU60dvYs",
    class: "standard",
  },
  "50d": {
    link: "1Q9ZIvGezJ1byU3TPrhlwnVcUJJ0rScdt",
    class: "mist",
  },
  "50n": {
    link: "1eJNCEaHhnD0kjJ-4iaLTQbwaH2nsKrU9",
    class: "mist",
  },
};

function updateIcon(icon, forecast) {
  let weatherIcon = document.getElementById("current-weather-icon");
  let driveEndpoint = "https://drive.google.com/uc?export=view&id=";
  let mistAdjustment = document.querySelector("#image-container");

  let srcNew = driveEndpoint + icons[icon].link;
  weatherIcon.src = srcNew;
  weatherIcon.alt = forecast;
  weatherIcon.removeAttribute("class");
  weatherIcon.classList.add("image");
  weatherIcon.classList.add(icons[icon].class);
  let testCondition = mistAdjustment.classList.contains("image-container-mist");

  if (icon === "50d" || icon === "50n") {
    mistAdjustment.classList.replace(
      "image-container-standard",
      "image-container-mist"
    );
  } else if (testCondition === true) {
    mistAdjustment.classList.toggle("image-container-standard");
    mistAdjustment.classList.toggle("image-container-mist");
  }
}

//Update Main background
function updateWeatherIcon(icon, forecast) {
  let mainBackground = document.querySelector("main");
  if (
    icon === "01d" ||
    icon === "02d" ||
    icon === "03d" ||
    icon === "04d" ||
    icon === "09d" ||
    icon === "10d" ||
    icon === "11d" ||
    icon === "13d" ||
    icon === "50d"
  ) {
    mainBackground.classList.remove("night-background");
    mainBackground.classList.add("day-background");
  } else {
    mainBackground.classList.remove("day-background");
    mainBackground.classList.add("night-background");
  }
  updateIcon(icon, forecast);
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
  let icon = response.data.weather[0].icon;

  tempF = temp;
  tempRF = feels_like;

  updateText(temp, "#current-temp-num");
  updateText(forecast, "#current-description");
  updateText(feels_like, "#current-rf-num");
  updateText(humidity, "#current-hum-num");
  updateWeatherIcon(icon, forecast);
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

// Fixes casing on city name
function fixCasing(x) {
  x = x.toLowerCase();

  let words = x.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1);
  }
  words = words.join(" ");
  return words;
}

//Change current City Name
function updateCurrentCity(newCity) {
  updateText(fixCasing(newCity), "#currrent-location");
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
  let now = new Date();
  updateCurrentDateTime(now);
}

function searchCity(city) {
  let apiKey = "b8f1228856ca04cc31b22654a95bc412";
  let units = "imperial";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiURL = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;

  axios
    .get(apiURL)
    .then(getCurrentData)
    .catch(function (error) {
      alert(`We do not have weather information on ${city}.`);
    });

  updateCurrentCity(city);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input").value;
  searchInput = searchInput.trim();
  searchCity(searchInput);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentButton = document.querySelector("#current-weather-button");
currentButton.addEventListener("click", searchCurrentLocation);

// Upon page load
searchCurrentLocation();

let tempF = null;
let tempRF = null;
