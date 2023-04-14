const { prompt } = require("inquirer");
const db = require("./db/connection");
// const connection = require("./connection");

function runQuery() {
  console.log("Running Query...");
}
  runQuery();

  // view all departments
function viewDepartments() {
  console.log("Viewing all departments...\n");
  db.query("SELECT * FROM department", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.table(data);
    }
    // initPrompts();
  });
}
  // view all roles
function viewRoles() {
  console.log("Viewing all roles...\n");
  db.query("SELECT * FROM role", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.table(data);
    }
    initPrompts();
  });
}

  // view all employees
function viewEmployees() {
  console.log("Viewing all employees...\n");
  db.query("SELECT * FROM employee", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.table(data);
    }
    initPrompts();
  });
}

  // add a department
async function addDepartment() {
  const { departmentName } = await prompt([
    {
      type: "input",
      name: "departmentName",
      message: "Enter the name of the new department:",
      validate: (input) => {
        if (input.trim() === "") {
          return "Department name cannot be empty";
        }
        return true;
      },
    },
  ]);

  db.query(
    "INSERT INTO department SET ?",
    { name: departmentName },
    function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(`${res.affectedRows} department added!\n`);
      }
      initPrompts();
    }
  );
}

  // add a role
async function addRole() {
  const { roleName, roleSalary, departmentId } = await prompt([
    {
      type: "input",
      name: "roleName",
      message: "Enter the name of the new role:",
      validate: (input) => {
        if (input.trim() === "") {
          return "Role name cannot be empty";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "roleSalary",
      message: "Enter the salary for the new role:",
      validate: (input) => {
        const valid = !isNaN(parseFloat(input));
        return valid || "Please enter a number";
      },
    },
    {
      type: "input",
      name: "departmentId",
      message: "Enter the department ID for the new role:",
      validate: (input) => {
        const valid = !isNaN(parseFloat(input));
        return valid || "Please enter a number";
      },
    },
  ]);

  db.query(
    "INSERT INTO role SET ?",
    { title: roleName, salary: roleSalary, department_id: departmentId },
    function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(`${res.affectedRows} role added!\n`);
      }
      initPrompts();
    }
  );
}

  // add an employee
  async function addEmployee() {
    const { firstName, lastName, roleId, managerId } = await prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name:",
        validate: (input) => {
          if (input.trim() === "") {
            return "First name cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name:",
        validate: (input) => {
          if (input.trim() === "") {
            return "Last name cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the role ID for the new employee:",
        validate: (input) => {
          const valid = !isNaN(parseFloat(input));
          if (valid) {
            return true;
          } else {
            return "Please enter a valid role ID number";
          }
        },
      },
      {
        type: "input",
        name: "managerId",
        message: "Enter the manager ID for the new employee (optional):",
        validate: (input) => {
          const valid = input.trim() === "" || !isNaN(parseFloat(input));
          if (valid) {
            return true;
          } else {
            return "Please enter a valid manager ID number, or leave blank for no manager";
          }
        },
      },
    ]);
  
    db.query(
      "INSERT INTO employee SET ?",
      {
        first_name: firstName,
        last_name: lastName,
        role_id: roleId,
        manager_id: managerId || null,
      },
      function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(`${res.affectedRows} employee added!\n`);
        }
  
        initPrompts();
      }
    );
  }
  // update an employee role
async function updateEmployee() {
  const { employeeId, roleId } = await prompt([
    {
      type: "input",
      name: "employeeId",
      message: "Enter the ID of the employee to update:",
      validate: (input) => {
        const valid = !isNaN(parseFloat(input));
        return valid || "Please enter a number";
      },
    },
    {
      type: "input",
      name: "roleId",
      message: "Enter the new role ID for the employee:",
      validate: (input) => {
        const valid = !isNaN(parseFloat(input));
        return valid || "Please enter a number";
      },
    },
  ]);

  db.query(
    "UPDATE employee SET role_id = ? WHERE id = ?",
    [roleId, employeeId],
    function (err, res) {
      if (err) {
        console.log(err);
      } else if (res.affectedRows === 0) {
        console.log("Employee not found.");
      } else {
        console.log(`${res.affectedRows} employee updated!\n`);
      }
      initPrompts();
    }
  );
}







async function initPrompts() {
  let done = false;
  while (!done) {
    const { options } = await prompt([
      {
        type: "list",
        name: "options",
        message: "choose an option:",
        choices: [
          {
            name: "view all departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "view all roles",
            value: "VIEW_ROLES",
          },
          {
            name: "view all employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "add a department",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "add a role",
            value: "ADD_ROLE",
          },
          {
            name: "add an employee",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "update an employee role",
            value: "UPDATE_EMPLOYEE",
          },
          {
            name: "done",
            value: "DONE",
          },
        ],
      },
    ]);

    switch (options) {
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "UPDATE_EMPLOYEE":
        updateEmployee();
        break;
      case "DONE":
        console.log("Exiting prompt...");
        done = true;
        break;
    }
  }
}

initPrompts();