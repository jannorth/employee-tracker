const mysql = require('mysql2');

// connection to DB config
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'finally!',
  database: 'employees'
});


db.connect(function(error) {
  if(error) {
    throw error;
  }
  console.log('Database Connected!')
});


module.exports = db;