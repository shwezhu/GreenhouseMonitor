/** Import modules **/
// If only use: const mongoose = require('mongoose');
// There will be an error: unresolved function or method connect() mongoose
// on jetbrains IDEA
const MODEL_PATH = './node_modules/';
const express = require(MODEL_PATH + 'express');
const mongoose = require(MODEL_PATH + 'mongoose');
const {getTemperature, createTemperature} = require('./controllers/temperature');
const {getHumidity, createHumidity} = require('./controllers/humidity');

/** Add middleware functions **/
const app = express();
app.use(express.json());
// Catch json format exception
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ status: 'failure', message: err.message }); // Bad request
    }
    next();
});

/** Routing, design endpoint **/
app.get('/temperature', getTemperature);
app.post('/temperature', createTemperature);
app.get('/humidity', getHumidity);
app.post('/humidity', createHumidity);

/** Connect database and run server**/
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/greenhouse');
    app.listen(3000, () => console.log('start listening...'));
}

