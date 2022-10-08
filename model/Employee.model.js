const mongoose = require('mongoose');
const { isEmail } = require('validator');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required : true
    },
    taskType: {
        type: String,
        required : true
    },
    startTime: {
        type: Date,
        default: Date.now,
        required : true
    },
    minutes: {
        type: Number,
        required : true
    }
})

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    contactNumber: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: Date,
        required: true,
        default : Date.now
    },
    password: {
        type: String,
        required : true
    },
    isAdmin: {
        type: Boolean,
        default : false
    },
    isActive: {
        type: Boolean,
        default : true
    },
    tasks: [taskSchema]

})

employeeSchema.statics.login = async function(email, password) {
    const employee = await this.findOne({ email });
    if (employee) {
      // const auth = await bcrypt.compare(password, user.password);
      const auth = password == employee.password;
      if (auth) {
        return employee;
      }
    //   throw Error('incorrect password');
        return null
    }
    // throw Error('incorrect email');
    return null
  };
  


const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;