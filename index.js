require("dotenv").config();
const inquirer = require("inquirer");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "employee_tracker_db",
  password: process.env.DB_PASSWORD || "korra",
});

pool.connect();

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "Add Department",
          "View All Employees",
          "Add Employee",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Exit":
          pool.end();
          process.exit();
      }
    })
    .catch((err) => console.error("Error:", err));
}

function viewDepartments() {
  pool
    .query("SELECT * FROM departments", [])
    .then((res) => {
      console.table(res.rows);
      mainMenu();
    })
    .catch((err) => console.error(err));
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Department name:",
      },
    ])
    .then((answer) => {
      pool
        .query("SELECT * FROM departments WHERE name = $1", [answer.name])
        .then((res) => {
          if (res.rows.length > 0) {
            console.log("A department with this name already exists.");
            mainMenu();
          } else {
            pool
              .query("INSERT INTO departments (name) VALUES ($1)", [
                answer.name,
              ])
              .then(() => {
                console.log("Department added!");
                mainMenu();
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => console.error(err));
    });
}

function viewEmployees() {
  pool
    .query("SELECT * FROM employees", [])
    .then((res) => {
      console.table(res.rows);
      mainMenu();
    })
    .catch((err) => console.error(err));
}

async function addEmployee() {
  const allRoleData = await pool.query("SELECT * FROM roles");
  const roleChoices = allRoleData.rows.map((role) => ({
    name: role.title,
    value: role.id,
  }));
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "First name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Last name:",
      },
      {
        type: "list",
        name: "role",
        message: "Role:",
        choices: roleChoices,
      },
    ])
    .then((answer) => {
      pool
        .query(
          "INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)",
          [answer.firstName, answer.lastName, answer.role]
        )
        .then(() => {
          console.log("Employee added!");
          mainMenu();
        })
        .catch((err) => console.error(err));
    });
}

mainMenu();
