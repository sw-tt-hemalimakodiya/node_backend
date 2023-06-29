let config = {}

config.PORT = 5000
config.MONGODB_URL = "mongodb://localhost:27017"
config.JWT_TOKEN_SECRET = "hemali@token"
config.TOKEN_EXPIRE_TIME = 60 * 2//in form of seconds (1 hour = 60*60)
config.SESSION_SECRET = "hemali@makodiya"
config.SALT = 10    

config.AWS_BUCKET_NAME = "nodejs-project",
config.AWS_BUCKET_REGION = "ap-south-1",
config.AWS_ARN = "arn:aws:s3:::nodejs-project",
config.AWS_ACCESS_KEY = "AKIAXPWFSNVDZ4YVKR7H",
config.AWS_SECRET_KEY = "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",
config.AWS_PRODUCT_PATH = "products",
config.AWS_BASE_URL = `https://${config.AWS_BUCKET_NAME}.s3.${config.AWS_BUCKET_REGION}.amazonaws.com`   //https://nodejs-project.s3.ap-south-1.amazonaws.com/products/hair/space.jpg

module.exports = config