// Async function that makes API request
const fetchWeather = async function() {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=Hazlet,%20NJ,%20US&units=imperial&APPID=7c6798fe35f78605f76d08c63b03e3c6';
    
    try {
        const todayResponse = await fetch(url, {mode: 'cors'})
        const todayJson = await todayResponse.json();
        console.log(todayJson);
        const todayWeather = new todayWeatherConst(todayJson);
        console.log(todayWeather);
    } catch {
        console.log('error!');
    };
};
// Creates today's weather forecast object with only necessary attributes
const todayWeatherConst = function(object) {
    this.weather_summ = object.weather[0].main;
    this.weather_descrip = object.weather[0].description;
    this.weather_icon = object.weather[0].description;
    // Contains temp, feels_like, temp_min, temp_max, pressure, & humidity
    this.main = object.main;
    this.visibility = object.visibility;
    // Contains speed & deg
    this.wind = object.wind;
    this.city = object.name;
    this.country = object.sys.country;
};

fetchWeather();