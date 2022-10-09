// Importing express module
const { render } = require("ejs")
const express=require("express")
const router = express.Router()

const adminController = require("../controller/Admin.controller")

// Handling request using router


// Create a Employee
router.post("/add", adminController.addEmployee)

router.get("/add", (req, res) => {
    res.render("admin_addEmployee", {msg : ""})
})
// Read All Employees
router.get("/active/employees", adminController.getActiveEmployees)

router.get("/deactive/employees", adminController.getDeactiveEmployees)


// Get Employee With ID
router.get("/employee/:id", adminController.getEmployeeWithID)

router.post("/employee/:id", adminController.getEmployeeWithIDpost)

router.put("/employee/:id", adminController.updateEmployeeWithID)

router.get("/employee/deactive/:id", adminController.deactivateEmployeeWithID)
router.get("/employee/active/:id", adminController.activateEmployeeWithID)

router.get("/", (req, res) => {
    res.render("admin_home")
})




// Importing the router
module.exports=router
