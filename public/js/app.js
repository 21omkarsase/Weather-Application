const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherInfo = document.querySelector(".weatherInfo");
const weatherOtherInfo = document.querySelector(".weatherOtherInfo");
const locationAddress = document.querySelector(".location");
const loading = document.querySelector(".loading");
const inputText = document.querySelector(".inputText");

weatherForm.addEventListener("submit", (e) => {
  weatherInfo.style.display = "none";
  loading.style.display = "block";
  weatherInfo.style.display = "none";
  weatherOtherInfo.style.display = "none";
  locationAddress.style.display = "none";
  e.preventDefault();
  const location = search.value;
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((weatherResult) => {
      loading.style.display = "none";
      weatherInfo.style.display = "block";
      if (weatherResult.err) {
        weatherInfo.innerText = weatherResult.err;
      } else {
        if (weatherResult.error) {
          weatherInfo.innerText = weatherResult.error;
        } else {
          weatherOtherInfo.style.display = "block";
          locationAddress.style.display = "block";
          const address = weatherResult.address;
          const weather = weatherResult.weather;
          locationAddress.innerText = `${address}`;
          weatherInfo.innerText = `${weather.weather_descriptions[0]}. It is currently ${weather.temperature} degrees out but it feels like ${weather.feelslike} degrees out.`;
          weatherOtherInfo.innerText = `\nOther Information :\n
          Humidity : ${weather.humidity} %\nWind Speed : ${weather.wind_speed} Km/h\nWind Direction : ${weather.wind_dir}\nIs day : ${weather.is_day}\nPressure : ${weather.pressure} hPa\nVisibility : ${weather.visibility} Km\nUV Index : ${weather.uv_index}\nPrecipitation : ${weather.precip}`;
        }
      }
      inputText.value = "";
    });
  });
});
