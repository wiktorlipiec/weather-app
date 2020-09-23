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
    })
}