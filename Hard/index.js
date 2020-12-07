// END POINTS
// /employees - ALL EMPLOYEES
// /employees/:id - DIRECT EMPLOYEE
"use strict";

// Require express module
// Run npm start (To begin nodemon server)
const express = require("express");

// Init express
const app = express();

// Data from json file
const data = require("./employees.json");

// Middleware to extra incoming data of a POST request
const bodyParser = require("body-parser");

// Configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get the full collection of employees
app.get("/employees", (req, res) => {
    res.send(data);
    res.status(200);
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
        res.status(404).send("Employee cannot be found.");
    } else {
        // employee exists
        res.status(200);
    }

    // Send result to page
    res.send(chosenEmployee);
});

// Adds an employee to JSON
app.post("/employees", (req, res) => {
    data.employees.push({
        employeeID: 11,
        name: "AJ",
        salary: 20000,
        departmentName: "Analyst",
    });
    // const body = req.body;
    // data.employees.push({
    //     employeeID: body.employeeID,
    //     name: body.name,
    //     salary: body.salary,
    //     departmentName: body.departmentName,
    // });
    //?employeeID=11&name=Terry&salary=30000&departmentName=QA
    // console.log(body);
    res.end("yes");
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
        res.status(404).send("Employee cannot be found.");
    }

    // Give the specified employee's salary a 100k pay increase
    chosenEmployee.salary += 100000;
    // Return chosenEmployee with increased salary
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
        res.status(404).send("Employee cannot be found.");
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
