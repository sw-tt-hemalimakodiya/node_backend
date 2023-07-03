const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    username: { type: String, required: true, trim: true }, 
    employee_code: { type: String, required: true, trim: true, unique: true }, 
    email: { type: String, required: true, trim: true, unique: true }, 
    contact_no: { type: String, required: true, trim: true }, 
    dob: { type: Date, required: true, trim: true }, 
    //profile: { type: String, required: true, trim: true }, 
    gender: { type: String, required: true, trim: true }, 
    joining_date: { type: Date, required: true, trim: true }, 
    experience : { type: String, required: true},
    status: { type: String, required: true },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now }
});

const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;