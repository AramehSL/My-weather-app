/////// Date / Time Info /////////////

let date = new Date();

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

let hours = date.getHours();
let ampm = hours >= 12 ? "pm" : "am";
hours = hours % 12;
hours = hours < 10 ? "0" + hours : hours;
hours = hours ? hours : 12;

let minutes = date.getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;

let dayOfMonth = date.getDate();
let month = months[date.getMonth()];

let year = date.getFullYear();

let today = days[date.getDay()];

let dayName = document.querySelector(".day-name");
dayName.innerHTML = `${today}`;

let time = document.querySelector(".time");
time.innerHTML = `${hours}:${minutes} ${ampm}`;

let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${dayOfMonth} ${month} ${year}`;

function formatDay(timestemp) {
  let date = new Date(timestemp * 1000);
  let day = date.getDay();
  return days[day].substring(0, 3);
}

//////       Search Button  /////////////////////////

function searchCity(city) {
  let apiKey = "88ce603b3361b10f232b41d49c2e52e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentTempreture);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

let formSearchBtn = document.querySelector("#city-input");
formSearchBtn.addEventListener("click", search);

//////       Forecast       /////////////////////////////

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  for (let index = 1; index < forecast.length; index++) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        ` 
              <div class="col-2 col-2-edit">
                <div class="weather-forecast-days">
                  ${formatDay(forecast[index].dt)}
                </div>
                <img src="http://openweathermap.org/img/wn/${
                  forecast[index].weather[0].icon
                }@2x.png" alt="sunny" class="days-img" />
                <div class="weather-forecast-temps">
                  <span class="weather-forecast-temps-max ">
                    ${Math.round(forecast[index].temp.max)}°
                  </span>
                  |
                  <span class="weather-forecast-temps-min ">
                    ${Math.round(forecast[index].temp.min)}°
                  </span>
                </div>
                </div>
           `;
    }
  }

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//////        Coords Function /////////////////////////////

function getForecast(coordinates) {
  let apiKey = "88ce603b3361b10f232b41d49c2e52e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//////        Location Button /////////////////////////////

function showCurrentTempreture(response) {
  document.querySelector(".city-name").innerHTML = response.data.name;
  celsuisTemp = response.data.main.temp;

  document.querySelector(".degree").innerHTML = Math.round(celsuisTemp);
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
  document.querySelector(".pressure").innerHTML = response.data.main.pressure;
  document.querySelector(".current-weather-status").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function getPosition(position) {
  let apiKey = "88ce603b3361b10f232b41d49c2e52e3";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentTempreture);
}
function showCurrentCityInfo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let formLocationBtn = document.querySelector("#current-location");
formLocationBtn.addEventListener("click", showCurrentCityInfo);

let celsuisTemp = null;

function showCelsiusDeg(event) {
  event.preventDefault();
  document.querySelector("#deg-celsius").classList.add("active");
  document.querySelector("#deg-fahrenheit").classList.remove("active");
  let currentDeg = document.querySelector(".degree");
  currentDeg.innerHTML = Math.round(celsuisTemp);
}

let celsuisDeg = document.querySelector("#deg-celsius");
celsuisDeg.addEventListener("click", showCelsiusDeg);

function showFahrenheitDeg(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsuisTemp * 9) / 5 + 32);
  let currentDeg = document.querySelector(".degree");
  document.querySelector("#deg-celsius").classList.remove("active");
  document.querySelector("#deg-fahrenheit").classList.add("active");
  currentDeg.innerHTML = fahrenheitTemp;
}

let fahrenheitDeg = document.querySelector("#deg-fahrenheit");
fahrenheitDeg.addEventListener("click", showFahrenheitDeg);

searchCity("Montreal");
displayForecast();
