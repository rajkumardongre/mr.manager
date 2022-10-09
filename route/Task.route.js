// Importing express module
const express=require("express")
const router = express.Router()
const Employee = require("../model/Employee.model")

const taskController = require("../controller/taskController")

// Handling request using router


// Create a Task
router.post("/add", taskController.addTask)
router.get("/add", async (req, res) => {
    const employee = await Employee.findById(req.EmployeeID)
    if (employee) {
        // res.send(employee)
        res.render("employee_addTask", {employee})
    } else {
        res.render("employee_addTask", { employee : {} })
    }
})

// Delete A Task
router.get("/delete/:id", taskController.removeTask)


// Importing the router
module.exports=router
