// Require express module
// Run npm start (To begin nodemon server)
const express = require("express");

const router = express.Router();

// Data from json file
const data = require("./employees.json");

// Get the full collection of employees
router.get("/employees", (req, res) => {
    return res.status(200).send(data);
});

// Get employee with specified id
router.get("/employees/:id", (req, res) => {
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

module.exports = router;
