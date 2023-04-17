const { prompt } = require("inquirer");
const db = require("./db/connection");
const table = require("console.table");

function initPrompts() {
  prompt({
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
  }).then(function ({ options }) {
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
        db.end();
        console.log("Exiting prompt...");
        console.table(table);
        break;
    }
  });
}

// view all departments
function viewDepartments() {
  console.log("Viewing all departments...\n");
  db.query("SELECT * FROM department", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.table(data);
      initPrompts();
    }
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
      initPrompts();
    }
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
      initPrompts();
    }
  });
}

// add a department
 function addDepartment() {
   prompt([
    {
      type: "input",
      name: "departmentName",
      message: "Enter the name of the new department:",
    },
  ]).then((data) => {
    db.query(
      "INSERT INTO department SET ?",
      { name: data.departmentName },
      function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(`${res.affectedRows} department added!\n`);
          initPrompts();
        }
      }
    );
  });
}

// add a role
function addRole() {
  db.query("SELECT * FROM department", function (err, data) {
    if (err) {
      console.log(err);
      initPrompts();
    } else {
      const departmentChoices = data.map((department) => ({
        name: department.name,
        value: department.id,
      }));

      prompt([
        {
          type: "input",
          name: "roleName",
          message: "Enter the name of the new role:",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "Enter the salary for the new role:",
        },
        {
          type: "list",
          name: "departmentId",
          message: "select a department for this role:",
          choices: departmentChoices,
        },
      ]).then((data) => {
        db.query(
          "INSERT INTO role SET ?",
          {
            title: data.roleName,
            salary: data.roleSalary,
            department_id: data.departmentId,
          },
          function (err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log(`${res.affectedRows} role added!\n`);
            }
            initPrompts();
          }
        );
      });
    }
  });
}

// add an employee
function addEmployee() {
  db.query("SELECT * FROM role", function(err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const roleChoices = data.map((role) => {
      return { name: role.title, value: role.id };
    });

    prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name:",
      },
      {
        type: "list",
        name: "roleId",
        message: "Select the employee's role:",
        choices: roleChoices,
      },
    ]).then(function ({ firstName, lastName, roleId }) {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: firstName,
          last_name: lastName,
          role_id: roleId,
        },
        function (err, res) {
          if (err) {
            console.log(err);
          } else {
            console.log(`${res.affectedRows} employee added!\n`);
            initPrompts();
          }
        }
      );
    });
  });
}
// update an employee role
async function updateEmployee() {
  const { employeeId, roleId } = await prompt([
    {
      type: "input",
      name: "employeeId",
      message: "Enter the ID of the employee to update:",
    },
    {
      type: "input",
      name: "roleId",
      message: "Enter the new role ID for the employee:",
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
              initPrompts();
      }
    }
  );
}

function init() {
   initPrompts();
}
init();
