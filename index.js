const { prompt } = require("inquirer");
const db = require("./db");
const connection = require("./connection");

function runQuery() {
  console.log("Running Query...");
  // view all departments
  db.query("SELECT * FROM department;", function (err, data) {
    if (err) {
      throw err;
    }

    console.log(data);
    console.table(data);
  });

  // view all roles
  // view all employees
  // add a department
  // add a role
  // add an employee
  // update an employee role
}

runQuery();
