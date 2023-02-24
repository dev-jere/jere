/**
 * This is the farmer service
 */
const Farmer = require('../models/farmerModel'); //Farmer model


//Register a new Farmer for USSD Access
exports.createFarmer = [async (req, res)=> {
    try {
        const { first_name, last_name, phone } = req.body;
        const farmer = await Farmer.findOne({phone: phone}); //Checking database if user already exists

        if (farmer) {
            res.status(400).send('A farmer already exsist with this data...');

        } else {
            const newFarmer = new Farmer({
                first_name,
                last_name,
                phone,
                pin: 0000
            });
            await newFarmer.save();
            res.status(201).send('Farmer registered successfully.')
        }
    } catch (err) {
        res.status(500).send('Service not available at the moment, please try again in 15mins...');
    }
}]

exports.getFarmer = [async (req, res) => {
    try {
        const {phone} = req.body;
        const farmer = await Farmer.findOne({phone: phone});
        res.status(200).send(farmer);
    } catch (err) {
        res.status(500).send('Service not available at the moment, please try again in 15mins...');
    }
}]
