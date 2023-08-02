'use strict';
const Users = require('../schema/users');
const { authTokenGenerate, encode, sendMail} = require('../common/method');
const emailTemplates = require('../common/emailTemplates');

exports.register = async (req) => {
    try {
        const {username, email, password} = req.body
        const checkUserExist = await Users.find({ email, isDeleted: 0 });
        if (checkUserExist.length > 0) 
            return Promise.reject({ status: 401, error: 1, message: "MESSAGES.USER_EXISTS" });
        
        let user = new Users({ username, email, password });
        await user.setPassword(password);
        let result = await user.save();
        if (result) {
            let token = await authTokenGenerate(result._id);
            let updatedUser = await Users.findByIdAndUpdate(result._id, { authToken: token }, { new: true }).select('+password');
            result.authToken = encode(updatedUser);

            let { subject, template} = emailTemplates.TEMPLATES['userRegister'];
            let arrayCont = {Name:"", Your_Company_Name:""};
            arrayCont['Name'] = username;
            arrayCont['Your_Company_Name'] = "Tchnoapps development";
            for (let key in arrayCont) {
                console.log("key ===>", key);
                template = (template).replace(new RegExp('{{' + key + '}}', "g"), arrayCont[key])
            }
            //console.log("template ====> ", template);
            await sendMail([email], subject, template)
            return Promise.resolve(result);
        } else {
            return Promise.reject({ status: 402, error: 1, message: "MESSAGES.USER_NOT_ADDED" });
        }
    } catch (error) {
        return Promise.reject({ status: 500, error, message: "Internal server errror" });
    }
}

exports.login = async (req) => {
    try {
        const {email, password} = req.body;
        const response = await Users.findOne({ email, isDeleted:0 }).select('+password');
        if (!response){
            return Promise.reject({ status: 401, message : "MESSAGES.Invalid email"});
        }
        if (!response.validPassword(password)){
            return Promise.reject({ status: 401, message : "MESSAGES.Invalid Password"});
        }
        response.authToken = encode(response);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject({ status: 500, error, message: "Internal server errror" });
    }
}