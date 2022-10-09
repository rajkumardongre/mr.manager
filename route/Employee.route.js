// Importing express module
const { render } = require("ejs")
const express=require("express")
const router = express.Router()

const employeeController = require("../controller/Employee.controller")


// Get Employee With ID
router.get("/me", employeeController.getEmployeeWithID)

router.post("/edit", employeeController.updateEmployeeWithID)

router.get("/graph", employeeController.employeeGraph)

router.post("/graph", employeeController.employeeGraphPost)

router.get("/edit", employeeController.editEmployee)

router.get("/", (req, res) => {
	res.render("employee_home")
})

// Importing the router
module.exports=router
