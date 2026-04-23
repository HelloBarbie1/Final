const weatherContainer = document.getElementById("weather-container");

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.006&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,uv_index_max,precipitation_sum&current=temperature_2m&timezone=America%2FNew_York&past_days=0&forecast_days=7&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch";

fetch(apiUrl)

 .then(response => response.json())

 .then(data => {

  const dates = data.daily.time;

  const maxTemps = data.daily.temperature_2m_max;

  const minTemps = data.daily.temperature_2m_min;
    const maxWind = data.daily.wind_speed_10m_max;
    const maxUV = data.daily.uv_index_max;
     const precipSums = data.daily.precipitation_sum;
    const currentTemp = data.current.temperature_2m;


  for (let i = 0; i < 7; i++) {

   const card = document.createElement("div");

   card.classList.add("card");




   const date = document.createElement("h2");

 date.textContent = new Date(dates[i] + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
});


   const maxTemp = document.createElement("p");

   maxTemp.textContent = "High: " + maxTemps[i] + "°F";



   const minTemp = document.createElement("p");

   minTemp.textContent = "Low: " + minTemps[i] + "°F";
const currentTempEl = document.createElement("p");
currentTempEl.textContent = "Current: " + currentTemp + "°F";
const maxWind = document.createElement("p");
   maxWind.textContent = "Max Wind: " + data.daily.wind_speed_10m_max[i] + " mph";

    const maxUV = document.createElement("p");
    maxUV.textContent = "Max UV Index: " + data.daily.uv_index_max[i];
        const precipSum = document.createElement("p");
    precipSum.textContent = "Precipitation: " + data.daily.precipitation_sum[i] + " inches";
    
   card.appendChild(date);

   card.appendChild(maxTemp);

   card.appendChild(minTemp);
card.appendChild(currentTempEl);
card.appendChild(maxWind);
    card.appendChild(maxUV);
card.appendChild(precipSum);
   weatherContainer.appendChild(card);


  }

 })

 .catch(error => {

  weatherContainer.innerHTML = "<p>Sorry, weather data could not be loaded.</p>";

  console.error("Error fetching weather data:", error);

 });