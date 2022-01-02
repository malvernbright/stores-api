const Product = require('../models/Product');

function calculateLeft(stocked, bought) {
    return (stocked - bought);
}


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
    const { quantityBought, quantityLeft } = req.body;
    Product.findById({ _id: req.params.id }).then(async(product) => {
        // res.status(200).json({ product });
        // console.log(product.quantityStocked - 34.9);
        try {
            await product.updateOne({ _id: req.params.id }, {
                quantityBought: quantityBought,
                quantityLeft: product.quantityStocked - quantityBought,
                dateModified: Date.now()
            }).then(() => {
                Product.findOne({ _id: req.params.id }).then((product) => {
                    res.status(200).json({ product });
                });
            });

        } catch (error) {
            res.status(400).json({ error: error });
        }
    });

    const qtyStocked = Product.findById({ _id: req.params.id });
    let total = qtyStocked.quantityStocked - qtyStocked.quantityBought;

}

module.exports.stock_delete = async(req, res) => {
    try {
        const product = await Product.deleteOne({ _id: req.params.id });
        res.status(202).json({ product: product.name });
    } catch (error) {

    }
}