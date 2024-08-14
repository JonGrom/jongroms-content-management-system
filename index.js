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

async function getEmployees(){
    //Get all employees
    const data = await pool.query(`SELECT employees.id, CONCAT(employees.f_name,' ', employees.l_name) AS "Name", roles.name AS "Title", departments.name AS "Department", salary AS "Salary", CONCAT(manager.f_name,' ', manager.l_name) AS "Manager" FROM employees JOIN roles ON employees.roles_id = roles.id JOIN departments ON roles.departments_id = departments.id LEFT JOIN employees AS manager ON employees.manager_id = manager.id;`)
    const { rows } = data
    console.table(rows)

    init()
}

async function addEmployee(){
   
    const empList = await pool.query(`SELECT CONCAT(f_name,' ', l_name) AS name, id FROM employees`)
    const employees = empList.rows.map((row) => row.name)
    let empMap = {}
    empList.rows.forEach((employee) => {
        (empMap[employee.name] = employee.id)
    })
    const rolesList = await pool.query(`SELECT name, id FROM roles`)
    const roles = rolesList.rows.map((row) => row.name)
    let rolesMap = {}
    rolesList.rows.forEach((role) => {
        (rolesMap[role.name] = role.id)
    })
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
        },
        {
            type: 'list',
            message: 'Who is the manager of the employee?',
            name: 'manager',
            choices: employees,
        }
    ])
    const { f_name, l_name, role, manager } = response
    const managerId = empMap[manager]
    const roleId = rolesMap[role]
    // POST employee into database
    await pool.query(`INSERT INTO employees (f_name, l_name, roles_id, manager_id) VALUES ('${f_name}', '${l_name}', '${roleId}', '${managerId}');`);
    console.log(`${f_name} ${l_name} added to employees`)

    init()
}

async function updateEmployeeRole(){
    const empList = await pool.query(`SELECT f_name, l_name, id FROM employees`)
    const employees = empList.rows.map((employee) => `${employee.f_name} ${employee.l_name}`)
    let empMap = {}
    empList.rows.forEach((employee) => {
        (empMap[`${employee.f_name} ${employee.l_name}`] = employee.id)
    })
    const rolesList = await pool.query(`SELECT name, id FROM roles`)
    const roles = rolesList.rows.map((row) => row.name)
    let rolesMap = {}
    rolesList.rows.forEach((role) => {
        (rolesMap[role.name] = role.id)
    })
    const response = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee?',
            name: 'employee',
            choices: employees,
        },
        {
            type: 'list',
            message: 'What is the new role of the employee?',
            name: 'role',
            choices: roles,
        }
    ])
    const { employee, role } = response
    const employeeId = empMap[employee]
    const roleId = rolesMap[role]

    pool.query(`UPDATE employees SET roles_id = ${roleId} WHERE employees.id = ${employeeId}`)

    init()
}

async function getRoles(){
    //db get roles 
    const data = await pool.query('SELECT roles.id, roles.name AS Role, departments.name AS Department, salary as Salary FROM roles JOIN departments ON roles.departments_id = departments.id;')
    const { rows } = data
    console.table(rows)

    init()
}

async function addRole(){
    //db get departments
    const data = await pool.query(`SELECT name, id FROM departments`)
    const { rows } = data
    let departmentsMap = {}
    rows.forEach((department) => {
        (departmentsMap[department.name] = department.id)
    })
    const departments = rows.map((department) => department.name)
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
   await pool.query(`INSERT INTO roles (name, salary, departments_id) VALUES ('${role}', '${salary}', '${departmentId}');`);
    console.log(`${role} added to roles`)

    init()
}
async function getDepartments(){
    //db get departments
    const data = await pool.query('SELECT departments.id, departments.name AS Department FROM departments;')
    const { rows } = data
    console.table(rows)

    init()
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
    await pool.query(`INSERT INTO departments (name) VALUES ('${department}')`);
    console.log(`${department} added to departments`)

    init()
}

async function init(){
    const response = await inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Roll', 'View All Departments', 'Add Department'],
        }
    );
    const { option } = response;
    if (option == 'View All Employees'){
        await getEmployees()
    }
    else if (option == 'Add Employee'){
        await addEmployee()
    }
    else if (option == 'Update Employee Role'){
        await updateEmployeeRole()
    }
    else if (option == 'View All Roles'){
        await getRoles()
    }
    else if (option == 'Add Roll'){
        await addRole()
    }
    else if (option == 'View All Departments'){
        await getDepartments()
    }
    else if (option == 'Add Department'){
        await addDepartment()
    }
    
}

//begin program
init()