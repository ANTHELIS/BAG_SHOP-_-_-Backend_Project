const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/isAdmin');
const { createOwner, loginOwner, logoutOwner } = require('../controllers/adminControllers');

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


module.exports = router;