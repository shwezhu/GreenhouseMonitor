const mongoose = require('mongoose');

const humiditySchema = new mongoose.Schema({
    value: Number,
    date: Date
});

const Humidity = mongoose.model('humidityModel', humiditySchema, 'humidity');

module.exports = Humidity;