const weatherContainer = document.getElementById("weather-container");

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.006&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max,wind_direction_10m_dominant,precipitation_sum&timezone=America%2FNew_York&forecast_days=7&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch";
fetch(apiUrl)

 .then(response => response.json())

 .then(data => {

  const dates = data.daily.time;

  const maxTemps = data.daily.temperature_2m_max;

  const minTemps = data.daily.temperature_2m_min;

    const maxUV = data.daily.uv_index_max;
     const precipSums = data.daily.precipitation_sum;

      const weatherCodes = data.daily.weather_code;
const maxWinds = data.daily.wind_speed_10m_max;
const windDirections = data.daily.wind_direction_10m_dominant;


  for (let i = 0; i < 7; i++) {

   const card = document.createElement("div");

   card.classList.add("card");

/*wind direction logic*/
   const direction = windDirections[i];
let directionText = "N"; 
if (direction >= 22.5 && direction < 67.5) {
  directionText = "NE";
} else if (direction >= 67.5 && direction < 112.5) {
  directionText = "E";
} else if (direction >= 112.5 && direction < 157.5) {
  directionText = "SE";
} else if (direction >= 157.5 && direction < 202.5) {
  directionText = "S";
} else if (direction >= 202.5 && direction < 247.5) {
  directionText = "SW";
} else if (direction >= 247.5 && direction < 292.5) {
  directionText = "W";
} else if (direction >= 292.5 && direction < 337.5) {
  directionText = "NW";
}

const windDirection = document.createElement("p");
windDirection.textContent = "Wind Direction: " + directionText;




/*conditions logic*/
const weatherCode = weatherCodes[i];
let imageFile = "sunny.jpg";

if (weatherCode >= 0 && weatherCode <= 1) {
    imageFile = "sunny.jpg";
} else if (weatherCode >= 2 && weatherCode <= 3) {
    imageFile = "clouds.jpg";
} else if (weatherCode >= 40 && weatherCode <= 49) {
    imageFile = "fog.jpg";
} else if (weatherCode >= 50 && weatherCode <= 69) {
    imageFile = "rain.jpg";
} else if (weatherCode >= 70 && weatherCode <= 79) {
    imageFile = "snow.jpg";
}

/*wind speed logic*/

let windImageFile = "Assets/wind-light.png";

if (maxWinds[i] < 5) {
  windImageFile = "Assets/wind-calm.png";
} else if (maxWinds[i] < 10) {
  windImageFile = "Assets/wind-light.png";
} else if (maxWinds[i] < 20) {
 windImageFile = "Assets/wind-moderate.png";
} else {
  windImageFile = "Assets/wind-strong.png";
}

const windIcon = document.createElement("img");
windIcon.src = windImageFile;
windIcon.alt = "Wind strength icon";
windIcon.classList.add("wind-icon");


const weatherImage = document.createElement("img");
weatherImage.src = "Assets/" + imageFile;
weatherImage.alt = "Weather strength icon";
weatherImage.classList.add("weather-icon");



   const date = document.createElement("h2");

 date.textContent = new Date(dates[i] + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
});


   const maxTemp = document.createElement("p");

   maxTemp.textContent = "High: " + maxTemps[i] + "&deg;F";



   const minTemp = document.createElement("p");

   minTemp.textContent = "Low: " + minTemps[i] + "&deg;F";



    const maxUV = document.createElement("p");
    maxUV.textContent = "Max UV Index: " + data.daily.uv_index_max[i];
        const precipSum = document.createElement("p");
    precipSum.textContent = "Precipitation: " + data.daily.precipitation_sum[i] + " inches";
    const maxWind = document.createElement("p");
   maxWind.textContent = "Max Wind: " + data.daily.wind_speed_10m_max[i] + " mph";
    
   card.appendChild(date);
card.appendChild(weatherImage);
   card.appendChild(maxTemp);

   card.appendChild(minTemp);

    card.appendChild(maxUV);
card.appendChild(precipSum);
  card.appendChild(windIcon);
  card.appendChild(maxWind);
  card.appendChild(windDirection);
weatherContainer.appendChild(card);

  }

 })

 .catch(error => {

  weatherContainer.innerHTML = "<p>Sorry, weather data could not be loaded.</p>";

  console.error("Error fetching weather data:", error);

 });