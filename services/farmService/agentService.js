/**
 * This is the agent/retailer service
 */
const Order = require('../../models/transaction');
const Agent = require('../../models/agentModel');


//Agent Initial onboarding logic
exports.createAgent = [ async (req, res) => {
    const {first_name, last_name, phone, state, lga, pin} = req.body
    const agent = await Agent.findOne({phone: phone});
    if (agent) {
        res.status(401).send("Agent with this phone number already exsist")
    } else {
        const newAgent = new Agent({
            first_name,
            last_name,
            phone,
            state,
            lga,
            pin,
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