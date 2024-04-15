require("dotenv").config();
const inquirer = require("inquirer");
// const { query } = require("./lib/database");
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employee_tracker_db",
  password: "korra",
});
pool.connect();

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View All Departments", "Add Department", "Exit"],
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
        case "Exit":
          db.end();
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
      db.query("INSERT INTO departments (name) VALUES ($1)", [answer.name])
        .then(() => {
          console.log("Department added!");
          mainMenu();
        })
        .catch((err) => console.error(err));
    });
}

mainMenu();
