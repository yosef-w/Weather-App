const input = document.getElementById('city');
const search = document.getElementById('submit');

search.addEventListener('click', () => {Weather(input.value)});

search.addEventListener('keyup', (event) => {
    console.log('keyup event triggered');
    if (event.key === 'Enter') {
        event.preventDefault();
        search.click()
    }
});

async function Weather(city){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=` + `f6cb7d4eeb654a0aafe203236230103` + `&q=` + `${city}`)
    const image = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + `${city}` + `&appid=070cda70adba8d6a6838907d70211ee6`)
    let responseData = await response.json();
    let imageData = await image.json();
    console.log(response);
    console.log(image)
    console.log(responseData);
    console.log(imageData);

    document.querySelector('.city').innerHTML = responseData.location.name

    document.querySelector('.icon').src = `http://openweathermap.org/img/wn/` + imageData.weather[0].icon + `@2x.png`
    
    document.querySelector('.description').innerHTML = imageData.weather[0].description

    document.querySelector('.temp').innerHTML = Math.round(responseData.current.temp_f) + `°`

    document.querySelector('.high').innerHTML = Math.round((imageData.main.temp_max - 273.15) * (9/5) + 32) + `°F`;

    document.querySelector('.low').innerHTML = Math.round((imageData.main.temp_min - 273.15) * (9/5) + 32) + `°F`;


    document.querySelector('.feels-like').innerHTML = Math.round(responseData.current.feelslike_f) + `°F`

    document.querySelector('.wind-speed').innerHTML = responseData.current.wind_mph + `mph`

    document.querySelector('.information').style.display = "block";

    input.value = '';
    // event.preventDefault();

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
    }

    

}