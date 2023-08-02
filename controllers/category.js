'use strict';

//MODEL
const categoryModel = require('../models/category');
const {apiSuccess, apiError} = require('../common/method');

exports.categoryList = async function (req, res, next) {
    try {
        const response = await categoryModel.categoryList(req.headers);
        apiSuccess(res, response);
    } catch (error) {
        console.log("error======>", error);
        apiError(res,error.status,error.error,error.message);
    }   
}

exports.categoryById = async function (req, res, next) {
    try {
        const response = await categoryModel.categoryById(req.params, req.headers);
        apiSuccess(res, response);
    } catch (error) {
        console.log("error======>", error);
        apiError(res,error.status,error.error,error.message);
    }   
}

exports.addCategory = async function (req, res, next) {
    try {
        const response = await categoryModel.addCategory(req.body, req.headers);
        apiSuccess(res, response);
    } catch (error) {
        console.log("error======>", error);
        apiError(res,error.status,error.error,error.message);
    }   
}

exports.editCategory = async function (req, res, next) {
    try {
        const response = await categoryModel.editCategory(req.params, req.body, req.headers);
        apiSuccess(res, response);
    } catch (error) {
        console.log("error======>", error);
        apiError(res,error.status,error.error,error.message);
    }   
}

exports.deleteCategory = async function (req, res, next) {
    try {
        const response = await categoryModel.deleteCategory(req.params, req.headers);
        apiSuccess(res, response);
    } catch (error) {
        console.log("error======>", error);
        apiError(res,error.status,error.error,error.message);
    }   
}
