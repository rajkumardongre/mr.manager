// Importing express module
const express=require("express")
const router = express.Router()

const employeeController = require("../controller/employeeController")

// Handling request using router


// Create a Employee
router.post("/add", employeeController.addEmployee)

// Read All Employees
router.get("/all/employees", employeeController.getAllEmployees)

// Get Employee With ID
router.get("/:id", employeeController.getAllEmployeeWithID)

router.put("/:id", employeeController.updateEmployeeWithID)

// Importing the router
module.exports=router
