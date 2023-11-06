'use strict';
const mongoose = require('mongoose');
const categorySchema = require('../schema/category');
const {CATEGORY} = require("./../common/messages")

exports.categoryList = (headers) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await categorySchema.find({isDeleted:0}).sort({createdAt: -1});
            resolve(response)
        } catch (error) {
            reject({ status: 500, error, message: "Internal server errror" });
        }
    });
}

exports.categoryById =  (id, headers) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await categorySchema.findById(id)
            resolve(response)
        } catch (error) {
            reject({ status: 500, error, message: "Internal server errror" });
        }
    });
}

exports.addCategory =  (body, filePath) => {
    return new Promise(async (resolve, reject) => {
        try {
            body.status = JSON.parse(body.status);
            body.imagePath = filePath;
            const categoryData = new categorySchema(body);
            const response = await categoryData.save();
            resolve(response)
        } catch (error) {
            reject({ status: 500, error, message: "Internal server errror" });
        }
    });
}

exports.editCategory = (id, body, headers) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await categorySchema.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id), isDeleted:0}, {$set: body})
            if (response) {
                resolve(response)
            } else {
                reject({ status: 401, error: 1, message: "Internal server errror" });
            }
            
        } catch (error) {
            reject({ status: 500, error, message: "Internal server errror" });
        }
    });
}

exports.deleteCategory =  (id, headers) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await categorySchema.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id), isDeleted:0}, {$set: {isDeleted:1}})
            resolve(response)
        } catch (error) {
            reject({ status: 500, error, message: "Internal server errror" });
        }
    });
}