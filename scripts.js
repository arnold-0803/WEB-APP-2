async function getWeatherData (location) {
  try{
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&contentType=json`);

    if(!response.ok) {
      throw new Error("Weather request failed");
    }

    const weatherData =  await response.json();

    const processeData = processWeatherData(weatherData);

    console.log(processeData);

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
