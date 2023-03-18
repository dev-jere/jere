const mongoose = require("mongoose");
const Agent = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    state: {
        required: false,
        type: String
    },
    lga: {
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

module.exports = mongoose.model("Agent", Agent);