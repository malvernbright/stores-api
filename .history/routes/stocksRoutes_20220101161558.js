const { Router } = require('express');
const stocksController = require('../controllers/stocksController');

const router = Router();

router.get('/stocks', stocksController.stocks_get);