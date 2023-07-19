'use strict';
const router = require('express').Router();

var userController = require('../controllers/user');
const { validateUser, validateUserLogin } = require('../common/validation')

router.get('/', userController.getUserList);

router.post( '/register', validateUser, userController.register);

router.post('/login', validateUserLogin, userController.login);

module.exports = router;