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

// Get the full collection of employees
app.get("/employees", (req, res) => {
    res.send(data);
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
    res.send(chosenEmployee);
});

// Listen on PORT 3000 or other specified value
const PORT = 3000 || process.argv.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
