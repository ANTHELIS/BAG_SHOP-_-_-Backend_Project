const express = require('express');
const router = express.Router();
const upload = require("../config/multerConfig");
const productModel = require('../models/productModel');
const path = require("path");
const ownerModel = require('../models/ownerModel');
const { isAdmin } = require('../middlewares/isAdmin');

router.post('/create', isAdmin, upload.single('image'), async (req, res)=>{
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        const imgType = path.extname(req.file.originalname) ;
        const product = await productModel.create({ img: req.file.buffer, imgType, name, price, discount, bgcolor, panelcolor, textcolor });
        const owner = await ownerModel.findOne({ email: req.owner.email });
        owner.products.push(product._id);
        await owner.save();
        req.flash("success", "product created successfully");
        res.redirect('/owners/admin');
    } catch (err) {
        res.send(err);
    }
});

router.get('/edit/:product_id', isAdmin, async (req, res)=>{
    const product = await productModel.findOne({ _id: req.params.product_id });
    res.render('editProduct', { product });
})
router.post('/edit/:product_id', isAdmin, async (req, res)=>{
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    await productModel.findOneAndUpdate({ _id: req.params.product_id }, { name, price, discount, bgcolor, panelcolor, textcolor });
    res.redirect('/owners/admin/products');
})
router.get('/delete/:product_id', isAdmin, async (req, res)=>{
    await productModel.findOneAndDelete({ _id: req.params.product_id });
    req.owner.products.splice(req.owner.products.indexOf(req.params.product_id), 1);
    await req.owner.save();
    res.redirect('/owners/admin/products');
})



module.exports = router