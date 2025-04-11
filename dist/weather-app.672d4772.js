const apiKey = process.env.API_KEY;
async function fetchWeather() {
    let city = "seoul";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    const response = await fetch(url);
    const data = await response.json();
    displayCurrentWeather(data);
    console.log(data);
}
//placeholder function to display data on site for testing
function displayCurrentWeather(data) {
    const newImageElement = document.createElement('img');
    newImageElement.src = ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const weather = document.getElementById("weather");
    const weatherTemp = document.getElementById("weather-temp");
    const weatherHumidity = document.getElementById("weather-humidity");
    const weatherDescription = document.getElementById("weather-description");
    //clearing pervious contents
    weather.innerHTML = '';
    weatherTemp.innerHTML = '';
    weatherHumidity.innerHTML = '';
    weatherDescription.innerHTML = '';
    weather.appendChild(newImageElement);
    weatherTemp.textContent = `${data.main.temp}\u00B0F`;
    weatherHumidity.textContent = `${data.main.humidity}% Humidity`;
    weatherDescription.textContent = `${data.weather[0].description}`;
}
fetchWeather();

//# sourceMappingURL=weather-app.672d4772.js.map
