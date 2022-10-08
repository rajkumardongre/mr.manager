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
        // console.log(decodedToken);
        if (decodedToken == process.env.ADMIN_EMAIL) {
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
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        // console.log(decodedToken);
        req.user = decodedToken
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
const checkEmployee = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.employee = null;
        next();
      } else {
        let employee = await Employee.findById(decodedToken.id);
        res.locals.employee = employee;
        next();
      }
    });
  } else {
    res.locals.employee = null;
    next();
  }
};


module.exports = { requireAuth, checkEmployee, requireAdminAuth };