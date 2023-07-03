'use strict';
const router = require('express').Router();

var userController = require('../controllers/user');

const { validationResult, ValidationChain, body } = require('express-validator');

const validate = validations => {
    console.log("Inside validate");
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            console.log("Inside for loop===", result);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        console.log("errors ====>", errors);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

router.get('/', userController.getUserList);

router.post(
    '/register',
    [
        body('username').notEmpty().withMessage("Username is required"), 
        body('email').notEmpty().withMessage("Email is required"), 
        body('email').isEmail().withMessage("Please enter valid email"), 
        body('password').notEmpty().withMessage("Password is required"), 
        body('password').isLength({ min: 6 }).withMessage("Password min length 6")
    ],
    userController.register
);

router.post('/register123', validate([
    body('email').isEmpty().withMessage("Innvalid Email"),
    body('password').isLength({ min: 6 }).withMessage("Invalid Password")
]), userController.register);

module.exports = router;