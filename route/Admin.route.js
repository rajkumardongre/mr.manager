// Importing express module
const express=require("express")
const router = express.Router()

const adminController = require("../controller/Admin.controller")

// Handling request using router


// Create a Employee
router.post("/add", adminController.addEmployee)

// Read All Employees
router.get("/all/employees", adminController.getAllEmployees)

// Get Employee With ID
router.get("/:id", adminController.getEmployeeWithID)

router.put("/:id", adminController.updateEmployeeWithID)

// Importing the router
module.exports=router
