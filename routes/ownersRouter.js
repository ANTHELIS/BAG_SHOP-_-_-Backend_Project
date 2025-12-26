const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownerModel');

if(process.env.NODE_ENV==="development"){
    router.post('/create', async (req, res)=>{
        const owners = await ownerModel.find();
        if(owners.length > 0){
            return res.status(500).send("You can't create a new owner");
        }
        const {fullname, email, password} = req.body;
        const owner = await ownerModel.create({
            fullname, email, password
        });
        res.send("owner created");
    });
}

router.get('/', (req, res)=>{
    res.render("ownerLogin");
})
router.get('/admin', (req, res)=>{
    const success = req.flash("success");
    res.render("createProducts", {success});
})







module.exports = router;