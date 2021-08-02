const appId = '7c6798fe35f78605f76d08c63b03e3c6';

// Async function that fetches current weather from OpenWeather's API
const fetchWeather = async function() {
    // Set default parameters
    let lat = '';
    let lon = '';
    let exclusion = 'minutely,daily,alerts';
    let units = 'imperial';
    try {
        const coords = await fetchCoords();
        lat = coords.lat;
        lon = coords.lon;
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclusion}&units=${units}&appid=${appId}`;
        const todayResponse = await fetch(url, {mode: 'cors'})
        const todayJson = await todayResponse.json();
        console.log(todayJson);
        const todayWeather = new todayWeatherConst(todayJson.current);
        const hourlyWeather = null;
        console.log(todayWeather);
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
        return responseJson.coord
    } catch {
        console.log('error!');
    };
}
// Constructs today's weather forecast object with only necessary attributes
const todayWeatherConst = function(object) {
    // Summarical attributes
    this.weather_summ = object.weather[0].main;
    this.weather_descrip = object.weather[0].description;
    this.weather_icon = object.weather[0].icon;
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
// Constructs hourly weather forecast object with only necessary attributes
const hourlyWeatherConst = function(object) {

}

fetchWeather();