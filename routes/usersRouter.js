const express = require('express');
const router = express.Router();
const registerValidation = require("../middlewares/registerValidation");
const {registerUser, loginUser, logout} = require('../controllers/authController');
const {userRegisterPage, userLoginPage, shopPage, addToCart, cart} = require("../controllers/pageController");
const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.post('/register', registerValidation, registerUser);
router.post('/login', loginUser);
router.get("/logout", logout);
router.get("/login", userLoginPage);
router.get("/", userRegisterPage);
router.get("/shop", isLoggedIn, shopPage);
router.get("/addtocart/:product_id", isLoggedIn, addToCart);
router.get("/cart", isLoggedIn, cart);




module.exports = router;