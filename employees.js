const mysql = require("mysql");
const inquirer= require("inquirer")

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Km5405@!",
  database: "employees_DB"