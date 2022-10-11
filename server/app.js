/** Import modules **/
// If only use: const mongoose = require('mongoose');
// There will be an error: unresolved function or method connect() mongoose
// on jetbrains IDEA
const MODEL_PATH = './node_modules/';
const express = require(MODEL_PATH + 'express');
const mongoose = require(MODEL_PATH + 'mongoose');
const cors = require(MODEL_PATH + 'cors')
const {getData, createData} = require("./controllers/controller");

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
// You have to use this, when you use html/js to fetch data, otherwise, your client will get an error
// Error: Origin http://localhost:63342 is not allowed by Access-Control-Allow-Origin.
app.use(cors());

/** Routing, design endpoint **/
app.get('/temperature', async (req, res) => {
    return getData(req, res, 'temperature');
});
app.post('/temperature', async (req, res) => {
    return createData(req, res, 'temperature');
});
app.get('/humidity', async (req, res) => {
    return getData(req, res, 'humidity');
});
app.post('/humidity', async (req, res) => {
    return createData(req, res, 'humidity');
});

/** Connect database and run server**/
main().catch(err => console.log(err));

const PORT = process.env.PORT || 3001;
async function main() {
    await mongoose.connect('mongodb://localhost:27017/greenhouse');
    app.listen(PORT, () => console.log('start listening...'));
}

