const mongoose = require("mongoose");
const Farmers = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    state: {
        required: true,
        type: String
    },
    lga: {
        required: true,
        type: String
    },
    farmsize: {
        required: false,
        type: Number
    },
    crops: {
        required: false,
        type: String
    },
    nin: {
        required: true,
        type: Number,
        unique: true
    },
    phone: {
        required: true,
        type: Number,
        unique: true
    },
    group: {
        required: false,
        type: String
    },
    pin: {
        type: Number,
        required: false,
        default: '0000'
    }
});

module.exports = mongoose.model("Farmers", Farmers);