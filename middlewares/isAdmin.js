const jwt = require("jsonwebtoken");
const ownerModel = require("../models/ownerModel");

module.exports.isAdmin = async (req, res, next)=>{
    if(!req.cookies.token){
        req.flash("error", "Admin, you need to login first");
        return res.redirect("/owners/login");
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const owner = await ownerModel.findOne({email: decoded.email}).select("-password");
        next();
    } catch (error) {
        req.flash("error", "Something went wrong!!");
        res.redirect("/owners/login");
    }
}