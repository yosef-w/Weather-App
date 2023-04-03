const input = document.getElementById('city');
const search = document.getElementById('submit');
const card = document.querySelector('.card');

search.addEventListener('click', () => {Weather(input.value)});

search.addEventListener('keyup', (event) => {
    console.log('keyup event triggered');
    if (event.key === 'Enter') {
        event.preventDefault();
        search.click()
    }
});

async function Weather(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=` + `f6cb7d4eeb654a0aafe203236230103` + `&q=` + `${city}`)
    const image = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + `${city}` + `&appid=070cda70adba8d6a6838907d70211ee6`)
    const responseData = await response.json();
    const imageData = await image.json();
    
    if (response.status == 404 || image.status == 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.information').style.display = "none";
    } else {
        document.querySelector('.city').innerHTML = responseData.location.name;
        document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${imageData.weather[0].icon}@2x.png`;
        document.querySelector('.description').innerHTML = imageData.weather[0].description;
        document.querySelector('.temp').innerHTML = Math.round(responseData.current.temp_f) + `°`;
        document.querySelector('.high').innerHTML = Math.round((imageData.main.temp_max - 273.15) * (9 / 5) + 32) + `°F`;
        document.querySelector('.low').innerHTML = Math.round((imageData.main.temp_min - 273.15) * (9 / 5) + 32) + `°F`;
        document.querySelector('.feels-like').innerHTML = Math.round(responseData.current.feelslike_f) + `°F`;
        document.querySelector('.wind-speed').innerHTML = responseData.current.wind_mph + `mph`;
        document.querySelector('.information').style.display = "block";
        document.querySelector('.error').style.display = "none";
        input.value = '';

        if (imageData.weather[0].description == "clear sky") {
            document.body.style.backgroundImage = "url('../images/am-clear-sky.jpg')";
        } else if (imageData.weather[0].description == "few clouds") {
            document.body.style.backgroundImage = "url('../images/am-few-clouds.jpg')"; 
        } else if (imageData.weather[0].description == "scattered clouds") {
            document.body.style.backgroundImage = "url('../images/am-scattered-clouds.jpg')";
        } else if (imageData.weather[0].description == "broken clouds") {
            document.body.style.backgroundImage = "url('../images/am-broken-clouds.jpg')";
        } else if (imageData.weather[0].description == "overcast clouds") {
            document.body.style.backgroundImage = "url('../images/am-overcast-clouds.jpg')";
        } else if (imageData.weather[0].description == "shower rain") {
            document.body.style.backgroundImage = "url('../images/am-shower-rain.jpg')";
        } else if (imageData.weather[0].description == "rain") {
            document.body.style.backgroundImage = "url('../images/am-rain.jpg')";
        } else if (imageData.weather[0].description == "thunderstorm") {
            document.body.style.backgroundImage = "url('../images/am-thunderstorm.jpg')";
        } else if (imageData.weather[0].description == "snow") {
            document.body.style.backgroundImage = "url('../images/am-snow.jpg')";
        } else if (imageData.weather[0].description == "mist") {
            document.body.style.backgroundImage = "url('../images/am-mist.jpg')";
        }
    
        
        if (responseData.current.temp_f <= 30) {
            card.style.background = "linear-gradient(to bottom, #0d253f 0%, #4592af 100%)";
        } else if (responseData.current.temp_f >= 31 && responseData.current.temp_f <= 50) {
            card.style.background = "linear-gradient(to bottom, #89cff0 0%, #f0c2c2 100%)";
        } else if (responseData.current.temp_f >= 51 && responseData.current.temp_f <= 80) {
            card.style.background = "linear-gradient(to bottom, #f4e371 0%, #f78c4a 100%)";
        } else if (responseData.current.temp_f >= 81) {
            card.style.background = "linear-gradient(to bottom, #ff9642 0%, #ff3333 100%)";
        }
    }
}