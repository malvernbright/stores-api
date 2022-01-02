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
}, (error) => {
    console.log('error connecting to db: ' + error.message)
});

auth.authenticateToken.unless = unless;
app.use(auth.authenticateToken.unless({
    // Exclude routes to be checked for authentication
    path: [
        { url: '/users/login', methods: ['POST'] },
        { url: '/users/register', methods: ['POST'] },
    ]
}));

// Middlewares
app.use(express.json());
app.use(errors.errorHandler);

// routes
app.use('/users', require('./routes/user.routes'));



app.listen(process.env.port || 4000, function() {
    console.log('server running');
})