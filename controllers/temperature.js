const Temperature = require('../models/temperature');

const getTemperature = async (req, res) => {
    const { startDate, endDate } = req.query;

    if(startDate === '' || endDate === '') {
        return res.status(400).json({
            status:'failure',
            message: 'You must specify \'starDate\' and \'endDate\'.'
        })
    }

    let results;
    try {
        results = await Temperature.find({
            create_date: {
                $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
                $lt: new Date(new Date(endDate).setHours(23, 59, 59))
            }
        }).sort({ date: 'asc'});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    if(results.length === 0) {
        return res.status(404).json({
            status:'failure',
            message:`Could not retrieve data from ${startDate} to ${endDate}`
        })
    }

    res.status(200).json({
        status:'success',
        data: results
    });
}

const createTemperature = async (req, res) => {
    // when use req.body, you have to write app.use(cors()); in app.js first
    const value = req.body.value;
    if(value === undefined) {
        return res.status(400).json({
            status:'failure',
            message: 'You must specify value.'
        })
    }

    const create_date = new Date();
    const temperature = new Temperature({ value, create_date });
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