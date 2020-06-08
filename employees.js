const mysql = require("mysql");
const inquirer = require("inquirer")


// set up connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Km5405@!",
  database: "employees_DB"
})
const connect = () => {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    connection.end
  })
}

// inquirer prompts
const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What are we doing today?",
        choices: ["Add departments", "ADD roles", "ADD employees", "View departments", "View roles", "View employees", "Update employee roles", "Remove employee","Remove department","Remove Role","exit"],
        name: "init"
      }
    ])
    .then(answers => {

      if (answers.init === "Add departments") {
        AddDepart()
      }

      if (answers.init === "ADD roles") {
        AddRoles()
      }

      if (answers.init === "ADD employees") {
        AddEmployees()
      }
      if (answers.init === "View departments") {
        ViewDepart()
      }

      if (answers.init === "View roles") {
        ViewRole()
      }

      if (answers.init === "View employees") {
        ViewEmployees()
      }
      if (answers.init === "Update employee roles") {
        UpdatEmployeeRole()
      }
      if (answers.init === "Remove employee") {
        RemoveEmployee()
      }
      if (answers.init === "Remove department") {
        RemoveDepart()
      }
      if (answers.init === "Remove Role") {
        RemoveRole()
      }
      if(answers.init === "exit"){
        connection.end
      }
    })
    .catch(error => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment")
      } else {
      }
    });
}
init()
// functions to excecute into inquirer object builders
const AddDepart = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "department name?",
        name: "department_name"
      }
    ]).then(res => {
      console.log("Inserting a new department...\n");
      const query = connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: res.department_name,

        },
        function (err, res) {
          if (err) throw err;
          console.table(res.affectedRows + "  department added\n");
          init()
        }
      );

      // logs the actual query being run
      console.log(query.sql);
    })
}

const AddRoles = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "role title?",
        name: "title"
      },
      {
        tpye: "number",
        message: "salary",
        name: "salary"
      },
      {
        type: "number",
        message: "what is the department id?(this will be a number if none type 0)",
        name: "department_id"
      }
    ]).then(res => {
      console.log("adding a new role!...\n");
      const query = connection.query(
        "INSERT INTO role SET ?",
        {
          title: res.title,
          salary: res.salary,
          department_id: res.department_id,

        },
        function (err, res) {
          if (err) throw err;
          console.table(res.affectedRows + "  role added\n");
          init()
        }
      );

      // logs the actual query being run
      console.log(query.sql);
    })
}
const AddEmployees = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "employee first name:",
        name: "first_name"
      },
      {
        type: "input",
        message: "employee last name:",
        name: "last_name"
      },
      {
        tpye: "number",
        message: "what is the employee's role  id?",
        name: "role_id"
      },
      {
        tpye: "number",
        message: "manager id type 0 if no manager id?",
        name: "manager_id"
      }
    ]).then(res => {
      console.log("Inserting a new employee...\n");
      const query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: res.first_name,
          last_name: res.last_name,
          role_id:res.role_id,
          manager_id: res.manager_id
        },
        function (err, res) {
          if (err) throw err;
          console.table(res.affectedRows + "  employee added\n");
          init()
        }
      );

      // logs the actual query being run
      console.log(query.sql);
    })
}

const RemoveEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "employee first name to remove",
      name: "name"
    }
  ]).then(answer => {
    console.log(`Deleting all employee's named...${answer.name}\n`);
    connection.query(
      "DELETE FROM employee WHERE ?",
      {
        first_name: answer.name
      },
      function (err, res) {
        if (err) throw err;
        console.table(res.affectedRows + " employee(s) removed lets do something else!") 
        init() 
      }
    );
  })
}
const RemoveRole = ()=>{
  inquirer.prompt([
    {
      type: "input",
      message: "role title to remove",
      name: "name"
    }
  ]).then(answer => {
    console.log(`Deleting all roles titled...${answer.name}\n`);
    connection.query(
      "DELETE FROM role WHERE ?",
      {
        title: answer.name
      },
      function (err, res) {
        if (err) throw err;
        console.table(res.affectedRows + " role(s) removed lets do something else!") 
        init() 
      }
    );
  })
  
}
const RemoveDepart =()=>{
  inquirer.prompt([
    {
      type: "input",
      message: "Department name to delete",
      name: "title"
    }
  ]).then(answer => {
    console.log(`Deleting all departments named...${answer.title}\n`);
    connection.query(
      "DELETE FROM department WHERE ?",
      {
        department_name: answer.title
      },
      function (err, res) {
        if (err) throw err;
        console.table(res.affectedRows + " Department(s) removed lets do something else!") 
        init()
      }
    );
  })
}
const ViewDepart = () => { console.log("Viewing all departments...\n");
connection.query("SELECT * FROM department", function (err, res) {
  if (err) throw err;

  console.table(res);
  console.log("------------------------------------------")
   init()
});}
const ViewRole = () => { console.log("Viewing all roles...\n");
connection.query("SELECT * FROM role", function (err, res) {
  if (err) throw err;

  console.table(res);
  console.log("------------------------------------------")
  init()
}); }
const ViewEmployees = () => {
  console.log("Viewing all Employees...\n");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("------------------------------------------")
    init()
  });
}
const UpdatEmployeeRole = () => { 
  inquirer.prompt([
    {
      type:"input",
      message:"what which employee's role would you like to update?",
      name:"employee"
    },
    {
      type:"number",
      message:"what is the new role id?",
      name:"new_role"
    }

  ]).then(res=>{
    console.log(`updating ${res.employee}'s role to ${res.new_role}`);
    var query = connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          role_id:res.new_role
        },
        {
          first_name: res.employee
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + "  role updated!\n");
        init()
      }
    );
  })
 }


