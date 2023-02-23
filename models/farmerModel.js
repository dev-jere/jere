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
    phone: {
        required: true,
        type: Number
    },
    pin: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model("User", Farmer);