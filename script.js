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
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${apiKey}&units=imperial`;

    //getting dta from the current weather api
    const response = await fetch(url);
    const data = await response.json();
    // forecast weather api 
    const responseForecast = await fetch(forecastUrl);
    const forecastData = await responseForecast.json();

    displayCurrentWeather(data);
    console.log(data); //console logging data
    displayForecastWeather(forecastData.list);
    //console.log(forecastData.list) //console logging forecast data
    
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
    //clearing previous weather icons 
    // for (let i = 1; i < 6; i++) {
    //     const forecastWeather = document.getElementById(`forecastweather-${i}`);
    //     forecastWeather.innerHTML = '';
    // }
    // const forecastWeather = document.getElementById("forecastweather");
    // forecastWeather.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        
        //adding the forecast weather icons
        const newImageElement = document.createElement('img');
        newImageElement.src = ` https://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png`;
        //assigning class to each image elements
        const forecastWeather = document.getElementById(`forecastweather-${i}`);
        // newImageElement.setAttribute('class', `forecastweather${i}`);
        const forecastWeatherMax = document.getElementById(`forecastweather-max-${i+1}`);
        const forecastWeatherMin = document.getElementById(`forecastweather-min-${i+1}`);
        
        forecastWeather.appendChild(newImageElement);
        forecastWeatherMax.textContent = `Max: ${data[i+1].temp.max}\u00B0F`;
        forecastWeatherMin.textContent = `Min: ${data[i+1].temp.min}\u00B0F`;
        
    }   
    
    
    
}

fetchWeather();