const express = require('express');
const router = express.Router();
const registerValidation = require("../middlewares/registerValidation");
const {registerUser} = require('../controllers/authController');





router.get('/', (req, res)=>{
    res.send("working");
})


router.post('/register', registerValidation, registerUser);

module.exports = router