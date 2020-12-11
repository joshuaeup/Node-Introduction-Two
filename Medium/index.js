// END POINTS
// /employees - ALL EMPLOYEES
// /employees/:id - DIRECT EMPLOYEE
"use strict";

// Require express module
// Run npm start (To begin nodemon server)
const express = require("express");

// Init express
const app = express();

// Import routes
const routes = require("./routes");

// We want to send json data
// Configuring express to use body-parser as middle-ware
app.use(express.urlencoded({ extended: false })); // If submitting from form(Form Data)
app.use(express.json()); // Allows data to be parsed from JSON

// Use routes starting at base /
app.use("/", routes);

// Listen on PORT 3000 or other specified value
const PORT = 3000 || process.argv.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
