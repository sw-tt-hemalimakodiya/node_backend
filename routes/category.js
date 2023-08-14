'use strict';
const router = require('express').Router();
const { validateCategory } = require('../common/validation')

var categoryController = require('../controllers/category');

router.get('/list', categoryController.categoryList);

router.get('/categoryById', categoryController.categoryById);

router.post('/', validateCategory, categoryController.addCategory);

router.put('/', validateCategory, categoryController.editCategory);

router.delete('/',  categoryController.deleteCategory);

module.exports = router;