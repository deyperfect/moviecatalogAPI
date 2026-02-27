const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router()
const { verifyToken } = require('../middleware/verifyToken')

router.post('/register', userController.registerUser);
router.get('/details', verifyToken, userController.getUserDetails);
router.post('/login', userController.loginUser);


module.exports = router;