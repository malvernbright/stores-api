const Product = require('../models/Product');

const dateModified = Date.now();


module.exports.stocks_get = (req, res) => {
    Product.find({}, (err, products) => {
        res.status(200).json({ products });
    });
}

module.exports.stocks_get_by_id = (req, res) => {
    Product.findById({ _id: req.params.id }).then((product) => {
        res.status(200).json({ product });
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

module.exports.stock_update = async(req, res) => {
    const { name, quantity, dateModified } = req.body;
    try {
        await Product.updateOne({ _id: req.params.id }, { name, quantity, dateModified: dateModified }).then(() => {
            Product.findOne({ _id: req.params.id }).then((product) => {
                res.status(200).json({ product });
            });
        });

    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports.stock_delete = async(req, res) => {
    try {
        const product = await Product.deleteOne({ _id: req.params.id });
        res.status(202).json({ product: product.name });
    } catch (error) {

    }
}