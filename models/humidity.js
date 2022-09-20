const mongoose = require('mongoose');

const humiditySchema = new mongoose.Schema({
    value: Number,
    date: Date
});

const Humidity = mongoose.model('humidity', humiditySchema);

export default Humidity;