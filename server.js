const inquirer = require('inquirer');


const questions = [
    {
        type: 'rawlist',
        name: 'main',
        message: 'What would you like to do?',
        choices: ['Add department', 'Add employee', 'Add role']
    }
] 

inquirer 
    .prompt(questions)
    .then((res) =>
        res.status(200).send("Successfully updated table")
    .catch((err) =>
        console.log(err))
    );