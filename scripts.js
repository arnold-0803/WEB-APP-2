async function getWeatherData (location) {
  try{
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&contentType=json`);

    if(!response.ok) {
      throw new Error("Weather request failed");
    }

    const weatherData =  await response.json();

    console.log(weatherData);

  }catch(error) {
    console.error(error);
  };
}

getWeatherData("Nairobi", "Kenya");

function processWeatherData(data) {
  return{
    location,
    temperature,
    feelsLikeTemperature,
    weatherCondition,
    humidity,
    windSpeed,
    maximumTemperature,
    minimumTemperature
  };
}