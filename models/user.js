'use strict';
const Users = require('../schema/users');
const { authTokenGenerate, encode, sendMail} = require('../common/method');
const nodemailer = require("nodemailer");
const emailTemplates = require('../common/emailTemplates');
const { JWT_SECRET_KEY, JWT_EXPIRES_IN, PROJECT_NAME, SMTP_SERVICES, SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env

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

exports.sendMail = async () => {
    console.log("Inside sendMail ====> ");
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const transporter = nodemailer.createTransport({
        service: SMTP_SERVICES,
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    });

    const info = await transporter.sendMail({
        from: 'Techno apps <hml.technoapps92@gmail.com>', // sender address
        to: "hemali.makodiya@softwebsolutions.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("info ===>", JSON.stringify(info));
}