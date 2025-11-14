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

// =========================
// API Fetch (FIXED HTTPS)
// =========================
async function getData(searchLocation) {
  try {
    const promise = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=19c07da824054b3d897145033252310&q=${searchLocation}&aqi=yes`
    );

    if (!promise.ok) throw new Error("City not found");

    return await promise.json();
  } catch (err) {
    return null; // Return null so we can handle it
  }
}

// =========================
// Display Data
// =========================
async function handleSearch() {
  let searchLocation = cityInput.value.trim();

  if (searchLocation === "") return;

  const result = await getData(searchLocation);

  if (!result) {
    weatherCard.hidden = true;
    errorMessage.hidden = false;
    return;
  }

  errorMessage.hidden = true;
  weatherCard.hidden = false;

  cityName.textContent = `${result.location.name}, ${result.location.country}`;
  weatherIcon.src = "https:" + result.current.condition.icon;  // FIXED
  temperature.textContent = `${result.current.temp_c} °C / ${result.current.temp_f} °F`;
  feelsLike.textContent = `${result.current.feelslike_c} °C`;
  humidity.textContent = result.current.humidity;
  description.textContent = result.current.condition.text;  // FIXED
  wind.textContent = result.current.wind_kph;

  cityInput.value = "";
}

// Search button click
searchBtn.addEventListener("click", handleSearch);

// Enter key support
cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    handleSearch();
  }
});
