const mongoose = require ('mongoose');

const Product = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number
    },
    category: {
        required: true,
        type: String
    },
    barcode: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    supplier_price: {
        type: Number,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", Product);