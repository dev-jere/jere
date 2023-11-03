//Nigerian Farmers Database Model
const mongoose = require("mongoose");
const Farmers = new mongoose.Schema({
  first_name: {
    required: true,
    type: String,
  },
  last_name: {
    required: true,
    type: String,
  },
  land_title: String,
  state: {
    required: true,
    type: String,
  },
  lga: {
    required: true,
    type: String,
  },
  farm_size: Number,
  crops: String,
  farmer_bvn: {
    type: Number,    
  }, 
  farmer_nin: {
    required: true,
    type: Number,
  },
  phone: {
    required: true,
    type: Number,    
  },
  group: {
    type: String,
    
  },
  status: {
    type: String,
    enum: ['unverified', 'verifying', 'verified'],
    default: "unverified"
  },
  photo: {
    type: String,
    required: false
  }
}, 
{timestamps: true});

module.exports = mongoose.model("Farmers", Farmers);
