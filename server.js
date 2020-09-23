const express = require('express');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/weather',(req,res) => {

});

app.listen(3000, () => {
    console.log('Server Started')
});