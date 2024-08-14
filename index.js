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
//Connect pool
pool.connect()

//Get Employees Table
async function getEmployees(){
    //Query database for employee ids, names, roles, departments, salaries, and managers
    const data = await pool.query(`SELECT employees.id, CONCAT(employees.f_name,' ', employees.l_name) AS "Name", roles.name AS "Title", departments.name AS "Department", salary AS "Salary", CONCAT(manager.f_name,' ', manager.l_name) AS "Manager" FROM employees JOIN roles ON employees.roles_id = roles.id JOIN departments ON roles.departments_id = departments.id LEFT JOIN employees AS manager ON employees.manager_id = manager.id;`)
    const { rows } = data
    //Present tabled data in console
    console.table(rows)

    //Return to menu
    init()
}

//Add Employee
async function addEmployee(){
   
    //Query database for all employees
    const empList = await pool.query(`SELECT CONCAT(f_name,' ', l_name) AS name, id FROM employees`)

    //Declare array of all employees
    const employees = empList.rows.map((row) => row.name)

    //Make object mapping employees as keys to employee id values
    let empMap = {}
    empList.rows.forEach((employee) => {
        (empMap[employee.name] = employee.id)
    })

    //Query database for all roles
    const rolesList = await pool.query(`SELECT name, id FROM roles`)

    //Declare array of all roles
    const roles = rolesList.rows.map((row) => row.name)

    //Make object mapping roles as keys to role ids
    let rolesMap = {}
    rolesList.rows.forEach((role) => {
        (rolesMap[role.name] = role.id)
    })

    //Prompt user for employee info
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

    //Deconstruct response
    const { f_name, l_name, role, manager } = response

    //Get manager and rolle ids from response
    const managerId = empMap[manager]
    const roleId = rolesMap[role]

    // POST employee into database
    await pool.query(`INSERT INTO employees (f_name, l_name, roles_id, manager_id) VALUES ('${f_name}', '${l_name}', '${roleId}', '${managerId}');`);
    console.log(`${f_name} ${l_name} added to employees`)

    // Return to menu
    init()
}

//Update employee role
async function updateEmployeeRole(){
    //Query database for all employees
    const empList = await pool.query(`SELECT f_name, l_name, id FROM employees`)

    //Make employee array and map employees as keys to employee ids
    const employees = empList.rows.map((employee) => `${employee.f_name} ${employee.l_name}`)
    let empMap = {}
    empList.rows.forEach((employee) => {
        (empMap[`${employee.f_name} ${employee.l_name}`] = employee.id)
    })

    //As above but for roles
    const rolesList = await pool.query(`SELECT name, id FROM roles`)
    const roles = rolesList.rows.map((row) => row.name)
    let rolesMap = {}
    rolesList.rows.forEach((role) => {
        (rolesMap[role.name] = role.id)
    })

    //Prompt user for nexessary details
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

    //Get employee and role ids from response
    const { employee, role } = response
    const employeeId = empMap[employee]
    const roleId = rolesMap[role]

    //UPDATE employee role 
    pool.query(`UPDATE employees SET roles_id = ${roleId} WHERE employees.id = ${employeeId}`)

    //Return to menu
    init()
}

async function getRoles(){
    //Get roles with ids, titles, salaries, and departments from db
    const data = await pool.query('SELECT roles.id, roles.name AS Role, departments.name AS Department, salary as Salary FROM roles JOIN departments ON roles.departments_id = departments.id;')

    //Display roles in console
    const { rows } = data
    console.table(rows)

    //Return to menu
    init()
}

//Add role
async function addRole(){
    //Get departments from database
    const data = await pool.query(`SELECT name, id FROM departments`)

    //Make department array and map apartments to ids
    const { rows } = data
    let departmentsMap = {}
    rows.forEach((department) => {
        (departmentsMap[department.name] = department.id)
    })
    const departments = rows.map((department) => department.name)

    //Promp user for new role info
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
    
    //Get department id from response
    const { role, salary, department } = response
    const departmentId = departmentsMap[department]

    //POST role into database
   await pool.query(`INSERT INTO roles (name, salary, departments_id) VALUES ('${role}', '${salary}', '${departmentId}');`);
    console.log(`${role} added to roles`)

    //return to menu
    init()
}

//Get departments
async function getDepartments(){

    //Query database for department ids and names
    const data = await pool.query('SELECT departments.id, departments.name AS Department FROM departments;')

    //Display deparments 
    const { rows } = data
    console.table(rows)

    //Return to menu
    init()
}

//Add department
async function addDepartment(){

    //Prompt user for department info
    const response = await inquirer.prompt(
        {
            type: 'input',
            message: 'What is the new department?',
            name: 'department',
        }
    );
    const { department } = response
    
    //Post department to database
    await pool.query(`INSERT INTO departments (name) VALUES ('${department}')`);
    console.log(`${department} added to departments`)

    //Return to menu
    init()
}

//Initialize app
async function init(){

    //Display menu
    const response = await inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Roll', 'View All Departments', 'Add Department', 'Exit'],
        }
    );

    //Call appropriate function according to response
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
    else if (option == 'Exit'){
        return
    }
}

//begin program
init()