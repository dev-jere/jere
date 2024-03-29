/**
 * This is the agent/retailer service
 */
const Order = require('../../models/transaction');
const Agent = require('../../models/agentModel');
const Farm_Activity = require('../../models/farmer_activity');

//Agent Initial onboarding logic
exports.createAgent = [ async (req, res) => {    
    const {first_name, last_name, phone, state_of_operation, groups, lga} = req.body
    const agent = await Agent.findOne({phone: phone});
    if (agent) {
        res.status(401).send("Agent already exsist")
    } else {
        const newAgent = new Agent({
            first_name,
            last_name,
            phone,
            state_of_operation,
            lga,
            groups
        })
        await newAgent.save()
        res.status(201).send("Agent added successfully");
    }
}]

// Transaction confirmation for cash order completion logic
exports.agentConfirmCashPayment = [ async (req, res) => {
    const { id, status} = req.body;
    const check = await Order.findOne({transactionId: id})
    console.log(response);
    if(!check) {
        res.status(400).json("Transaction Does Non Exsist, Check Reference Code and try again.");
    } else if (check){
        const response = await Order.updateOne({transactionId: id}, {$set:{paymentStatus: status}});
        res.status(200).send("Transaction Completed");
        console.log(response);
    }
}]

//Search for transaction in database
exports.checkOrder = [ async (req, res) => {
    const {id} = req.body
    const order = await Order.findOne({transactionId: id})
    if (order) {
        res.status(200).json({'order': order});
    } else {
        res.status(400).send(`Order ${id} not found`);
    }
}]

//Farmer Activity Creation
exports.activities = [ async (req, res) => {
    try {
        const { activity, description, farmer_id } = req.body;
        const farm = new Farm_Activity({activity, description, farmer_id})
        await farm.save();
        res.status(201).json(farm);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
}]

//Get Farmer Activities
exports.get_farmer_activities = [async (req, res) => {
    try {
        const {farmer_id} = req.params;
        const activities = await Farm_Activity.find(farmer_id);
        res.json(activities);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}]