
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
var privateKey = process.env.JWT_SECRET_KEY;
var expireIn = process.env.JWT_EXPIRES_IN;

exports.authTokenGenerate = (userId) => {
    return jwt.sign({ user: userId }, "Stack", {
      expiresIn: "365d" // expires in 365 days
    });
}

exports.encode = (payload) => {
  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(payload), privateKey).toString();
  let token = jwt.sign({data : ciphertext}, privateKey, { algorithm: 'HS256',expiresIn: expireIn});
  return token;
}

exports.decode = (token) => {
  let decoded = jwt.decode(token, { complete: true });
  let bytes  = CryptoJS.AES.decrypt(decoded.payload.data, privateKey);
  let payload = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return payload;
}

exports.apiSuccess = function(res, response) {
  return res.status(200).json({status:200, data: response});
}

exports.apiError = function(res,status = 500, error = null, message = "Something went wrong! Please try again") {
  return res.status(status).json(error);
}