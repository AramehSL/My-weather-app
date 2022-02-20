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

////// Search Button  /////////////////////////

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

////// Location Button /////////////////////////////

function showCurrentTempreture(response) {
  document.querySelector(".city-name").innerHTML = response.data.name;
  let tempreture = Math.round(response.data.main.temp);
  document.querySelector(".degree").innerHTML = tempreture;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
  document.querySelector(".pressure").innerHTML = response.data.main.pressure;
  document.querySelector(".current-weather-status").innerHTML =
    response.data.weather[0].description;
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

searchCity("Montreal");
