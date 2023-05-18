const express = require ('express');
const router = express.Router();

const userController = require('../services/userServices');

router.post('/adduser', userController.createUser);
router.post('/login', userController.login);
//router.get('/users', userController.User);
router.get('/user', userController.User);


module.exports = router;