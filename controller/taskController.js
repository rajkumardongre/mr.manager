const Employee = require("../model/Employee.model")

const addTask = (req, res, next) => {
    const id = req.EmployeeID
    Employee.findById(id, (err, docs) => {
        if (err){
            console.log(err)
            res.send(err)
        } else {
            console.log(docs)
            docs.tasks.push({
                description: req.body.description,
                taskType: req.body.taskType,
                startTime : new Date(req.body.startTime),
                minutes: parseInt(req.body.minutes),
            })
            Employee.findByIdAndUpdate(id, docs, {new : true}, (err, updatedEmp) => {
                if (err) {
                    console.log(err)
                    // res.send(err)
                    res.redirect("/task/add")
                } else {
                    console.log(updatedEmp)
                    res.redirect("/task/add")
                    // res.send(updatedEmp)
                }
            })
        }
    })
}

const removeTask = (req, res, next) => {
    const id = req.EmployeeID
    Employee.findById(id, (err, docs) => {
        if (err){
            console.log(err)
            res.send(err)
        } else {
            console.log(docs)
            const updatedTask = docs.tasks.filter(task => task._id != req.params.id)
            docs.tasks = updatedTask
            Employee.findByIdAndUpdate(id, docs, {new : true}, (err, updatedEmp) => {
                if (err) {
                    console.log(err)
                    // res.send(err)
                    res.redirect("/task/add")
                } else {
                    console.log(updatedEmp)
                    res.redirect("/task/add")
                    // res.send(updatedEmp)
                }
            })
        }
    })
}


module.exports = {
    addTask,
    removeTask
}