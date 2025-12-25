const { body } = require('express-validator');

const registerValidation = [
   body('fullname').trim().isLength({min:8}).withMessage('Fullname must be at least 5 characters'),
   body('email').trim().isEmail().withMessage('Invalid email address'),
   body('password').trim().isLength({min:5}).withMessage('Password must be at least 5 characters'),
];
module.exports = registerValidation;

