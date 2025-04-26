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

    //Geocoding - getting lat and lon 
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    const responseGeo = await fetch(geoUrl);
    const geoData = await responseGeo.json();
    //lat and lon of the city 
    const lat = geoData[0].lat;
    const lon = geoData[0].lon;
    

    // the urls
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${apiKey}&units=imperial`;
    const hourlyUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&cnt=6&appid=${apiKey}`

    //getting data from the current weather api
    const response = await fetch(url);
    const data = await response.json();

    // forecast weather api
    const responseForecast = await fetch(forecastUrl);
    const forecastData = await responseForecast.json();
    
    //hourly forecast api
    const responseHourly = await fetch(hourlyUrl);
    const hourlyData = await responseHourly.json();

    
    


    displayCurrentWeather(data);
    displayHourlyWeather(hourlyData.list)
    displayForecastWeather(forecastData.list);


    
}

function displayCurrentWeather(data) {
    //console.log(data)
    const newImageElement = document.createElement('img');
    newImageElement.src = ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const weather = document.getElementById("weather");
    const weatherCity = document.getElementById("weather-city");
    const weatherTemp = document.getElementById("weather-temp");
    const weatherHumidity = document.getElementById("weather-humidity");
    const weatherDescription = document.getElementById("weather-description");

    // //clearing previous contents
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
    for (let i = 0; i < data.length; i++) {
        //adding the forecast weather icons
        const newImageElement = document.createElement('img');
        newImageElement.src = ` https://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png`;
    
        const forecastWeather = document.getElementById(`forecastweathericon-${i}`);
        const forecastWeatherDate = document.getElementById(`forecastweather-date-${i}`);
        const forecastWeatherMax = document.getElementById(`forecastweather-max-${i}`);
        const forecastWeatherMin = document.getElementById(`forecastweather-min-${i}`);

        forecastWeather.appendChild(newImageElement);
        forecastWeatherDate.textContent = `${new Date(data[i].dt * 1000).toLocaleDateString()}`;
        forecastWeatherMax.textContent = `Max: ${data[i].temp.max}\u00B0F`;
        forecastWeatherMin.textContent = `Min: ${data[i].temp.min}\u00B0F`;
    }
}

function displayHourlyWeather(data) {
    for (let i = 0; i < data.length; i++) {
        //adding the forecast weather icons
        const newImageElement = document.createElement('img');
        newImageElement.src = ` https://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png`;
    
        const hourlyWeather = document.getElementById(`hourlyforecasticon-${i}`);
        const hourlyWeatherTemp = document.getElementById(`hourlyforecast-temp-${i}`);
        const hourlyWeatherDescription = document.getElementById(`hourlyforecast-description-${i}`);
        const hourlyWeatherTime = document.getElementById(`hourlyforecast-time-${i}`);

        
        hourlyWeather.appendChild(newImageElement);
        hourlyWeatherTemp.textContent = `${data[i].main.temp}\u00B0F`;
        hourlyWeatherDescription.textContent = `${data[i].weather[0].description}`;
        hourlyWeatherTime.textContent = `${new Date(data[i].dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        
    }
    
}

fetchWeather();