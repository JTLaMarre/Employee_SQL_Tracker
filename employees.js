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
const init = ()=>{
inquirer
  .prompt([
    {
      type: "list",
      message: "What are we doing today?",
      choices: ["Add departments", "ADD roles", "ADD employees", "View departments", "View roles", "View employees", "Update employee roles","remove employee"],
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
    if(answers.init ==="remove employee"){
      RemoveEmployee()
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
      console.log(res)
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
      }
    ]).then(res => {
      console.log(res)
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
          manager_id: res.manager_id
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + "  employee added\n");
          // Call updateProduct AFTER the INSERT completes
          MoreEmployees()
        }
      );
    
      // logs the actual query being run
      console.log(query.sql);
    })
  }
  const MoreEmployees =()=>{
    inquirer
    .prompt([
      {type: "list",
      choices:["Add more employees","Do something else","exit"],
      name:"more"
    }
    ]).then(res=>{
      if (res.more==="Add more employees"){
        connection.end
        AddEmployees()
      }
      if(res.more==="Do something else"){
        connection.end
        init()
      }
      if(res.more==="exit"){
        connection.end
        console.log("Goodbye (ctrl+C to leave command line app)")
      }
    })
  }
  const RemoveEmployee=()=>{
    inquirer.prompt([
      {
        type:"name",
        message:"employee first name to remove",
        name:"name"
      }
    ]).then(answer=>{
      console.log(`Deleting all employee's named...${answer.name}\n`);
      connection.query(
        "DELETE FROM employee WHERE ?",
        {
          first_name: answer.name
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee(s) removed lets do something else!\n");
          setTimeout(()=>{init()},3000)
        }
      );
    })
  }
      const ViewDepart = () => { console.log(" view department") }
      const ViewRole = () => { console.log("view role") }
      const ViewEmployees = () => { 
        console.log("Viewing all Employees...\n");
        connection.query("SELECT * FROM employee", function(err, res) {
          if (err) throw err;
          
          console.log(res);
          console.log("------------------------------------------")
          console.log("returning to main menu in 10 seconds")
          setTimeout(()=>init(),10000)
        });
       }
      const UpdatEmployeeRole = () => { console.log("update") }


    