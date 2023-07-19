
const { validationResult, body } = require('express-validator');

displayError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
    next();
}

exports.validateUser = [
    body('username').notEmpty().withMessage("Username is required"), 
    body('email').notEmpty().withMessage("Email is required"), 
    body('email').isEmail().withMessage("Please enter valid email"), 
    body('password').notEmpty().withMessage("Password is required"), 
    body('password').isLength({ min: 6 }).withMessage("Password min length 6"),
    displayError,
]

exports.validateUserLogin = [
    body('email').notEmpty().withMessage("Email is required"), 
    body('email').isEmail().withMessage("Please enter valid email"), 
    body('password').notEmpty().withMessage("Password is required"), 
    body('password').isLength({ min: 6 }).withMessage("Password min length 6"),
    displayError,
]
