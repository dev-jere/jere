
const Wallet = require("../models/wallet");
const Farmer = require("../models/farmerModel");
const WalletTransaction = require("../models/wallet_transaction");
const Transaction = require("../models/transaction");
const Flutterwave = require("flutterwave-node-v3");

const flw = new Flutterwave(process.env.FLUTTERWAVE, process.env.FLUTTERWAVE_SECRET);


//Payment with USSD








//Payment to wallet response Logic with Card.
exports.payment = [ async (req, res) => {
    const { transaction_id } = req.body;
    
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;
    const response = await axios({
        url,
        method:"GET",
        Headers: {
            "Content-Type":"application/json",
            Accept: "application/json",
            Authorization: `${process.env.FLUTTERWAVE_SECRET}`,
        },
    });

    const {status, currency, id, amount, customer } = response.data.data;

    //Check if Transaction already exist in database
    const transactionExist = await Transaction.findOne({transactionId: id});

    if (transactionExist) {
        res.status(401).send("Transaction Already Exist");
    }

    //Check if Farmer exists in database
    const user = await Farmer.findOne({phone: customer.phone_number});

    //Check if Farmer has a wallet, else create a wallet
    const wallet = await validateUserWallet(user);

    //create wallet transaction
    await createWalletTransaction(user, id, status, currency, amount, customer);

    await updateWallet(user, amount);

    return res.status(200).json({
        response: "Wallet funded successfully",
        data: wallet,
    });
}]

//Validate User Wallet
const validateUserWallet = async (userId) => {
    try {
        const userWallet = await Wallet.findOne({userId});

        if(!userWallet){
            const wallet = await Wallet.create({
                userId,
            });
            return wallet;
        }
        return userWallet
    } catch (err) {
        console.log(err);
    }
}

//Create Wallet Transaction
const createWalletTransaction = async (userId, status, currency, amount) => {
    try {
        const walletTransaction = await WalletTransaction.create({
            amount,
            userId,
            isInFlow: true,
            currency,
            status,
        });
        return walletTransaction;
    } catch (err) {
        console.log(err);
    }
}

//Create Transaction
const createTransaction = async(userId, id, status, currency, amount, customer) => {
    try {
        const transaction = await Transaction.create({
            userId,
            transactionId,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            amount,
            currency,
            paymentStatus,
            paymentGateway: "flutterwave",
        });
        return transaction;
    } catch (err) {
        console.log(err);
    }
}

//Update Exsisting Wallet
const updateWallet = async (userId, amount) => {
    try {
        const wallet = await Wallet.findOneAndUpdate(
            {userId},
            {$inc: {balance: amount}},
            { new: true}
            );
            return wallet;
    } catch (err) {
        console.log(err);
    }
}