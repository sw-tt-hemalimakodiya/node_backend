const express = require('express');
require('dotenv').config();
const  { PORT } = process.env;
const { initPool } = require('./common/database');
const cors = require('cors');
const { verifyToken } = require('./common/method')

//set of app use
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

//Verify token on each request.
app.use(verifyToken)

//initialize DB connection
app.initDb = async (poolPromise) => { app.pool = await initPool(poolPromise) }

require('./routes/index')(app)

Promise.all([app.initDb(null)]).then(function () {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })
})