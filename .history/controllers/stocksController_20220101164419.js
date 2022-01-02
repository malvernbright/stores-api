const Product = require('../models/Product');



module.exports.stocks_get = (req, res) => {
    // res.send("That's an authenticated request");
    Product.find({}, (err, product) => {
        res.status(200).json(product);
    });

}

module.exports.login_get = (req, res) => {
    res.render('login');
}