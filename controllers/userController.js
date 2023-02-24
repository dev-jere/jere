const express = require ('express');
const router = express.Router();

const userController = require('../services/userServices');



router.post('/adduser', userController.createUser);
router.post('/getuser', userController.getUser);



module.exports = router;