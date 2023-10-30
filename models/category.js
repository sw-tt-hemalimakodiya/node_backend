'use strict';
const mongoose = require('mongoose');
const categorySchema = require('../schema/category');
const {CATEGORY} = require("./../common/messages")

exports.categoryList = async (headers) => {
    try {
        const response = categorySchema.find({isDeleted:0}).sort({createdAt: -1});
        return Promise.resolve(response)
    } catch (error) {
        return Promise.reject({ status: 500, error, message: "Internal server errror" });
    }
}

exports.categoryById = async (query, headers) => {
    try {
        const {id} = query
        const response = categorySchema.findById(id)
        return Promise.resolve(response)
    } catch (error) {
        return Promise.reject({ status: 500, error, message: "Internal server errror" });
    }
}

exports.addCategory = async (body, headers) => {
    try {
        const categoryData = new categorySchema(body);
        const response = categoryData.save();
        return Promise.resolve(response)
    } catch (error) {
        return Promise.reject({ status: 500, error, message: "Internal server errror" });
    }
}

exports.editCategory = async (query, body, headers) => {
    try {
        const {id} = query
        const response = categorySchema.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id), isDeleted:0}, {$set: body})
        if (response) {
            return Promise.resolve(response)
        } else {
            return Promise.reject({ status: 401, error: 1, message: "Internal server errror" });
        }
        
    } catch (error) {
        return Promise.reject({ status: 500, error, message: "Internal server errror" });
    }
}

exports.deleteCategory = async (query, headers) => {
    try {
        const {id} = query;
        const response = categorySchema.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id), isDeleted:0}, {$set: {isDeleted:1}})
        return Promise.resolve(response)
    } catch (error) {
        return Promise.reject({ status: 500, error, message: "Internal server errror" });
    }
}