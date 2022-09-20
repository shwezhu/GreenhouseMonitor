const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
    value: Number,
    date: Date
});

const Temperature = mongoose.model('temperatureModel', temperatureSchema,'temperature');

module.exports = Temperature;