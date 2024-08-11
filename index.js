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
    const data = await pool.query(`SELECT name, id FROM roles`)
    const { rows } = data
    console.log(rows)
    console.log(rows.id)
    let rolesMap = {}
    rows.forEach((role) => {
        (rolesMap[role.name] = role.id)
    })
    console.log(rolesMap)
    const roles = rows.map((role) => role.name)
    console.log(roles)
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
            type: 'list',
            message: 'What is the role of the employee?',
            name: 'role',
            choices: roles,
        }
    ])
    const { f_name, l_name, role } = response
    const roleId = rolesMap[role]
    //POST employee into database
    pool.query(`INSERT INTO employees (f_name, l_name, roles_id) VALUES ('${f_name}', '${l_name}', '${roleId}');`, function (err) {
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
    const data = await pool.query(`SELECT name, id FROM departments`)
    const { rows } = data
    console.log(rows)
    let departmentsMap = {}
    rows.forEach((department) => {
        (departmentsMap[department.name] = department.id)
    })
    const departments = rows.map((department) => department.name)
    console.log(departments)
    const response = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new role?',
            name: 'role',
        },
        {
            type: 'input',
            message: 'What is the salary of this role?',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'To what department does this role belong?',
            name: 'department',
            choices: departments,
        }
        
    ]);
    //db post department
    const { role, salary, department } = response
    const departmentId = departmentsMap[department]
    //POST employee into database
    pool.query(`INSERT INTO roles (name, salary, departments_id) VALUES ('${role}', '${salary}', '${departmentId}');`, function (err) {
        err ? console.error(err) : console.log('employee added');
    });
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
    const { department } = response
    //db post department
    pool.query(`INSERT INTO departments (name) VALUES ('${department}')`, function (err) {
        err ? console.error(err) : console.log('employee added');
    });
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
        await getEmployees()
    }
    else if (option == 'Add Employee'){
        console.log('doop')
        await addEmployee()
    }
    else if (option == 'Update Employee Role'){
        console.log('datta')
        await updateEmployeeRole()
    }
    else if (option == 'Update Employee Manager!'){
        console.log('doom')

    }
    else if (option == 'View All Roles'){
        console.log('ding')
        await getRoles()
    }
    else if (option == 'Add Roll'){
        console.log('dot')
        await addRole()
    }
    else if (option == 'View All Departments'){
        console.log('didlledy')
        await getDepartments()
    }
    else if (option == 'Add Department'){
        console.log('do')
        await addDepartment()
    }
    //include exit??
    init()
}

//begin program
init()