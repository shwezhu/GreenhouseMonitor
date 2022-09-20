/** Import modules **/
const express = require('express');
// If only use: const mongoose = require('mongoose');
// There will be an error: unresolved function or method connect() mongoose
// on jetbrains IDEA
const MODEL_PATH = './node_modules/';
const mongoose = require(MODEL_PATH + 'mongoose');
const cors = require('cors');
const {getTemperature, createTemperature} = require('./controllers/temperature');

/** Add middleware functions **/
const app = express();
app.use(express.json());
app.use(cors());


/** Routing, design endpoint **/
app.get('/temperature', getTemperature);
app.post('/temperature', createTemperature);

app.get('/humidity', (req, res) => {
    res.send('data from temperature');
    console.log(Object.keys(req.query).length);
    console.log(req.query.date);
    console.log(req.query.num);
});

/** Connect database and run server**/
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/greenhouse');
    app.listen(3000, () => console.log('start listening...'));
}

