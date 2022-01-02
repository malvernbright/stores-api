const Product = require('../models/Product');



module.exports.stocks_get = (req, res) => {
    Product.find({}, (err, product) => {
        res.status(200).json(product);
    });
}

module.exports.stocks_post = async(req, res) => {
    const { name, quantity } = req.body;
    try {
        const product = await Product.create({ name, quantity });
        res.status(201).json({ product });
    } catch (error) {
        res.status(400).json({ error });
    }
}