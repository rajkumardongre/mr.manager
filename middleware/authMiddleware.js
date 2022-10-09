const jwt = require('jsonwebtoken');
const Employee = require('../model/Employee.model');
require('dotenv').config()


const requireAdminAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log("decoded Token",decodedToken);
        if (decodedToken.email == process.env.ADMIN_EMAIL) {
          next();
        } else {
          res.render('login', {msg : "Access Denied"});
        }
        // req.user = decodedToken
      }
    });
  } else {
    res.render('login', {msg : "Access Denied"});
  }
};


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  console.log("Checking Token")
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.render('login', {msg : "Access Denied"});
      } else {
        Employee.findById(decodedToken.id, (err, doc) => {
          if (err || doc == null) {
            res.render("login", {msg : "Access Denied"})
          } else {
            req.EmployeeID = decodedToken.id
            next();    
          }
        })
        
      }
    });
  } else {
    res.render('login', {msg : "Access Denied"});
  }
};

// check current user
// const checkEmployee = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
//       if (err) {
//         res.locals.employee = null;
//         next();
//       } else {
//         let employee = await Employee.findById(decodedToken.id);
//         res.locals.employee = employee;
//         next();
//       }
//     });
//   } else {
//     res.locals.employee = null;
//     next();
//   }
// };


module.exports = { requireAuth, requireAdminAuth };