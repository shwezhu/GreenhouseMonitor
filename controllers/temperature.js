const Temperature = require('../models/temperature');

const getTemperature = async (req, res) => {
    try {
        const temperature = await Temperature.find();

        res.status(200).json(temperature);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createTemperature = async (req, res) => {
    const { value, date } = req.body;
    const newTemperature = new Temperature({ value, date });
    try {
        await newTemperature.save();

        res.status(201).json(newTemperature);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = {
    getTemperature,
    createTemperature
}