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
    pin: {
        type: Number,
        required: false,
        default: '0000'
    }
});

module.exports = mongoose.model("Farmer", Farmer);