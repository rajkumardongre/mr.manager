const Employee = require("../model/Employee.model")

const addTask = (req, res, next) => {
    const id = req.params.id
    Employee.findById(id, (err, docs) => {
        if (err){
            console.log(err)
            res.send(err)
        } else {
            docs.tasks.push({
                description: req.body.description,
                taskType: req.body.taskType,
                minutes : req.body.minutes
            })
            Employee.findByIdAndUpdate(id, docs, {new : true}, (err, updatedEmp) => {
                if (err) {
                    console.log(err)
                    res.send(err)
                } else {
                    console.log(updatedEmp)
                    res.send(updatedEmp)
                }
            })
        }
    })
}


module.exports = {
    addTask
}