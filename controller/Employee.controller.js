const Employee = require("../model/Employee.model")

function formatDate(date) {
    var d = date
    var month = '' + (d.getMonth() + 1)
    var day = '' + d.getDate()
    var year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month,day].join('-');
  }

const getEmployeeWithID = async (req, res, next) => {
    const employee = await Employee.findById(req.EmployeeID)
    if (employee) {
        // res.send(employee)
        res.render("employee_profile", {employee})
    } else {
        res.redirect("/login")
    }
}

const editEmployee = async (req, res, next) => {
    const employee = await Employee.findById(req.EmployeeID)
    if (employee) {
        employee.joiningDate[0] = formatDate(employee.joiningDate)
        res.render("employee_edit", {employee})
    } else {
        res.redirect("/login")
    }
}


const updateEmployeeWithID = (req, res, next) => {
    var employee_id = req.EmployeeID;
    const updatedEmployee = {
        name: req.body.name,
        password: req.body.password,
        contactNumber: req.body.contactNumber,
        department: req.body.department,
        joiningDate : new Date(req.body.joiningDate)
    }
    Employee.findByIdAndUpdate(employee_id, updatedEmployee,{returnDocument: 'after'}, function (err, docs) {
        if (err){
            console.log(err)
            // res.send(err)
            res.redirect("/login")
        }
        else {
            console.log("Updated User : ", docs);
            if (docs == null) {
                res.redirect("/login")
            } else {
                res.redirect("/employee/me")
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
    res.render("employee_graph", {currentDayAnalysis, prevDayAnalysis, last7Days, searchByDateAnalysis:null, searchDate:null})

}

const employeeGraphPost = async (req, res, next) => {
    const currDay = new Date(req.body.date)
    const searchByDateAnalysis = await analysisOf1Day(req.EmployeeID, currDay)
    const currentDayAnalysis = await analysisOf1Day(req.EmployeeID, new Date())
    let prevDate = new Date()
    prevDate.setDate(prevDate.getDate() - 1)
    const prevDayAnalysis = await analysisOf1Day(req.EmployeeID, prevDate)
    const last7Days = await last7DaysAnalysis(req.EmployeeID)
    console.log(currentDayAnalysis)
    console.log(prevDayAnalysis)
    console.log(last7Days)
    res.render("employee_graph", {currentDayAnalysis, prevDayAnalysis, last7Days, searchByDateAnalysis, searchDate: currDay})

}



module.exports = {
    getEmployeeWithID,
    updateEmployeeWithID,
    employeeGraphPost,
    employeeGraph,
    editEmployee
}