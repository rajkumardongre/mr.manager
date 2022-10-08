const mongoose = require('mongoose');
const { isEmail } = require('validator');

const adminSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: [true, 'Please enter an email'],
    },
    
    password: {
        type: String,
        required : true
    }
})


const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;