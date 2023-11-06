'use strict';
const router = require('express').Router();
const { validateCategory } = require('../common/validation')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

const categoryController = require('../controllers/category');

router.get('/list', categoryController.categoryList);

router.get('/categoryById/:id', categoryController.categoryById);

router.post('/', upload.single('image'), categoryController.addCategory);

router.put('/:id', validateCategory, categoryController.editCategory);

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;