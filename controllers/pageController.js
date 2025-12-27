const productModel = require('../models/productModel');
const userModel = require('../models/userModel');

module.exports.userRegisterPage = (req, res)=>{
    res.render('index');
};

module.exports.userLoginPage = (req, res)=>{
    const error = req.flash("error");
    res.render('login', {error});
};

module.exports.shopPage = async (req, res)=>{
    const products = await productModel.find();
    const success = req.flash("success");
    res.render("shop", {products, success});
};

module.exports.addToCart = async (req, res)=>{
    // const user = await userModel.findOne({email: req.user.email});
    req.user.cart.push(req.params.product_id);
    await req.user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
};

module.exports.cart = async (req, res)=>{
    const user = await userModel.findOne({email: req.user.email}).populate("cart");

    res.render('cart', {user});
};