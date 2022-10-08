const Employee = require("../model/Employee.model")

const addEmployee = (req, res, next) => {
	let isAdmin = false
	if (req.body.isAdmin == "true") {
		isAdmin = true
	}
	
    Employee.init().then(() => {
        // safe to create users now.
        var new_employee = new Employee({
            name: req.body.name,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            department : req.body.department,
            password : req.body.password,
            isAdmin : isAdmin
        })
        new_employee.save(function(err,result){
            if (err){
                console.log(err);
                res.send(err)
            }
            else{
                console.log(result)
                res.send(result)
            }
        })
     });
}

const getAllEmployees = async (req, res, next) => {
    const filter = {
        'isAdmin': {
            $eq: false
        }
    }
    Employee.find({}).where(filter).exec((err, docs) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(docs)
            res.json(docs)
        }
    });
}

const getEmployeeWithID = async (req, res, next) => {
    const employee = await Employee.findById(req.params.id)
    if (employee) {
        res.send(employee)
    } else {
        res.send({})
    }
}

const updateEmployeeWithID = (req, res, next) => {
    var employee_id = req.params.id;
    const updatedEmployee = {
        name: req.body.name,
        password: req.body.password,
        contactNumber: req.body.contactNumber,
        department: req.body.department
    }
    Employee.findByIdAndUpdate(employee_id, updatedEmployee,{returnDocument: 'after'}, function (err, docs) {
        if (err){
            console.log(err)
            res.send(err)
        }
        else {
            console.log("Updated User : ", docs);
            if (docs == null) {
                res.send({})
            } else {
                res.send(docs)
            }
        }
    });
}



module.exports = {
    addEmployee,
    getAllEmployees,
    getEmployeeWithID,
    updateEmployeeWithID
}