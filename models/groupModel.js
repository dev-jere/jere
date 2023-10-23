const mongoose = require('mongoose');

const farmer_group = new mongoose.Schema({
    group_name: {
        required: true,
        unique: true,
        type: String
    },
    group_leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
    },
    state: {
        required: true,
        type: String
    },
    lga: {
        required: true,
        type: String
    },    
    contribution: String
}, { timestamps: true})

module.exports = mongoose.model("group", farmer_group);