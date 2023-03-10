const express = require ('express');
const router = express.Router();

const userController = require('../services/userServices');

router.post('/adduser', userController.createUser);
router.post('/login', userController.login);
router.get('/allusers', userController.allUser);


module.exports = router;