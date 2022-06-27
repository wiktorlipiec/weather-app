const addressSearch = document.querySelector('.address-search');
const searchBox = new google.maps.places.SearchBox(addressSearch);
const weatherForecast = document.querySelector('.weather-forecast');
const airPollution = document.querySelector('.air-pollution');

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0];

    if(place == null) return;

    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    cleanWeather();
    postData(latitude, longitude)
});

function postData(latitude,longitude) {
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data);
        setWeatherData(data[0]);
        setAirPollution(data[1]);
    })
}

function cleanWeather() {
    weatherForecast.innerText = '';
    airPollution.innerText = '';
}

function setWeatherData(data) {
    //temperature
    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${data.current.temperature}`;
    weatherForecast.append(temperature);

    //weather icon
    const img = document.createElement('img');
    img.src = data.current.weather_icons[0];
    weatherForecast.append(img);
}

function setAirPollution(data) {
    const list = document.createElement('ul');

    //Standard
    data && data.current.standards.map(item => {
        list.innerText += `<li>${item.percent}%</li>`
    });
}