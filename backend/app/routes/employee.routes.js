
const employee = require("../controllers/employee.controller.js");

var router = require("express").Router();

// Create a new employee
router.post("/register", employee.register);

// get one employee
router.post("/login", employee.login);
module.exports = router;
