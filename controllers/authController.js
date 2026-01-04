const {validationResult, Result} = require('express-validator');
const bcrypt = require('bcrypt');
const {generateToken} = require("../utils/generateToken");
const userModel = require('../models/userModel');


module.exports.registerUser = (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const {fullname, email, password} = req.body;
    
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err) return res.send(err.message);
                else {
                    const user = await userModel.create({
                        fullname, email, password: hash
                    });
                    const token = generateToken(user);
                    res.cookie('token', token);
                    res.redirect('/shop');
                };
            });
        });
    } catch (err) {
        res.send(err.message);
    }
}

module.exports.loginUser = async (req, res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({ email });
    if(!user) return res.send("email or password is incorrect");
    bcrypt.compare(password, user.password, (err, result)=>{
        if(result){
            const token = generateToken(user);
            res.cookie('token', token);
            res.redirect("/shop");
        }
        else{
            res.send("email or password is incorrect");
        }
    })
}

module.exports.logout = (req, res)=>{
    res.cookie('token', '');
    res.redirect("/login");
}