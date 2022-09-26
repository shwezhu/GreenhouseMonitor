const mongoose = require('mongoose');

// versionKey: https://stackoverflow.com/a/31872302/16317008
const humiditySchema = new mongoose.Schema({
    value: {
        type: Number,
        max: [0, 'Humidity can not be negative'],
        required: [true, 'Value field is required']
    },
    create_date: Date
}, { versionKey: false});

const Humidity = mongoose.model('humidityModel', humiditySchema, 'humidity');

module.exports = Humidity;