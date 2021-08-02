const appId = '7c6798fe35f78605f76d08c63b03e3c6';

// Async function that fetches current weather from OpenWeather's API
const fetchWeather = async function() {
    // Set default parameters
    let lat = '';
    let lon = '';
    let exclusion = 'minutely,hourly,daily,alerts';
    let units = 'imperial';
    try {
        const prelimWeatherData = await fetchCoords();
        console.log(prelimWeatherData);
        lat = prelimWeatherData.lat;
        lon = prelimWeatherData.lon;
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclusion}&units=${units}&appid=${appId}`;
        const todayResponse = await fetch(url, {mode: 'cors'})
        const todayJson = await todayResponse.json();
        const todayWeather = new todayWeatherConst(todayJson.current);
        renderWeather(todayWeather, prelimWeatherData);
    } catch {
        console.log('error!');
    };
};
// Async function that is called by fetchWeather function to fetch location coordinates
const fetchCoords = async function() {
    // Set location to Hazlet, NJ by default
    let location = 'Hazlet,%20NJ,%20US'
    try {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${appId}`;
        const response = await fetch(url, {mode: 'cors'})
        const responseJson = await response.json();
        const prelimWeatherData = {
            lat: responseJson.coord.lat,
            lon: responseJson.coord.lon,
            city: responseJson.name,
            country: responseJson.sys.country
        };
        console.log(prelimWeatherData);
        return prelimWeatherData
    } catch {
        console.log('error!');
    };
}
// Constructs today's weather forecast object with only necessary attributes
const todayWeatherConst = function(object) {
    // Summarical attributes
    this.summary = object.weather[0].main;
    this.description = object.weather[0].description;
    this.icon = object.weather[0].icon;
    // All other attributes
    this.sunrise = object.sunrise;
    this.sunset = object.sunset;
    this.temp = object.temp;
    this.feels_like = object.feels_like;
    this.pressure = object.pressure;
    this.humidity = object.humidity;
    this.dew_point = object.dew_point;
    this.uvi = object.uvi;
    this.clouds = object.clouds;
    this.visibility = object.visibility;
    this.wind_speed = object.wind_speed;
    this.wind_deg = object.wind_deg;
};

// Renders weather attributes from object to DOM
const renderWeather = function(weather, prelimWeather) {
    const summary = document.getElementById('summary');
    const location = document.getElementById('location');
    const lat = document.getElementById('lat');
    const lon = document.getElementById('lon');
    const temp = document.getElementById('temp');
    const feelsLike = document.getElementById('feels-like');
    const wind = document.getElementById('wind');
    const humidity = document.getElementById('humidity');

    summary.innerText = weather.summary;
    location.innerText = `${prelimWeather.city.toUpperCase()}, ${prelimWeather.country.toUpperCase()}`;
    lat.innerText = `lat: ${prelimWeather.lat}`;
    lon.innerText = `lon: ${prelimWeather.lon}`;
    temp.innerText = Math.round(weather.temp);
    feelsLike.innerText = `Feels Like: ${Math.round(weather.feels_like)}°F`;
    wind.innerText = `Wind: ${Math.round(weather.wind_speed)} MPH`;
    humidity.innerText = `Humidity: ${weather.humidity}%`;
};

fetchWeather();