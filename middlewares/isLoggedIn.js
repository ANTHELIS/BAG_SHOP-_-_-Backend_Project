const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports.isLoggedIn = async (req, res, next)=>{
    if(!req.cookies.token){
        req.flash("error", "you need to login first");
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const user = await userModel.findOne({email: decoded.email}).select("-password");
        req.user = user;
        next();
    } catch (error) {
        req.flash("error", "Something went wrong!!");
        res.redirect("/login");
    }
}