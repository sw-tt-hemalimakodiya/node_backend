'use strict';
const Users = require('../schema/users');

exports.register = async function (req, res, next) {
    try {
        const reqBody = req.body
        console.log("reqBody ====>", reqBody);
        console.log("password ====>", reqBody.password.length);
        const checkEmailValidation = await Users.find({ "email": reqBody.email, isDeleted: 0 });
        console.log("checkEmailValidation ===> ", checkEmailValidation);
        if (checkEmailValidation.length > 0) {
            console.log("Inside if =====>");
            return Promise.reject({ status: 200, error: 1, message: "MESSAGES.USER_EXISTS" });
        } else {
            console.log("Inside Else ====>");
            // create user model
            //let user = await this.createNewUser(reqBody);
            let user = new Users({
                username: reqBody.username,
                email: reqBody.email,
                password: reqBody.password
            });
            await user.setPassword(reqBody.password);
            let result = await user.save();
            if (result) {
                // let token = await this.authTokenGenerate(result._id);
                // let updatedUser = await Users.findByIdAndUpdate(result._id, { authToken: token }, { new: true }).select('+hash');
                // let access_token = authenticate.encode(updatedUser);
                // result.authToken = access_token;

                // var emailObj = {
                //     receiverName: result.firstname+' '+result.lastname,
                //     email: result.email
                // }
                // var template = commonMethods.getEmailTemplate('userRegister', emailObj);
                // commonMethods.sendMail([result.email], template.subject, template.template,[], function(err, data) {});
                return Promise.resolve(result);
            } else {
                return Promise.reject({ status: 200, error: 1, message: "MESSAGES.USER_NOT_ADDED" });
            }
        }
    } catch (error) {

    }
}