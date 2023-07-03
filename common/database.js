const mongoose = require('mongoose');
const { MONGODB_URL, MONGO_DATABASE } = process.env;

function initPool(pool) {
    console.log("MONGODB_URL ==>", MONGODB_URL);
    return new Promise(async (resolve, reject) => {
        try {
            if (pool) {
                resolve(pool)
            } else {
                //establish connection 
                pool = await mongoose.connect(`${MONGODB_URL}/${MONGO_DATABASE}`, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                    });
                console.log("Database connected...");
                resolve(pool);
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {initPool}