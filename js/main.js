const input = document.getElementById('city');
const search = document.getElementById('submit');

search.addEventListener('click', () => {Weather(input.value)});


async function Weather(city){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=` + `f6cb7d4eeb654a0aafe203236230103` + `&q=` + `${city}`)
    let data = await response.json();
    console.log(response);
    console.log(data);
    document.querySelector('.icon').src = data.current.condition.icon
    document.querySelector('.temp').innerHTML = Math.round(data.current.temp_f) + `°F`
    document.querySelector('.city').innerHTML = data.location.name
    document.querySelector('.feels-like').innerHTML = Math.round(data.current.feelslike_f) + `°F`
    document.querySelector('.wind-speed').innerHTML = data.current.wind_mph + `mph`
    input.value = '';
}

