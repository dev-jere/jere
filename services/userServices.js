/**
 * This is the farmer service
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/userModel'); //Farmer model


//Register a new Farmer for USSD Access
exports.createUser = [async (req, res)=> {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        if(!(first_name && last_name && email && password)) {
            res.status(400).send('All input is required');
        }

        const exists = await User.findOne({email: email}); //Checking database if user already exists
        if (exists) {
            res.send('A user already exsist with this data...');

        } else {
            // Hash Password
        hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            first_name: first_name, 
            last_name: last_name, 
            email: email.toLowerCase(), 
            password: hashedPassword, 
            role: role || "basic"
        });
        //Create token
        const token = jwt.sign({
            user_id: newUser._id
        }, process.env.TOKEN_KEY, {
            expiresIn: "5h",
        });
        //Save token
        newUser.token = token;
        await newUser.save();
        res.json({
            data: newUser,
            token
        })
        
    } 
} catch (err) {
    next(err);

}
}]

exports.getUser = [async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email: email});
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send('Service not available at the moment, please try again in 15mins...');
    }
}]

