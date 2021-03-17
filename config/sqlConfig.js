const creds = require("./userConfig");
const sql = require('mysql');

// these are the same connect data that you would use in a PHP connect script
// we want to obscure them a bit for security (normally these would be saved in an .env file)
//and then read in at runtime / create time

// everything we defined in the userConfig.js file, we are inserting into here
const connection = sql.createPool({
    connectionLimit: 10,
    host: creds.host,
    user: creds.user,
    password: creds.password,
    port: creds.port,
    database: creds.database
  });

  module.exports = connection;