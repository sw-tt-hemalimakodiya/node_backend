
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const { JWT_SECRET_KEY, JWT_EXPIRES_IN, PROJECT_NAME, SMTP_SERVICES, SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env

//=== Authentication =====
exports.authTokenGenerate = (userId) => {
    return jwt.sign({ user: userId }, "Stack", {
      expiresIn: "365d" // expires in 365 days
    });
}

exports.encode = (payload) => {
  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(payload), JWT_SECRET_KEY).toString();
  let token = jwt.sign({data : ciphertext}, JWT_SECRET_KEY, { algorithm: 'HS256',expiresIn: JWT_EXPIRES_IN});
  return token;
}

exports.decode = (token) => {
  let decoded = jwt.decode(token, { complete: true });
  let bytes  = CryptoJS.AES.decrypt(decoded.payload.data, JWT_SECRET_KEY);
  let payload = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return payload;
}

//==== Response send ===
exports.apiSuccess = function(res, response, message) {
  return res.status(200).json({status:200, data: response, message});
}

exports.apiError = function(res,status = 500, error = null, message = "Something went wrong! Please try again") {
  return res.status(status).json({ status: status, error: error, message: message });
}

//==== Send email ========
exports.sendMail = async (recipients, subject, emailBody) => {
  try {
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
        from: PROJECT_NAME + " <" + SMTP_USER + ">", // sender address
        to: recipients, // list of receivers
        subject: subject, // Subject line
        html: emailBody, // html body
    })
    console.log("info ====> ", info);
    return Promise.resolve(info)
  } catch (error) {
    return Promise.reject(error)
  }
}