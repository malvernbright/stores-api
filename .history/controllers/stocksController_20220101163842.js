const Product = require('../models/Product');



module.exports.stocks_get = (req, res) => {

    if (!req.cookies.jwt == '') {
        // res.send("That's an authenticated request");
        res.send({ pId: "some-stupid-id", productName: "Baby lotion" });
    } else {
        res.send("You're not allowed to access this endpoint without being authenticated");
    }
}

module.exports.login_get = (req, res) => {
    res.render('login');
}