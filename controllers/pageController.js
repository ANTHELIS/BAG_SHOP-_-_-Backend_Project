const productModel = require('../models/productModel');

module.exports.userRegisterPage = (req, res)=>{
    res.render('index');
};

module.exports.userLoginPage = (req, res)=>{
    const error = req.flash("error");
    res.render('login', {error});
};

module.exports.shopPage = async (req, res)=>{
    const products = await productModel.find();
    res.render("shop", {products});
};