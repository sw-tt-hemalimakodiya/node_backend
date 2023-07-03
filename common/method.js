
const jwt = require('jsonwebtoken');

exports.authTokenGenerate = (userId) => {
    return jwt.sign({ user: userId }, "Stack", {
      expiresIn: "365d" // expires in 365 days
    });
}