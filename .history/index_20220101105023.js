const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const unless = require('express-unless');

const auth = require('./middleware/auth');
const errors = require('./middleware/errors');


const app = express();


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connected to db');
}, (error) {
    console.log('error connecting to db: ' + error.message)
});