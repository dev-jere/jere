const express = require ('express');
const router = express.Router();

const userController = require('../../services/farmService/userServices');

router.post('/adduser', userController.createUser);
router.post('/login', userController.userLogin);
router.get('/getusers', userController.getAllUsers);
// Search for User with email.
router.get('/getuser', userController.getUser);


module.exports = router;