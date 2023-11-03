/**
 * This is the farmer service
 */
const nigeria_farmers = require("../../models/nigeria_farmers");
const farmer_group = require("../../models/groupModel");
const {uploadToCloudinary} = require('../../services/farmService/cloudinary');
const upload = require('../../middleware/multer');

const Order = require("../../models/transaction");

function refCode(length, chars) {
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

//Register a new Farmer for USSD Access
exports.createFarmer = [ upload.single('farmerImage'),
  async (req, res) => {
    try {
      const {first_name, last_name, state,lga,phone,farmer_nin,farm_size,crops} = req.body;
      //Checking database if user already exists
      const farmer = await nigeria_farmers.findOne({ farmer_nin });
      if(!farmer) {
        const newFarmer = new nigeria_farmers({
          farmer_nin,
          farm_size,
          first_name,
          last_name,
          phone,
          state,
          crops,
          lga
        });
        await newFarmer.save();
        res.status(201).send("Farmer registered without photo");
      } else {
        res.status(400).send("A farmer already exsist with this information");
      }
      
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send(
          "Service not available at the moment, please try again in 15mins..."
        );
    }
  },
];

//Get list of all registered farmers
exports.getAllFarmers = [
  async (req, res) => {
    try {
      const farmers = await nigeria_farmers.find({});
      res.status(200).json(farmers);
    } catch (err) {
      console.log(err);
    }
  },
];

//Search For A Farmer with NIN
exports.getFarmer = [
  async (req, res) => {
    try {
      const farmer_nin = req.body.farmer_nin;
      if (!farmer_nin) {
        res.status(401).send("Please provide Farmer NIN.");
      } else {
        const farmer = await nigeria_farmers.findOne({ farmer_nin });
        res.status(200).json(farmer);
      }
    } catch (err) {
      res.status(500).send("Experiencing some network issue, try again later");
    }
  },
];

//Get a farmer with Phone number
exports.Farmer = [
  async (req, res) => {
    try {
      const phone = req.query.phone;
      if (!phone) {
        res.status(401).send("Please provide farmer NIN...");
      } else {
        const farmer = await nigeria_farmers.findOne({ phone: phone });
        console.log(farmer);
        res.status(200).json(farmer);
      }
    } catch (err) {
      console.log(err);
    }
  },
];

//Create a new order request
exports.createOrder = [
  async (req, res) => {
    try {
      const { product, phone, region, district, qty, amount, id } = req.body;
      const order = await Order.findOne({ transactionId: id }); // Check if transaction already exist
      if (order) {
        res.status(200).send("Order completed");
      } else {
        const newOrder = new Order({
          transactionId: refCode(4, "123456"),
          product,
          qty,
          region,
          amount,
          district,
          phone,
        });
        await newOrder.save();
        res.status(201).send("Order Successful");
      }
    } catch (err) {
      console.log(err);
    }
  },
];

//Get Total Number of Farmers Registered
exports.totalFarmers = [
  async (req, res) => {
    try {
      const farmerSummation = await nigeria_farmers.countDocuments();
      res.json({ farmerSummation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];

//Get Total Land Hectarage
exports.totalLandSize = [
  async (req, res) => {
    try {
      const landSummation = await nigeria_farmers.aggregate([
        {
          $group: {
            _id: null,
            totalSum: { $sum: "$farmsize" },
          },
        },
      ]);
      if (landSummation.length === 0) {
        return res.status(404).json({ error: "No data found" });
      }

      const totalSum = landSummation[0].totalSum;
      res.json({ totalSum });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];

//Create Farmer Group
exports.createGroup = [
  async (req, res) => {
    try {
      const { group_name, state, lga, contribution } = req.body;
      const group = await farmer_group.findOne({ group_name });
      if (group) {
        res.status(400).send("Group name already in database");
      } else {
        const new_group = new farmer_group({
          group_name,
          state,
          lga,
          contribution,
        });
        await new_group.save();
        res.status(201).send("New group added!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
];
