//Require packages
const inquirer = require('inquirer')
const { Pool } = require('pg')

//Setup pg Pool conncection to database
const pool = new Pool(
    {
        user: '',
        password: '',
        host: 'localhost',
        database: 'employees_db'
    },
    console.log('Connected to database')
)

pool.connect()



//Question tree:

//View all employees (GET all employees)
//Add employee POST(epmloyee)
//Update Employee Role(UPDATE  employee)
//View All rolls (GET all rolls)
//Add roll (POST roll)
//View all departments (GET all departments)
//Add department (POST department)
//function to b

// {await inquirer.prompt([
//     {type: 'input', message: 'What is your business acronym? (max of three characters)', name: "text"},
//     {type: 'input', message: 'What color is the text (by name or "#<6-hexcode-digits>")?', name: "textColor"},
//     {type: 'list', message: 'Choose a shape for your logo!', name: "shape", choices: ['circle', 'square', 'triangle']},
//     {type: 'input', message: 'What color is the shape (by name or hexcode digits)?', name: "shapeColor"},}
async function getEmployees(){
    //Get all employees
    pool.query('SELECT * FROM employees', function (err, {rows}) {
        err ? console.error(err) : console.log(rows);
    });
}

async function addEmployee(){
    //Get employee data from 
    const response = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the employee?',
            name: 'f_name',
        },
        {
            type: 'input',
            message: 'What is the last name of the employee?',
            name: 'l_name',
        },
        {
            list: 'input',
            message: 'What is the role of the employee?',
            name: 'role',
            choices: ['roles!'],
        }
    ])
    const { f_name, l_name, role } = response
    //POST employee into database
    pool.query(`INSERT INTO employees (id, ${f_name}, ${l_name}, ${role}`, function (err) {
        err ? console.error(err) : console.log('employee added');
    });
}

async function updateEmployeeRole(){
    pool.query(``)
    const response = await inquirerprompt([
        {
            list: 'input',
            message: 'Which employee?',
            name: 'employee',
            choices: ['employees!'],
        },
        {
            list: 'input',
            message: 'What is the new role of the employee?',
            name: 'role',
            choices: ['roles!'],
        }
    ])
    const { employee, role } = response
    //db update role
}

async function getRoles(){
    //db get roles 
    pool.query('SELECT * FROM roles', function (err, {rows}) {
        err ? console.error(err) : console.log(rows);
    });
}

async function addRole(){
    //db get departments
    const response = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new role?',
            name: 'role',
        },
        {
            list: 'input',
            message: 'What is the new role of the employee?',
            name: 'department',
            choices: ['dapartments!'],
        }
    ]);
    //db post role
}
async function getDepartments(){
    //db get departments
    pool.query('SELECT * FROM departments', function (err, {rows}) {
        err ? console.error(err) : console.log(rows);
    });
}
async function addDepartment(){
    const response = await inquirer.prompt(
        {
            type: 'input',
            message: 'What is the new department?',
            name: 'department',
        }
    );
    //db post department
}

async function init(){
    const response = await inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'Update Employee Manager!', 'View All Roles', 'Add Roll', 'View All Departments', 'Add Department'],
        }
    );
    const { option } = response;
    if (option == 'View All Employees'){
        getEmployees()
    }
    else if (option == 'Add Employee'){
        console.log('doop')
        addEmployee()
    }
    else if (option == 'Update Employee Role'){
        console.log('datta')
        updateEmployeeRole()
    }
    else if (option == 'Update Employee Manager!'){
        console.log('doom')

    }
    else if (option == 'View All Roles'){
        console.log('ding')
        getRoles()
    }
    else if (option == 'Add Roll'){
        console.log('dot')
        addRole()
    }
    else if (option == 'View All Departments'){
        console.log('didlledy')
        getDepartments()
    }
    else if (option == 'Add Department'){
        console.log('do')
        addDepartment()
    }
    //include exit??
    init()
}

//begin program
init()