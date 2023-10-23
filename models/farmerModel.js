// Farmer Database Model
const mongoose = require("mongoose");
const Farmer = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    region: {
        required: true,
        type: String
    },
    district: {
        required: false,
        type: String
    },
    farmsize: {
        required: true,
        type: Number
    },
    crops: {
        required: false,
        type: String
    },
    phone: {
        required: true,
        type: Number
    },
    
}, { timestamps: true});

module.exports = mongoose.model("Farmer", Farmer);