'use strict';

//MODEL
const categoryModel = require('../models/category');
const {apiSuccess, apiError} = require('../common/method');
const {CATEGORY} = require("./../common/messages")

exports.categoryList = async function (req, res) {
    try {
        const response = await categoryModel.categoryList(req.headers);
        apiSuccess(res, response, CATEGORY.FETCH_SUCCESS);
    } catch (error) {
        console.log("error======>", error);
        apiError(res,error.status,error.error,error.message);
    }
}

exports.categoryById = async function (req, res) {
    try {
        const response = await categoryModel.categoryById(req.params.id, req.headers);
        apiSuccess(res, response, CATEGORY.FETCH_SUCCESS);
    } catch (error) {
        console.log("error======>", error);
        apiError(res,error.status,error.error,error.message);
    }
}

exports.addCategory = async function (req, res) {
    try {
        const response = await categoryModel.addCategory(req.body, req.file.path.replace(/\\/g, '/'));
        if(response)
            apiSuccess(res, response, CATEGORY.ADD_SUCCESS);
        else
            apiError(res, 401, 1, CATEGORY.ADD_FAIL)
    } catch (error) {
        console.log("error======>", error);
        apiError(res,error.status,error.error,error.message);
    }
}

exports.editCategory = async function (req, res) {
    try {
        const response = await categoryModel.editCategory(req.params.id, req.body, req.headers);
        if (response) 
            apiSuccess(res, response, CATEGORY.UPDATE_SUCCESS);
        else
            apiError(res, 401, 1, CATEGORY.UPDATE_FAIL)
    } catch (error) {
        console.log("error======>", error);
        apiError(res,error.status,error.error,error.message);
    }
}

exports.deleteCategory = async function (req, res) {
    try {
        const response = await categoryModel.deleteCategory(req.params.id, req.headers);
        if (response) 
            apiSuccess(res, response, CATEGORY.DELETE_SUCCESS);
        else
            apiError(res, 401, 1, CATEGORY.DELETE_FAIL)
    } catch (error) {
        console.log("error======>", error);
        apiError(res,error.status,error.error,error.message);
    }
}
