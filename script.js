require('dotenv').config();

async function fetchWeather() {
    const apiKey = process.env.API_KEY;
    let city = 'Seoul';
    //added even listener to the button
    document.querySelector('button').addEventListener('click', fetchWeather);

    // if there is an input from the user
    const input = document.getElementById("city");
    const inputCity = input.value;

    if (inputCity) {
        city = inputCity;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${apiKey}`;

    //getting dta from the current weather api
    const response = await fetch(url);
    const data = await response.json();
    // forecast weather api 
    const responseForecast = await fetch(forecastUrl);
    const forecastData = await responseForecast.json();

    displayCurrentWeather(data);
    //console.log(data); //console logging data
    displayForecastWeather(forecastData.list);
    console.log(forecastData.list) //console logging forecast data
    
}

function displayCurrentWeather(data) {
    const newImageElement = document.createElement('img');
    newImageElement.src = ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const weather = document.getElementById("weather");
    const weatherCity = document.getElementById("weather-city");
    const weatherTemp = document.getElementById("weather-temp");
    const weatherHumidity = document.getElementById("weather-humidity");
    const weatherDescription = document.getElementById("weather-description");

    //clearing previous contents
    weather.innerHTML = '';
    weatherCity.innerHTML = '';
    weatherTemp.innerHTML = '';
    weatherHumidity.innerHTML = '';
    weatherDescription.innerHTML = '';

    weather.appendChild(newImageElement);
    weatherCity.textContent = `${data.name}`;
    weatherTemp.textContent = `${data.main.temp}\u00B0F`;
    weatherHumidity.textContent = `${data.main.humidity}% Humidity`;
    weatherDescription.textContent = `${data.weather[0].description}`;

}

function displayForecastWeather(data) {
    //need to clear the previous contents
    for (let i = 1; i < data.length; i++) {
        console.log(data[i]);
        
        const newImageElement = document.createElement('img');
        newImageElement.src = ` https://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png`;

        const forecastWeather = document.getElementById("forecastweather");
        newImageElement.setAttribute('class', `forecastweather${i}`);
    
        forecastWeather.appendChild(newImageElement); 
    }
    
}

fetchWeather();