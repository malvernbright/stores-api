const Product = require('../models/Product');
const jwt = require('jsonwebtoken');


module.exports.stocks_get = (req, res) => {

    if (jwt.decode(req.cookies.jwt).id) {
        Product.find({ owner: jwt.decode(req.cookies.jwt).id }, (err, products) => {
            if (err) {
                res.status(400).json({ error: 'no product found' });
            }
            res.status(200).json({ products });
        });
    } else {
        res.status(401).json({ error: 'You need to be authenticated to get access to this' })
    }

}

module.exports.stocks_get_by_id = (req, res) => {
    Product.findById({ _id: req.params.id }).then((product) => {
        res.status(200).json({ product });
    });
}

module.exports.stocks_post = async(req, res) => {
    // create a product
    const { name, quantityStocked } = req.body;
    try {
        const product = await Product.create({
            owner: jwt.decode(req.cookies.jwt).id,
            name,
            quantityStocked,
            quantityLeft: quantityStocked
        });
        res.status(201).json({ product });
    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports.stock_update = (req, res) => {
    const { name, quantityBought } = req.body;
    Product.findById({ _id: req.params.id }).then(async(product) => {
        if (product.quantityLeft === 0) {
            /* first check if quantity left in the database hasn't been 
            depleted and raise unauthorized error */
            console.error('Error, no products left');
            res.status(401).json({ error: 'Error, no products left' });
        } else if (quantityBought > product.quantityLeft) {
            /* Also check if user is trying to sell more than
            what is left in the database and raise an unauthorized error */
            res.status(401).json({
                error: `Error, your inventory is left with ${product.quantityLeft} units, so you cannot sell ${quantityBought} units which is ${quantityBought - product.quantityLeft} units more than what is left in your inventory`
            });
        } else {
            /* if the above conditions evaluates to false, 
            then continue with the operation */
            try {
                await Product.updateOne({ _id: req.params.id }, {
                    name: name || product.name,
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
    // Delete operation on the product
    try {
        const product = await Product.deleteOne({ _id: req.params.id });
        res.status(202).json({ product: product.name });
    } catch (error) {

    }
}