'use strict';
const Users = require('../schema/users');
const { authTokenGenerate, encode, sendMail } = require('../common/method');
const emailTemplates = require('../common/emailTemplates');

exports.register = async (username, email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUserExist = await Users.find({ email, isDeleted: 0 });
            if (checkUserExist.length > 0)
                reject({ status: 401, error: 1, message: "MESSAGES.USER_EXISTS" });

            let user = new Users({ username, email, password });
            await user.setPassword(password);
            let result = await user.save();
            if (result) {
                let token = await authTokenGenerate(result._id);
                let updatedUser = await Users.findByIdAndUpdate(result._id, { authToken: token }, { new: true }).select('+password');
                result.authToken = encode(updatedUser);

                let { subject, template } = emailTemplates.TEMPLATES['userRegister'];
                let arrayCont = { Name: "", Your_Company_Name: "" };
                arrayCont['Name'] = username;
                arrayCont['Your_Company_Name'] = "Tchnoapps development";
                for (let key in arrayCont) {
                    template = (template).replace(new RegExp('{{' + key + '}}', "g"), arrayCont[key])
                }
                await sendMail([email], subject, template)
                resolve(result);
            } else {
                reject({ status: 402, error: 1, message: "MESSAGES.USER_NOT_ADDED" });
            }
        } catch (error) {
            reject(error)
        }
    });
}

exports.login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Users.findOne({ email, isDeleted: 0 }).select('+password');
            if (!response) {
                reject({ status: 401, message: "MESSAGES.Invalid email" });
            }
            if (!response.validPassword(password)) {
                reject({ status: 401, message: "MESSAGES.Invalid Password" });
            }
            response.authToken = encode(response);
            resolve(response);
        } catch (error) {
            reject({ status: 500, error, message: "Internal server errror" });
        }
    });
}