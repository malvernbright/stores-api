const Product = require('../models/Product');

// Handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { productLeft: '' };

    // Duplicate error code
    if (err.code === 11000) {
        errors.email = 'that email is already in use';
        return errors;
    }

    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered';
    }

    if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect';
    }

    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
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

    const product = Product.findById({ _id: req.params.id }).then(async(product) => {
        const { quantityBought, quantityLeft } = req.body;
        if (product.quantityLeft === 0) {
            console.error('Cannot sell, products have been depleted');
        } else {
            try {
                await Product.updateOne({ _id: req.params.id }, {
                    quantityBought: product.quantityBought + quantityBought,
                    quantityLeft: product.quantityLeft - quantityBought,
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