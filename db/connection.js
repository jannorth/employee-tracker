const mysql = require('mysql2');

// connection to DB config
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'finally!',
  database: 'employees'
});


connection.connect(function(error) {
  if(error) {
    throw error;
  }
  console.log('Database Connected!')
});


module.exports = connection;