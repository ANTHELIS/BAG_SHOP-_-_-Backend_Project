const express = require('express');
const router = express.Router();
const registerValidation = require("../middlewares/registerValidation");
const {registerUser, loginUser, logout} = require('../controllers/authController');
const {userRegisterPage, userLoginPage, shopPage, addToCart, cart, deleteFromCart, addQuantity, decQuantity, orderCheckout, placeOrder, myOrder, productDes} = require("../controllers/pageController");
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const userModel = require('../models/userModel');
const path = require('path');
const upload = require('../config/multerConfig');
const profileUpdateFieldsValidator = require('../middlewares/profileUpdaterValidation');
const { validationResult } = require('express-validator');



router.post('/register', registerValidation, registerUser);
router.post('/login', loginUser);
router.get("/logout", logout);
router.get("/login", userLoginPage);
router.get("/", userRegisterPage);
router.get("/shop", isLoggedIn, shopPage);
router.get("/addtocart/:product_id", isLoggedIn, addToCart);
router.get("/deletecartitem/:product_id", isLoggedIn, deleteFromCart);
router.get("/addquantity/:product_id", isLoggedIn, addQuantity);
router.get("/decquantity/:product_id", isLoggedIn, decQuantity);
router.get("/cart", isLoggedIn, cart);
router.get("/checkout", isLoggedIn, orderCheckout);
router.post("/placeorder", isLoggedIn, placeOrder);
router.get("/myorder", isLoggedIn, myOrder);



router.get("/profile", isLoggedIn, async(req, res)=>{
    const user = await userModel.findOne({ email: req.user.email });
    res.render('userProfile', { user });
});

router.get('/product/:product_id', isLoggedIn, productDes);

router.post("/profile/edit", isLoggedIn, upload.single('userPic'), profileUpdateFieldsValidator, async (req, res)=>{
    
    const { fullname, flat, area, city, state, pincode, contact } = req.body;
    const updatedData = { 
        fullname, 
        address: {
            flat, area, city, state, pincode, contact
        }
    };
    if(req.file){
        const imgType = path.extname(req.file.originalname);
        updatedData.imgType = imgType;
        updatedData.img = req.file.buffer;
    }
    const user = await userModel.findOneAndUpdate({email: req.user.email}, updatedData);
    res.redirect('/profile');
});




module.exports = router;