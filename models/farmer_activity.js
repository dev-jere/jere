const mongoose = require('mongoose');

const farmer_activity = mongoose.Schema({
    farmer_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "farmers",
    },
    status: {
        required: true,
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("farmer_activity", farmer_activity)