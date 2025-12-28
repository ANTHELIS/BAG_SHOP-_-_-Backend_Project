const ownerModel = require('../models/ownerModel');
const bcrypt = require('bcrypt');
const {generateToken} = require("../utils/generateToken");

module.exports.createOwner = async (req, res)=>{
        const owners = await ownerModel.find();
        if(owners.length > 0){
          return res.status(500).send("You can't create a new owner");
        }
        try {
          const { fullname, email, password } = req.body;
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
              if (err) return res.send(err.message);
        
              const owner = await ownerModel.create({
                fullname,
                email,
                password: hash,
              });
              res.redirect("/owners/admin");
            });
          });
        } catch (err) {
          res.send(err.message);
        }
    }

module.exports.loginOwner = async (req, res)=>{
    
    const {email, password} = req.body;
    const owner = await ownerModel.findOne({ email });
    if(!owner) return res.send("email or password is incorrect");
    bcrypt.compare(password, owner.password, (err, result)=>{
        if(result){
          const token = generateToken(owner);
          res.cookie('token', token);
          res.redirect("/owners/admin");
        }
        else{
          res.send("email or password is incorrect");
        }
    })
}

module.exports.logoutOwner = (req, res)=>{
  res.cookie('token', '');
  res.redirect('/owners/login');
}
