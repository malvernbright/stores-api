const Product = require('../models/Product');


module.exports.stocks_get = (req, res) => {
    Product.find({}, (err, products) => {
        res.status(200).json({ products });
    });
}

module.exports.stocks_get_by_id = (req, res) => {
    Product.findById({ _id: req.params.id }).then((product) => {
        res.status(200).json({ product });
        console.log(product.quantityStocked - 34.9);
    });
}

module.exports.stocks_post = async(req, res) => {
    const { name, quantityStocked, quantityLeft } = req.body;
    try {
        const product = await Product.create({ name, quantityStocked, quantityLeft: quantityStocked });
        res.status(201).json({ product });
    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports.stock_update = (req, res) => {
    const { name, quantityBought, quantityLeft } = req.body;
    Product.findById({ _id: req.params.id }).then(async(product) => {
        // const { name, quantityBought, quantityLeft } = req.body;
        if (product.quantityLeft === 0) {
            console.error('Error, no products left');
            res.status(401).json({ error: 'Error, no products left' });
        } else if (quantityBought > product.quantityLeft) {
            res.status(401).json({
                error: `Error, your inventory is left with ${product.quantityLeft} units, so you cannot sell ${quantityBought} units which is ${quantityBought - product.quantityLeft} units more than what is left in your inventory`
            });
        } else {
            try {
                await Product.updateOne({ _id: req.params.id }, {
                    name,
                    quantityBought: product.quantityBought + quantityBought || 0,
                    quantityLeft: product.quantityLeft - quantityBought || product.quantityStocked,
                    dateModified: Date.now()
                }).then(() => {
                    Product.findOne({ _id: req.params.id }).then((product) => {
                        res.status(200).json({ product });
                    });
                });
            } catch (error) {
                res.status(400).json({ error: error });
            }
        }
    });
}

module.exports.stock_delete = async(req, res) => {
    try {
        const product = await Product.deleteOne({ _id: req.params.id });
        res.status(202).json({ product: product.name });
    } catch (error) {

    }
}