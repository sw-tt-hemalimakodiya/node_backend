'use strict';
const router = require('express').Router();
const { validateCategory } = require('../common/validation')

var categoryController = require('../controllers/category');

router.get('/', categoryController.categoryList);

router.get('/:id', categoryController.categoryById);

router.post( '/', validateCategory, categoryController.addCategory);

router.put('/:id', validateCategory, categoryController.editCategory);

router.delete('/:id',  categoryController.deleteCategory);

module.exports = router;