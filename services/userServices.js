/**
 * This is the farmer service
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/userModel'); //Farmer model


//Register a new Farmer for USSD Access
exports.createUser = [async (req, res, next)=> {
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

exports.login = [async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!(email && password)) {
            res.status(400).send("All input is required");
        }

        const user = await User.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch(err) {
        console.log(err);
    }
}]

