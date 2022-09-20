const Humidity = require('../models/humidity');

const getHumidity = async (req, res) => {
    try {
        const results = await Humidity.find({limit: 20});

        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createHumidity = async (req, res) => {
    const { value, date } = req.body;
    const humidity = new Humidity({ value, date });
    try {
        await humidity.save();

        res.status(201).json(humidity);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = {
    getHumidity,
    createHumidity
}