require('dotenv').config();
console.log(process.env.API_KEY);

async function fetchWeather() {
    const apiKey = process.env.API_KEY;
    const city = 'Seoul';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    
    //getting dta from the API
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }


}

function displayCurrentWeather(data) {
    const newImageElement = document.createElement('img');
    newImageElement.src = ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const weather = document.getElementById("weather");
    const weatherTemp = document.getElementById("weather-temp");
    const weatherHumidity = document.getElementById("weather-humidity");
    const weatherDescription = document.getElementById("weather-description");

    //clearing previous contents
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

