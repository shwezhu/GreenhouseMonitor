const Temperature = require('../models/temperature');

const getTemperature = async (req, res) => {
    try {
        const results = await Temperature.find({limit: 20});

        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createTemperature = async (req, res) => {
    const { value, date } = req.body;
    const temperature = new Temperature({ value, date });
    try {
        await temperature.save();

        res.status(201).json(temperature);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = {
    getTemperature,
    createTemperature
}