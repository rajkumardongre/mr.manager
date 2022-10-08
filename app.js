const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const Employee = require("./model/Employee.model")

const { requireAuth, checkEmployee, requireAdminAuth } = require('./middleware/authMiddleware');

const authRoutes = require("./route/authRoutes")
const employeeRoutes = require("./route/Employee.route")
const taskRoute = require("./route/Task.route")


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded());


// view engine
app.set('view engine', 'ejs');

// database connection
const port = process.env.PORT
const dbURI = process.env.MONGODB_CONNECTION_URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(port, ()=> console.log(`Listening on port ${port}`)))
    .catch((err) => console.log(err));
  
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
    
app.use("/", authRoutes)
app.use("/admin", requireAdminAuth, employeeRoutes)
app.use("/employee", requireAuth, employeeRoutes)
app.use("/task", taskRoute)