'use strict';

//MODEL
const userModel = require('../models/user');
const {apiSuccess, apiError} = require('../common/method');

exports.getUserList = async function (req, res, next) {
    try {
        const register = await userModel.sendMail();
        console.log("register ===>", register);
        apiSuccess(res, register);
    } catch (error) {
        console.log("error======>", error);
        apiError(res,error.status,error.error,error.message);
    }   
}

exports.register = async function (req, res) {
    try {
        const { username, email, password } = req.body
        const register = await userModel.register(username, email, password);
        apiSuccess(res, register);
    } catch (error) {
        console.log("error in controller ===> ", error);
        apiError(res,error.status,error.error,error.message);
    }
}

exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const login = await userModel.login(email, password);
        apiSuccess(res, login);
    } catch (error) {
        console.log("error in controller ===> ", error);
        apiError(res,error.status,error.error,error.message);
    }
}