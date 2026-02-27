const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router()
    
router.post('/register', userController.registerUser);
router.get('/details', verify, userController.getUserDetails);
router.post('/login', userController.loginUser);


module.exports = router;