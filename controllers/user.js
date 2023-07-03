'use strict';

//MODEL
const userModel = require('../models/user');
const { validationResult } = require('express-validator');

exports.getUserList = async function (req, res, next) {
    try {
        const register = await userModel.register(req);
        console.log("register ===>", register);
    } catch (error) {

    }
}

exports.register = async function (req, res, next) {
    try {
        const errors = validationResult(req);
        //console.log("errors ====>", errors);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const register = await userModel.register(req);
        console.log("register ===>", register);
    } catch (error) {

    }
}