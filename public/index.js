const addressSearch = document.querySelector('.address-search');
const searchBox = new google.maps.places.SearchBox(addressSearch);

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0];

    if(place == null) return;

    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

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
        setWeatherData(data[0])
    })
}

function setWeatherData(data) {
    const weatherForecast = document.querySelector('.weather-forecast');

    //temperature
    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${data.current.temperature}`;
    weatherForecast.append(temperature);

    //weather icon
    const img = document.createElement('img');
    img.src = data.current.weather_icons[0];
    weatherForecast.append(img);
}