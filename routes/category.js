'use strict';
const router = require('express').Router();
const { validateCategory } = require('../common/validation')

var categoryController = require('../controllers/category');

router.get('/list', categoryController.categoryList);

router.get('/categoryById/:id', categoryController.categoryById);

router.post('/', validateCategory, categoryController.addCategory);

router.put('/:id', validateCategory, categoryController.editCategory);

router.delete('/:id',  categoryController.deleteCategory);

module.exports = router;