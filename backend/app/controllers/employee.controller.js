const db = require("../models");
const Employee = db.employee;
const Op = db.Sequelize.Op;
const errorMsg = "Oops something went wrong, Please contact administrator.";
exports.register = async (req, res) => {
  try {
    var body = req.body;
    console.log("Inside create Employee:", req.body);
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Invalid request body"
      });
      return;
    }
    var employee = {
      name: body.username,
      email: body.email,
      username: body.username,
      password: body.password,
      isTnc: body.agree
    }
    var isEmpWithEmailUsername = await Employee.findOne({
      where: {
        [Op.or]: [{ email: body.email }, { username: body.username }]
      }
    });
    if (isEmpWithEmailUsername) {
      res.status(200).send({ status: 409, msg: "Employee already exists with given Email id or Username" });
    } else {
      // Save Employee in the database
      var data = await Employee.create(employee);
      console.log("Employee registered successfully");
      res.status(200).send({ status: 200, msg: "Employee registered successfully" });
    }
  }
  catch (err) {
    console.log("Error occured inside register employee", err.message);
    res.status(500).send({
      msg:
        errorMsg
    });
  };
};

// Find a single Employee with an id
exports.login = async (req, res) => {
  try {
    var body = req.body;
    console.log(`Inside find one employee by username and password`, body);
    var usernameEmail = [{ email: body.usernameEmail }, { username: body.usernameEmail }];
    var data = await Employee.findOne({
      where: {
        [Op.or]: usernameEmail,
        password: body.password
      }
    });
    if (data) {
      res.status(200).send({ status: 200, msg: "Employee Logged in successfully", data: data });
    } else {
      console.log(`Employee not found with given credentials`, body);
      res.status(200).send({
        status: 404,
        msg: `Employee not found. Please register if new user!`
      });
    }
  }
  catch (err) {
    console.log("Error occured inside login Employee", err.message);
    res.status(500).send({
      msg: "Oops something went wrong."
    });
  };
};

