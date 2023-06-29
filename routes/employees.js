const Employee = require('../model/employees')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage });

module.exports = app => {
    app.post('/demo', upload.single('file'), async (req, res, next) => {
        try {
            console.log("Inside demo endpoint");
            res.status(200).json({name:"Hemali"})
        } catch (error) {
            next(error)
        }
    })

    app.get('/employee', async (req, res, next) => {
        try {
            const result = await Employee.find();
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })

    app.get('/employee/:id', async (req, res, next) => {
        try {
            const result = await Employee.findById(req.params.id);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })

    //app.post('/employee', upload.single('file'), async (req, res, next) => {
    app.post('/employee', async (req, res, next) => {
        try {
            console.log("Adding employee ===>", req.body);
            // req.body.profile = req.file.path.replace(/\\/g, "\\");
            // console.log("Inside post endpoint ===> ", JSON.stringify(req.body));
            const result = await Employee.create(req.body);
            res.status(200).json(result)
        } catch (error) {
            console.log("Inside catch====", error);
            next(error)
        }
    })
    
    app.put('/employee/:id', async (req, res, next) => {
        try {
            const result = await Employee.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    });

    app.delete('/employee/:id', async (req, res, next) => {
        try {
            const result = await Employee.findByIdAndRemove(req.params.id);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    });
}
