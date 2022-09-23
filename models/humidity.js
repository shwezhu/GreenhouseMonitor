const mongoose = require('mongoose');

// versionKey: https://stackoverflow.com/a/31872302/16317008
const humiditySchema = new mongoose.Schema({
    value: Number,
    create_date: Date
}, { versionKey: false});

const Humidity = mongoose.model('humidityModel', humiditySchema, 'humidity');

module.exports = Humidity;