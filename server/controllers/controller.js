const Temperature = require('../models/temperature');
const Humidity = require('../models/humidity');

const getData = async (req, res, type) => {
    const { startDate, endDate } = req.query;

    if(startDate === '' || endDate === '') {
        return res.status(400).json({
            status:'failure',
            message: 'You must specify \'starDate\' and \'endDate\'.'
        })
    }

    let model;
    if(type === 'temperature') {
        model = Temperature;
    } else {
        model = Humidity;
    }

    let results;
    try {
        results = await model.find({
            create_date: {
                $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
                $lt: new Date(new Date(endDate).setHours(23, 59, 59))
            }
        }).sort({ date: 'asc'});
    } catch (error) {
        res.status(404).json({
            status: 'failure',
            message: error.message
        });
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

const createData = async (req, res, type) => {
    // when use req.body, you have to write app.use(express.json()); in app.js first
    const value = req.body.value;
    if(value === undefined) {
        return res.status(400).json({
            status:'failure',
            message: 'You must specify value.'
        })
    }

    let model;
    const create_date = new Date();
    if (type === 'temperature') {
        model = new Temperature({value, create_date});
    } else {
        model = new Humidity({value, create_date});
    }

    try {
        await model.save();
        res.status(201).json({
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            status: 'failure',
            message: error.message
        });
    }
}

module.exports = {getData, createData}