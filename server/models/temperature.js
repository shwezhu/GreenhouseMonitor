const mongoose = require('mongoose');

// versionKey: https://stackoverflow.com/a/31872302/16317008
const temperatureSchema = new mongoose.Schema({
    value: {
        type: Number,
        max: [50, 'Temperature can not higher than 50'],
        required: [true, 'Value field is required']
    },
    create_date: Date
}, { versionKey: false} );

const Temperature = mongoose.model('temperatureModel', temperatureSchema,'temperature');

module.exports = Temperature;