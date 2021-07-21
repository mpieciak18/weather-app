const fetchWeather = async function() {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=Hazlet,%20NJ,%20US&APPID=7c6798fe35f78605f76d08c63b03e3c6';
    
    try {
        const response = await fetch(url, {mode: 'cors'})
        const modResponse = await response.json();
        console.log(modResponse);
    } catch {
        console.log('error!');
    };
}

fetchWeather();