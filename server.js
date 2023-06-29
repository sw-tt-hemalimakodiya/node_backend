const express = require('express')
const bodyParser = require("body-parser");
const  { PORT } = process.env
const { initPool } = require("./common/db")
const { errorHandler } = require("./common/middleware")

//set of app use
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Expose-Headers", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

//initialize DB connection
app.initDb = async (poolPromise) => { app.pool = await initPool(poolPromise) }

require('./routes/employees')(app)

// error handler
app.use(errorHandler)

Promise.all([app.initDb(null)]).then(function () {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })
})