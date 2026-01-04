const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/isAdmin');
const { createOwner, loginOwner, logoutOwner } = require('../controllers/adminControllers');
const ownerModel = require('../models/ownerModel');
const upload = require('../config/multerConfig');
const path = require('path');


if(process.env.NODE_ENV==="development"){
    router.get('/', (req, res)=>{
        res.render("ownerRegister");
    })
    router.post('/create', createOwner);
}

router.get('/login', (req, res)=>{
    const error = req.flash("error");
    res.render("ownerLogin", {error});
})
router.post('/login', loginOwner)

router.get('/logout', logoutOwner);

router.get('/admin', isAdmin, (req, res)=>{
    const success = req.flash("success");
    res.render("createProducts", {success});
})

router.get('/admin/products', isAdmin, async (req, res)=>{
    const owner = await ownerModel.findOne({email: req.owner.email}).select("-password").populate('products');
    res.render("ownerProductsPanel", {owner});
})

router.get('/admin/profile', isAdmin, (req, res)=>{
    const owner = req.owner;
    res.render('ownerProfile', {owner});
})

router.post('/admin/profile', isAdmin, upload.single('ownerPic'), async(req, res)=>{
    const imgType = path.extname(req.file.originalname) ;
    const { fullname, gstin } = req.body;

    req.owner.fullname=fullname;
    req.owner.gstin=gstin;
    req.owner.img=req.file.buffer;
    req.owner.imgType=imgType;
    await req.owner.save();

    res.redirect('/owners/admin/profile'); 
})


module.exports = router;