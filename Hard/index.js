// END POINTS
// GET
// /employees - ALL EMPLOYEES
// /employees/:id - DIRECT EMPLOYEE

// POST
// /employees - ALL EMPLOYEES

// PUT
// /employees - ALL EMPLOYEES

// DELETE
// /employees/:id - DIRECT EMPLOYEE

"use strict";

// Require express module
// Run npm start (To begin nodemon server)
const express = require("express");

// Init express
const app = express();

// Data from json file
const data = require("./employees.json");

// Joi class allows for easier input validation
const Joi = require("joi");

// We want to send json data
// Configuring express to use body-parser as middle-ware
app.use(express.urlencoded({ extended: false })); // If submitting from form(Form Data)
app.use(express.json()); // Allows data to be parsed from JSON

// Get the full collection of employees
app.get("/employees", (req, res) => {
    return res.status(200).send(data);
});

// Get employee with specified id
app.get("/employees/:id", (req, res) => {
    // Find an employee that matches the ID passed into the url
    const chosenEmployee = data.employees.find((employee) => {
        return parseInt(req.params.id) === employee.employeeID;
    });

    // Check if the employee exist. if exist the object will return. else it will be undefined.
    if (!chosenEmployee) {
        // Set status code to not found and display message
        return res.status(404).send("Employee cannot be found.");
    }

    // Send result to page
    res.status(200).send(chosenEmployee);
});

// Adds an employee to JSON
app.post("/employees", (req, res) => {
    // Develop a schema to manage the structure of the inputted data
    const schema = Joi.object({
        name: Joi.string().min(3).required(), // this ensures that the name property is required and must be a string of 3 characters or more.
        salary: Joi.number().positive().required(),
        departmentName: Joi.string().min(2).required(),
    });

    const newEmployee = {
        employeeID: data.employees.length + 1,
        name: req.body.name,
        salary: req.body.salary,
        departmentName: req.body.departmentName,
    };

    // the Joi.validate() method takes the entire req.body and the created schema(Guidelines) then stores the result in an object
    const result = schema.validate(req.body, newEmployee);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    data.employees.push(newEmployee);

    res.send(newEmployee);
});

// Updates an employees data
app.put("/employees/:id", (req, res) => {
    // Find an employee that matches the ID passed into the url
    const chosenEmployee = data.employees.find((employee) => {
        return parseInt(req.params.id) === employee.employeeID;
    });
    // Check if the employee exist. if exist the object will return. else it will be undefined.
    if (!chosenEmployee) {
        // Set status code to not found and display message
        return res.status(404).send("Employee cannot be found.");
    }

    // Develop a schema to manage the structure of the inputted data
    const schema = Joi.object({
        name: Joi.string().min(3).required(), // this ensures that the name property is required and must be a string of 3 characters or more.
        salary: Joi.number().positive().required(),
        departmentName: Joi.string().min(2).required(),
    });

    const updatedEmployee = {
        employeeID: data.employees.length + 1,
        name: req.body.name,
        salary: req.body.salary,
        departmentName: req.body.departmentName,
    };

    // the Joi.validate() method takes the entire req.body and the created schema(Guidelines) then stores the result in an object
    const result = schema.validate(req.body, updatedEmployee);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    // Update Name
    chosenEmployee.name = updatedEmployee.name;
    // Update salary
    chosenEmployee.salary = updatedEmployee.salary;
    // Update Department
    chosenEmployee.departmentName = updatedEmployee.departmentName;

    // Return chosenEmployee with updated values
    res.send(chosenEmployee);
});

// Delete an employee
app.delete("/employees/:id", (req, res) => {
    // Find an employee that matches the ID passed into the url
    const chosenEmployee = data.employees.find((employee) => {
        return parseInt(req.params.id) === employee.employeeID;
    });
    // Check if the employee exist. if exist the object will return. else it will be undefined.
    if (!chosenEmployee) {
        // Set status code to not found and display message
        return res.status(404).send("Employee cannot be found.");
    }

    // Store employees ID
    const employeeIndex = data.employees.indexOf(chosenEmployee);

    // Remove array item at specified index once
    data.employees.splice(employeeIndex, 1);
    // Return the updated array
    res.json(data.employees);
});

// Listen on PORT 3000 or other specified value
const PORT = 3000 || process.argv.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
