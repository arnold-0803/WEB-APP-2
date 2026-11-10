async function getWeatherData (location) {
  try{
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&contentType=json`);

    if(!response.ok) {
      throw new Error("Weather request failed");
    }

    const weatherData =  await response.json();

    const processeData = processWeatherData(weatherData);

    displayWeatherData(processeData);

  }catch(error) {
    console.error(error);
  };
}

// getWeatherData("Nairobi", "Kenya");

function processWeatherData(data) {
  return{
    location: data.resolvedAddress,
    temperature: data.currentConditions.temp,
    feelsLikeTemperature: data.currentConditions.feelslike,
    weatherCondition: data.currentConditions.conditions,
    humidity: data.currentConditions.humidity,
    windSpeed: data.currentConditions.windspeed,
    maximumTemperature: data.days[0].tempmax,
    minimumTemperature: data.days[0].tempmin
  };
}

const form = document.querySelector("#weather-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const locationInput = document.querySelector("#location");

  const location = locationInput.value.trim();

  getWeatherData(location);
  
});

function displayWeatherData(data) {
  // const weatherDisplay = document.querySelector("#weather-display");
  const cityElement = document.querySelector("#city");
  const temperatureElement = document.querySelector("#temperature");
  const conditionElement = document.querySelector("#condition");
  const feelsLikeElement = document.querySelector("#feels-like");
  const humidityElement = document.querySelector("#humidity");
  const windSpeedElement = document.querySelector("#wind-speed");
  const highLowTemperatureElement = document.querySelector("#high-low");

  cityElement.textContent = data.location;
  temperatureElement.textContent = `${data.temperature}℃`;
  conditionElement.textContent = data.weatherCondition;
  feelsLikeElement.textContent = `${data.feelsLikeTemperature}℃`;
  humidityElement.textContent = `${data.humidity}%`;
  windSpeedElement.textContent = `${data.windSpeed} km/h`;
  highLowTemperatureElement.textContent = `High: ${data.maximumTemperature}°C | Low: ${data.minimumTemperature}°C`;
};

function convertToFahrenheit(celsius) {
  return (celsius*9/5) + 32;
}

console.log(convertToFahrenheit(21));