/**
 * This is the farmer service
 */
const nigeria_farmers = require('../../models/nigeria_farmers');
//const Farmer = require('../models/Ngfarmers'); //Farmer model

const Order = require('../../models/transaction')

function refCode(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

//Register a new Farmer for USSD Access
exports.createFarmer = [async (req, res)=> {
    try {
        const { first_name, last_name, state, lga, phone, nin, farmsize, crops, group_id, status } = req.body;
        //Checking database if user already exists
        const farmer = await nigeria_farmers.findOne({phone: phone}); 

        if (!farmer) {
            const newFarmer = new nigeria_farmers({
                farmer_bvn,
                farmer_nin,
                farm_size,
                first_name,
                last_name,
                phone,
                state,
                farmsize,
                crops,
                group_id,
                lga,
                nin,
                status,
            });
            await newFarmer.save();
            res.status(201).send('Farmer registered successfully.')
        } else {
            res.status(400).send('A farmer already exsist with this data...');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Service not available at the moment, please try again in 15mins...');
    }
}]


//Get a list of registered farmers
exports.getFarmers = [ async (req, res) => {
    try {
        const farmers = await nigeria_farmers.find({})
        res.status(200).json(farmers)
    } catch (err) {
        console.log(err);
    }    
}]


//Get a farmer with Phone number
exports.Farmer = [ async (req, res) => {
    try {
        const phone =  req.query.phone
        const farmer = await Farmer.findOne({phone: phone})
        console.log(farmer)
        res.status(200).json(farmer)
    } catch (err) {
        console.log(err);
    }    
}]

//Create a new order request
exports.createOrder = [ async (req, res) => {
    try {
        const { product, phone, region, district, qty, amount, id } = req.body;
        const order = await Order.findOne({transactionId: id}); // Check if transaction already exist
        if (order) {
            res.status(200).send("Order completed")
        } else {
            const newOrder = new Order({
                transactionId: refCode(4, "123456"),
                product,
                qty,
                region,
                amount,
                district,
                phone
            })
            await newOrder.save()
            res.status(201).send("Order Successful");
        }

    } catch (err) {
        console.log(err);
    }
}]

//Get Total Numbe of Farmers Registered
exports.totalFarmers = [ async (req, res) => {
    try {
        const farmerSummation = await Farmer.countDocuments();
        res.json({ farmerSummation });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ínternal server error'});
    }

}]

//Get Total Land Hectarage
exports.totalLandSize = [ async (req, res) => {
    try {
        const landSummation = await Farmer.aggregate([
            {
                $group: {
                    _id: null,
                    totalSum: { $sum: '$farmsize'},
                },
            },
        ]);
        if (landSummation.length === 0) {
            return res.status(404).json({ error: 'No data found'});
        }

        const totalSum = landSummation[0].totalSum;
        res.json({ totalSum});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error'});
    }
}]