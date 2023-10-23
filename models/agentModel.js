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
    state_of_operation: {
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
    groups: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        ref: "users",
        required: true,
    },
});

module.exports = mongoose.model("Agent", Agent);