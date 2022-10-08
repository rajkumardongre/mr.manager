// Importing express module
const express=require("express")
const router = express.Router()

const taskController = require("../controller/taskController")

// Handling request using router


// Create a Task
router.post("/add/:id", taskController.addTask)

// Read All Employees
// router.get("/all/employees", employeeController.getAllEmployees)

// Get Employee With ID
// router.get("/:id", employeeController.getAllEmployeeWithID)

// router.put("/:id", employeeController.updateEmployeeWithID)

// Importing the router
module.exports=router
