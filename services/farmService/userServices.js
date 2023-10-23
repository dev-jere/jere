/**
 * User Service
 * Create User | Search | Delete | Update | Audit
 */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");

//Register a new User
exports.createUser = [
  async (req, res, next) => {
    try {
      //Check if all required data has been entered
      const { first_name, last_name, email, password, role } = req.body;
      if (!(first_name && last_name && email && password)) {
        res.status(400).send("All input is required");
      }

      //Checking database if user already exists
      const exists = await User.findOne({ email: email });
      if (exists) {
        res.send("A user already exsist with this data...");
      } else {
        hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          first_name: first_name,
          last_name: last_name,
          email: email.toLowerCase(),
          password: hashedPassword,
          role: role || "agent",
        });
        //Create token
        const token = jwt.sign(
          {
            user_id: newUser._id,
          },
          process.env.TOKEN,
          {
            expiresIn: "1h",
          }
        );    
        newUser.token = token;
        await newUser.save();
        res.json({
          data: newUser,
          token,
        });
      }
    } catch (err) {
      next(err);
    }
  },
];

// Search for a User
exports.getUser = [
    auth,  
  async (req, res) => {
    try {
        const email = req.body.email
        if (!email) {
            res.status(400).send('Email is not provided')
        } else {
            const user = await User.findOne({ email});
            if (user) {
              res.status(200).send({ user: user });
            } else {
              res.status(500).json("Failed, try another time");
            }
        } 
    } catch (err) {
        console.log(err)
    }
   
  },
];

// List all Users 
exports.getAllUsers = [
    auth,
    async (req, res) => {
        const users = await User.find();
        if (users) {
            res.status(200).send({users: users});
        } else {
            res.status(500).json("Failed, try again soon...");
        }
    }
]

// User Login Logic
exports.userLogin = [
  async (req, res) => {
    try {
      //Check if data is provided in body
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate Email
      const user = await User.findOne({ email });

      //Check Password validity
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN,
          {
            expiresIn: 86400,
          }
        );
        user.token = token;
        res.status(200).json({ user, token });
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
  },
];
