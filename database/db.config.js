const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const dbConn = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
  charset: 'utf8mb4',
});

dbConn.connect((err) => {
  if (err) {
    console.info('Database not connected');
  } else {
    console.info('Database connected');
  }
});

module.exports = dbConn;
