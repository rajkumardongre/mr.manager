const Employee = require("../model/Employee.model")

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    // console.log(year)
    return [year, month, day].join('-');
}

const adminHome = (req, res, next) => {
    Employee.find({}).exec((err, docs) => {
        if (err) {
            console.log(err)
            res.redirect("/login")
        } else {
            console.log(docs)
            let activeEmployee = 0
            let deactiveEmployee = 0
            for (let i = 0; i < docs.length; i++){
                if (docs[i].isActive) {
                    activeEmployee++
                } else {
                    deactiveEmployee++
                }
            }
            res.render("admin_home", { activeEmployee, deactiveEmployee})
        }
    });
}

const addEmployee = (req, res, next) => {
	
    Employee.init().then(() => {
        // safe to create users now.
        var new_employee = new Employee({
            name: req.body.name,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            department : req.body.department,
            password: req.body.password,
            joiningDate : new Date(req.body.joiningDate)
        })
        new_employee.save(function(err,result){
            if (err) {
                console.log(err);
                if (err.code == 11000) {
                    res.render("admin_addEmployee", {msg : "Employee already exist with same Email"})
                }
            }
            else{
                console.log(result)
                // res.send(result)
                res.redirect("/admin/add")
            }
        })
     });
}

const getActiveEmployees = async (req, res, next) => {
    const filter = {
        'isActive': {
            $eq: true
        }
    }
    Employee.find({}).where(filter).exec((err, docs) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(docs)
            res.render("admin_activeEmployeeList", {employees : docs})
            // res.json(docs)
        }
    });
}

const getDeactiveEmployees = async (req, res, next) => {
    const filter = {
        'isActive': {
            $eq: false
        }
    }
    Employee.find({}).where(filter).exec((err, docs) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(docs)
            res.render("admin_deactiveEmployeeList", {employees : docs})
            // res.json(docs)
        }
    });
}

const findActiveEmployeeWithName = (req, res, next) => {
    const filter = {
        'isActive': {
            $eq: true
        }
    }
    const nameQuery = req.body.name;
    Employee.find({ name: { $regex: nameQuery, $options: '$i' } }).where(filter).exec((err, docs) => {
        if (err) {
            console.log(err)
            // res.send(err)
            res.redirect("/login")
        } else {
            console.log(docs)
            res.render("admin_activeEmployeeList", {employees : docs})
            // res.json(docs)
        }
    });
}

