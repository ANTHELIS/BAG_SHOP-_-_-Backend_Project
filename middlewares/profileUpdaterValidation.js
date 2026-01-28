const {body, validationResult} = require("express-validator");

const profileUpdateFieldsValidator = [
    body("fullname").trim().isLength({min: 5, max: 30}).withMessage("Fullname must be min 5 and max 30 characters"),
    body("flat").trim().isLength({min: 5, max: 30}).withMessage("flat must be min 5 and max 30 characters"),
    body("area").trim().isLength({min: 5, max: 30}).withMessage("area must be min 5 and max 30 characters"),
    body("city").trim().isLength({min: 5, max: 20}).withMessage("city must be min 5 and max 20 characters"),
    body("state").trim().isLength({min: 5, max: 20}).withMessage("state must be min 5 and max 20 characters"),
    body("pincode").trim().isLength({min: 6, max: 6}).withMessage("pincode must be 6 digit"),
    body("contact").trim().isLength({min: 10, max: 10}).withMessage("contact must be 10 digit without '+91' "),
    (req, res, next)=>{
       const errors = validationResult(req);
       if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: "Fill the fields carefully"
        })
       }
       next();
    }
]

module.exports = profileUpdateFieldsValidator;
