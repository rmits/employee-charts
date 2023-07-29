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
}