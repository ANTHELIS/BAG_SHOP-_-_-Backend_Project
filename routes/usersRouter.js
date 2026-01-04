const express = require('express');
const router = express.Router();
const registerValidation = require("../middlewares/registerValidation");
const {registerUser, loginUser, logout} = require('../controllers/authController');
const {userRegisterPage, userLoginPage, shopPage, addToCart, cart} = require("../controllers/pageController");
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const userModel = require('../models/userModel');
const path = require('path');
const upload = require('../config/multerConfig');

router.post('/register', registerValidation, registerUser);
router.post('/login', loginUser);
router.get("/logout", logout);
router.get("/login", userLoginPage);
router.get("/", userRegisterPage);
router.get("/shop", isLoggedIn, shopPage);
router.get("/addtocart/:product_id", isLoggedIn, addToCart);
router.get("/cart", isLoggedIn, cart);
router.get("/profile", isLoggedIn, (req, res)=>{
    const user = req.user
    res.render('userProfile', { user });
});
router.post("/profile/edit", isLoggedIn, upload.single('userPic'), async (req, res)=>{
    const imgType = path.extname(req.file.originalname);
    const { fullname, flat, area, city, state, pincode, contact } = req.body;
    const user = await userModel.findOneAndUpdate({email: req.user.email}, {fullname, imgType, img: req.file.buffer, address: { flat, area, city, state, pincode, contact } });
    res.redirect('/profile');
});




module.exports = router;