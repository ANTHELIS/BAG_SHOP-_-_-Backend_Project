const express = require('express');
const router = express.Router();
const upload = require("../config/multerConfig");
const productModel = require('../models/productModel');
const path = require("path");

router.post('/create', upload.single('image'), async (req, res)=>{
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        const imgType = path.extname(req.file.originalname) ;
        const product = await productModel.create({ img: req.file.buffer, imgType, name, price, discount, bgcolor, panelcolor, textcolor });
        req.flash("success", "product created successfully");
        res.redirect('/owners/admin');
    } catch (err) {
        res.send(err);
    }
});


module.exports = router