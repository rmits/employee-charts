const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Bipple12$',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

const initQuestion = [
    {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'Add Employee', 
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit'
        ],
    },
] 

const empQuestions = [  {
    type: 'input',
    message: 'What is the first name of the employee?',
    name: 'empFirstName'
}, {
    type: 'input',
    message: 'What is the last name of the employee?',
    name: 'empLastName'
}, {
    type: 'input',
    message: 'What is their roll id number?',
    name: 'empRoleId'
}, {
    type: 'input',
    message: "What is their manager's id number (Keep empty if no manager)",
    name: 'empManagerId'
},
]

const mainMenu = () => {
    inquirer 
    .prompt(initQuestion)
    .then((res) => {
        if (res.main === 'View All Employees') {
            viewAllEmployees();
        } else if (res.main === 'View All Roles') {
            viewAllRoles();
        } else if (res.main === 'View All Departments') {
            viewAllDepartments();
        } else if (res.main === 'Add Department') {
            addDepartment();
        } else if (res.main === 'Add Employee') {
            addEmployee();
        } else if (res.main === 'Add Role') {
            addRole();
        } else if (res.main === 'Update Employee Role') {
            updateEmployeeRole();
        };
    });

}

const viewAllDepartments = () => {
    db.query('SELECT * from department', (err,res) => {
        console.table(res);
        mainMenu();
        if (err) {
            console.log(err);
        }; 
    });
};

const viewAllEmployees = () => {
    db.query('SELECT * from employee', (err,res) => {
        console.table(res);
        mainMenu();
        if(err) {
            console.log(err);
        }
    }
)};

const viewAllRoles = () => {
    db.query('SELECT * from roles', (err,res) => {
        console.table(res);
        mainMenu();
        if(err) {
            console.log(err);
        }
    }
)};

const addDepartment = () => {
    inquirer
        .prompt({
            type: 'input',
            message: 'What is the name of the department?',
            name: 'departmentName'
        })
        .then((res) => {
            const stringRes = JSON.stringify(res.departmentName);
            db.query(`INSERT INTO department (department_name) VALUES (${stringRes})`, (err, result) => {
                if (err) {
                    console.error('Error adding department:', err);
                } else {
                    console.log('Department added successfully!', result);
                    viewAllDepartments();
                }
            });
        });
};

const addEmployee = () => {
    inquirer
        .prompt(empQuestions)
        .then((res) => {
            if (res.empManagerId === '') {
                res.empManagerId = null;
            };

            const employeeData = {
                first_name: res.empFirstName,
                last_name: res.empLastName,
                role_id: res.empRoleId,
                manager_id: res.empManagerId
            };

            db.query(
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                [employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id],
                (err, result) => {
                    if (err) {
                        console.error('Error adding employee:', err);
                    } else {
                        console.log('Employee added successfully!', result);
                        viewAllEmployees();
                    }
                }
            );
        });
};

const addRole = () => {
    inquirer
        .prompt([
            {
            type: 'input',
            message: 'What is the title of the role?',
            name: 'titleRole'
        }, {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salaryRole'
        }, {
            type: 'input',
            message: 'What is the ID of the department this role will be apart of?',
            name: 'departmentRole'
        }])
        .then((res) => {
            const newRole = {
                newTitle: res.titleRole,
                newSalary: res.salaryRole,
                newDepId: res.departmentRole
            }

            db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
            [newRole.newTitle, newRole.newSalary, newRole.newDepId], (err,req) => {
                if (err) {
                    console.log(err);
                }
                console.log('Role Add Successful!', req);
                viewAllRoles();
            }
            );

        }) 
};

const updateEmployeeRole = () => {
    inquirer
        .prompt([
        {
            type: 'input',
            message: 'What is the ID of the employee?',
            name: 'employeeId'
        }, {
            type: 'input',
            message: 'What is the ID of their new role?',
            name: 'roleId'
        }
    ])
        .then((res) => {
            const updatedRole = {
                empId: res.employeeId,
                newRole: res.roleId
            };

            db.query('UPDATE employee SET role_id = ? WHERE id = ?',
            [updatedRole.newRole, updatedRole.empId], (err, res) => {
                if (err) {
                    console.log('Unexpected Error Occured', err);
                } else {
                    console.log('Successful Update!', res);
                    viewAllEmployees();
                }
            }
            )
        })
}



module.exports = { mainMenu };