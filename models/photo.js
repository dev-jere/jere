const mongoose = require("mongoose");

const photo = new mongoose.Schema({
    name: String,
    email: String,
    photo: String,
});

module.exports = mongoose.model('Photo', photo);