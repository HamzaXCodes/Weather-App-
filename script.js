// Input and button
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");

// Weather display elements
const weatherCard = document.querySelector("#weatherCard");
const cityName = document.querySelector("#cityName");
const weatherIcon = document.querySelector("#weatherIcon");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");

// Weather details
const feelsLike = document.querySelector("#feelsLike");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

// Error message
const errorMessage = document.querySelector("#error");

// ..........................
// API fetching:

async function getData(searchLocation) {
  const promise = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=19c07da824054b3d897145033252310&q=${searchLocation}&aqi=yes`
  );
  return await promise.json();
}

// Display Data
async function handleSearch() {
  let searchLocation = cityInput.value;
  if (cityInput.value !== "") {
    const result = await getData(searchLocation);
    cityName.textContent = `${result.location.name},${result.location.country}`;
    weatherIcon.src = "https://cdn.weatherapi.com/weather/64x64/night/116.png";
    temperature.textContent = `${result.current.temp_c} °C or ${result.current.temp_f} °F`;
    feelsLike.textContent = `${result.current.feelslike_c} °C or ${result.current.feelslike_f} °F`;
    humidity.textContent = result.current.humidity;
    description.textContent = result.location.region;
    wind.textContent = result.current.wind_kph;
    cityInput.value = "";
  }
}

searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    handleSearch();
  }
});
