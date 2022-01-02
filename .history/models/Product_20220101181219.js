const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name is required']
    },
    quantityStocked: {
        type: Number,
        required: [true, 'quantity is required']
    },
    quantityBought: {
        type: Number,
    },
    quantityLeft: {
        type: Number,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    dateModified: {
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;