const mongoose = require("mongoose");
const User = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['basic', 'supervisor', 'admin'],
        default: 'basic'
    }
});

module.exports = mongoose.model("User", User);