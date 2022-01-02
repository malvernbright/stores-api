const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const stocksRoutes = require('./routes/stocksRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());


// view engine
// app.set('view engine', 'ejs');

// database connection
// const dbURI = 'mongodb://localhost/store-manager';
const dbURI = 'mongodb+srv://lazycoder:usatsamwa20@cluster0.zhcie.mongodb.net/stock-store?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(process.env.PORT || 3000, () => { console.log('listening on port: ' + process.env.PORT) }))
    .catch((err) => console.log(err));

// routes
app.use(authRoutes, stocksRoutes);