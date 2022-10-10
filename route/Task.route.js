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
        let currDate = new Date()
        let year = currDate.getFullYear()
        let month = (currDate.getMonth() + 1)+""
        let date = currDate.getDate()+""
        let hour = currDate.getHours()+""
        let minutes = currDate.getMinutes() + ""
        hour = hour.length==1 ? "0"+hour : hour
        minutes = minutes.length == 1 ? "0" + minutes : minutes
        month = month.length == 1 ? "0" + month : month
        date = date.length==1 ? "0"+date : date
        let resMax = [year, month, date].join("-")
        resMax = resMax+"T"+hour+":"+minutes
        // res.send(employee)
        res.render("employee_addTask", {employee,maxDate:resMax})
    } else {
        res.render("employee_addTask", { employee : {} })
    }
})

// Delete A Task
router.get("/delete/:id", taskController.removeTask)


// Importing the router
module.exports=router
