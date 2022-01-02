const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name is required']
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required']
    }
});