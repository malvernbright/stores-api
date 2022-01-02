const { Router } = require('express');
const stocksController = require('../controllers/stocksController');

const router = Router();

router.get('/stocks', stocksController.stocks_get);
router.post('/stocks', stocksController.stocks_post);

module.exports = router;