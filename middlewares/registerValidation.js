const { body, validationResult } = require('express-validator');

const registerValidation = [
   body('fullname').trim().isLength({min:5}).withMessage('Fullname must be at least 5 characters'),
   body('email').trim().isEmail().withMessage('Invalid email address'),
   body('password').trim().isLength({min:5}).withMessage('Password must be at least 5 characters'),
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
];
module.exports = registerValidation;

