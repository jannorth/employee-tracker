const { prompt } = require("inquirer");
//const db = require("./db/connection");
const conn = require("./db/connection");

function runQuery() {
  console.log("Running Query...");

  conn.query("SELECT * FROM department;", function (err, data) {
    if (err) {
      throw err;
    }

    console.log(data);
    console.table(data);
  });
}

runQuery();
