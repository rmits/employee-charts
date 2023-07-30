const inquirer = require('inquirer');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'courses_db'
    },
    console.log(`Connected to the courses_db database.`)
  );

const viewAllDepartments = () => {
    db.query('SELECT * from departments', (err,res) => {
        console.log(res);
        if (err) {
            console.log(err);
        }
    });
};

const viewAllEmployees = () => {
    db.query('SELECT * from employees', (err,res) => {
        console.log(res);
        if(err) {
            console.log(err);
        }
    }
)};

const viewAllRoles = () => {
    db.query('SELECT * from role', (err,res) => {
        console.log(res);
        if(err) {
            console.log(err);
        }
    }
)};

const addDepartment = () => {
    inquirer
        .prompt({
            type: 'input',
            message: 'What is the namme of the department?',
            name: 'departmentName'
        })
        .then((res) => {
            db.query(`INSERT INTO department (department_name) VALUES (${res.departmentName})`)

        })
        
}