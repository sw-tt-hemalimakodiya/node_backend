module.exports = {
    errorHandler: (err, req, res, next) => {
        let result = { status: err.status || 500, message: err.message, error: err };
        switch (err.status) {
            case 400:
                result.title = "Bad request";
                result.error = "Bad request. Invalid input parameters";
                break;
            case 401:
                result.title = "Unauthorized";
                result.error = "Unauthorized. User id invalid or expire";
                break;
            case 500:
                result.title = "Internal server error";
                result.error = "Oops, There is server error";
                break;
            default:
                result.title = "Internal server error";
                result.error = "Oops, There is server error";
                break;
        }
        console.log("Inside middleware ====>", result);
        res.status(result.status || 500).send(result);
    }
}