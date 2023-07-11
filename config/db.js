const mysql      = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.resolve(__dirname, '../.env') });

const connection = mysql.createConnection({
  host     : process.env.DATABASE_HOST ,
  user     : process.env.DATABASE_USERNAME,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE,
  port: "3306", //Default 
});
 
connection.connect((err) =>{
    if (err) {
      console.error(`Database ERROR: ${err}`);
      return;
    }
   
    console.log("Connected to MYSQL");
  });


module.exports = connection;