const findDeactiveEmployeeWithName = (req, res, next) => {
    const filter = {
        'isActive': {
            $eq: false
        }
    }
    const nameQuery = req.body.name;
    Employee.find({ name: { $regex: nameQuery, $options: "$i" } }).where(filter).exec((err, docs) => {
        if (err) {
            console.log(err)
            // res.send(err)
            res.redirect("/login")
        } else {
            console.log(docs)
            res.render("admin_deactiveEmployeeList", {employees : docs})
            // res.json(docs)
        }
    });
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

const deactivateEmployeeWithID = (req, res, next) => {
    var employee_id = req.params.id;
    const updatedEmployee = {
        isActive : false
    }
    Employee.findByIdAndUpdate(employee_id, updatedEmployee,{returnDocument: 'after'}, function (err, docs) {
        if (err){
            console.log(err)
            // res.send(err)
            res.redirect("/admin/active/employees")
        }
        else {
            console.log("Updated User : ", docs);
            if (docs == null) {
                // res.send({})
            res.redirect("/admin/active/employees")

            } else {
                // res.send(docs)
            res.redirect("/admin/active/employees")

            }
        }
    });
}

const activateEmployeeWithID = (req, res, next) => {
    var employee_id = req.params.id;
    const updatedEmployee = {
        isActive : true
    }
    Employee.findByIdAndUpdate(employee_id, updatedEmployee,{returnDocument: 'after'}, function (err, docs) {
        if (err){
            console.log(err)
            // res.send(err)
            res.redirect("/admin/deactive/employees")
        }
        else {
            console.log("Updated User : ", docs);
            if (docs == null) {
                // res.send({})
            res.redirect("/admin/deactive/employees")

            } else {
                // res.send(docs)
            res.redirect("/admin/deactive/employees")

            }
        }
    }); 
}

const analysisOf1Day = async(id, date) => {
    let workTime = 0
    let breakTime = 0
    let meetTime = 0
    // const id = req.EmployeeID;
    
    const employee = await Employee.findById(id)
    const reqDay = new Date(date)
    const reqDayTask = employee.tasks.filter(task => task.startTime.toDateString() == reqDay.toDateString())
    for (let i = 0; i < reqDayTask.length; i++){
        if (reqDayTask[i].taskType == "Work") {
            workTime +=reqDayTask[i].minutes
        }
        else if (reqDayTask[i].taskType == "Meeting") {
            meetTime += reqDayTask[i].minutes
        }
        else if (reqDayTask[i].taskType == "Break") {
            breakTime += reqDayTask[i].minutes
        }
    }
    console.log(workTime, breakTime, meetTime)
    const totalMinutes = workTime + breakTime + meetTime
    const workPercentage = Math.floor(workTime/totalMinutes * 100)
    const breakPercentage = Math.floor(breakTime / totalMinutes * 100)
    const meetPercentage = Math.floor(meetTime / totalMinutes * 100)

    return { workPercentage : workPercentage || 0, breakPercentage : breakPercentage || 0, meetPercentage : meetPercentage || 0}
}

const last7DaysAnalysis = async(id) => {
    
    // const id = req.EmployeeID;
    
    const employee = await Employee.findById(id)

    const last7Days = []

    for (let i = 0; i < 7; i++){
        let workTime = 0
        let breakTime = 0
        let meetTime = 0
        let reqDay = new Date()
        reqDay.setDate(reqDay.getDate() - i)
        const reqDayTask = employee.tasks.filter(task => task.startTime.toDateString() == reqDay.toDateString())
        for (let i = 0; i < reqDayTask.length; i++){
            if (reqDayTask[i].taskType == "Work") {
                workTime +=reqDayTask[i].minutes
            }
            else if (reqDayTask[i].taskType == "Meeting") {
                meetTime += reqDayTask[i].minutes
            }
            else if (reqDayTask[i].taskType == "Break") {
                breakTime += reqDayTask[i].minutes
            }
        }
        const totalMinutes = workTime + breakTime + meetTime
        let workPercentage = Math.floor(workTime/totalMinutes * 100) || 0
        let breakPercentage = Math.floor(breakTime / totalMinutes * 100) || 0
        let meetPercentage = Math.floor(meetTime / totalMinutes * 100) || 0


        last7Days.push( { workPercentage : workPercentage , breakPercentage : breakPercentage, meetPercentage : meetPercentage })
    }

    return last7Days
}

const employeeGraph = async (req, res, next) => {
    const currDay = new Date()
    if (req.body.date != null) {
        currDay = new Date(req.body.date)
    }
    const currentDayAnalysis = await analysisOf1Day(req.EmployeeID, currDay)
    let prevDate = currDay
    prevDate.setDate(prevDate.getDate() - 1)
    const prevDayAnalysis = await analysisOf1Day(req.EmployeeID, prevDate)
    const last7Days = await last7DaysAnalysis(req.EmployeeID)
    console.log(currentDayAnalysis)
    console.log(prevDayAnalysis)
    console.log(last7Days)
    res.render("employee_graph", {currentDayAnalysis, prevDayAnalysis, last7Days})

}

const employeeGraphPost = async (req, res, next) => {
    const currDay = new Date(req.body.date)

    const currentDayAnalysis = await analysisOf1Day(req.EmployeeID, currDay)
    let prevDate = currDay
    prevDate.setDate(prevDate.getDate() - 1)
    const prevDayAnalysis = await analysisOf1Day(req.EmployeeID, prevDate)
    const last7Days = await last7DaysAnalysis(req.EmployeeID)
    console.log(currentDayAnalysis)
    console.log(prevDayAnalysis)
    console.log(last7Days)
    res.render("employee_graph", {currentDayAnalysis, prevDayAnalysis, last7Days})

}

const getEmployeeWithID = async (req, res, next) => {
    const employee = await Employee.findById(req.params.id)
    if (employee) {
        const currDay = new Date()
        if (req.body.date != null) {
            currDay = new Date(req.body.date)
        }
        const currentDayAnalysis = await analysisOf1Day(employee._id, currDay)
        let prevDate = currDay
        prevDate.setDate(prevDate.getDate() - 1)
        const prevDayAnalysis = await analysisOf1Day(employee._id, prevDate)
        const last7Days = await last7DaysAnalysis(employee._id)
        console.log(currentDayAnalysis)
        console.log(prevDayAnalysis)
        console.log(last7Days)
        // res.send(employee)
        res.render("admin_employeeProfile", {employee, currentDayAnalysis, prevDayAnalysis, last7Days, searchByDateAnalysis:null, searchDate : null})
    } else {
        // res.send({})
        res.redirect("/login")
    }
}

const getEmployeeWithIDpost = async (req, res, next) => {
    const employee = await Employee.findById(req.params.id)
    if (employee) {
        const currDay = new Date(req.body.date)
        const searchByDateAnalysis = await analysisOf1Day(req.params.id, currDay)
        const currentDayAnalysis = await analysisOf1Day(req.params.id, new Date())
        let prevDate = new Date()
        prevDate.setDate(prevDate.getDate() - 1)
        const prevDayAnalysis = await analysisOf1Day(req.params.id, prevDate)
        const last7Days = await last7DaysAnalysis(req.params.id)
        console.log(currentDayAnalysis)
        console.log(prevDayAnalysis)
        console.log(last7Days)
        res.render("admin_employeeProfile", {employee, currentDayAnalysis, prevDayAnalysis, last7Days, searchByDateAnalysis, searchDate: currDay})   
    } else {
        res.redirect("/login")
    }
    

}

module.exports = {
    addEmployee,
    getActiveEmployees,
    getDeactiveEmployees,
    getEmployeeWithID,
    deactivateEmployeeWithID,
    getEmployeeWithIDpost,
    activateEmployeeWithID,
    updateEmployeeWithID,
    adminHome,
    findActiveEmployeeWithName,
    findDeactiveEmployeeWithName
}