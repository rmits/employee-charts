const inquirer = require('inquirer');


const initQuestion = [
    {
        type: 'rawlist',
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

inquirer 
    .prompt(questions)
    .then((res) =>
        res.status(200).send("Successfully updated table")
    .catch((err) =>
        console.log(err))
    );