const express = require('express');
const axios = require('axios');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

app.use(express.json());
app.use(express.static('public'));

function getWeather(latitude, longitude) {
    const params = {
        access_key: process.env.WEATHERSTACK_API_KEY,
        query: `${latitude},${longitude}`
    };

    return axios.get('http://api.weatherstack.com/forecast', {params});
}

function getAirly(latitude, longitude) {
    const params = {
        apikey: process.env.AIRLY_API_KEY,
        lat: latitude,
        lng: longitude
    };

    return axios.get('https://airapi.airly.eu/v2/measurements/nearest',{params});
}

app.post('/weather', async (req,res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    try {
        const [weather, airly] = await axios.all([getWeather(latitude, longitude), getAirly(latitude, longitude)]);
        const covid = await axios.get(`https://api.covid19api.com/total/dayone/country/${weather.data.location.country}`);
        res.json([weather.data, airly.data, covid.data]);
    }catch (e) {
        console.log(e);
    }
});

app.listen(3000, () => {
    console.log('Server Started')
});