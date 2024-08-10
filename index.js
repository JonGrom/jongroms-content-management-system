const inquirer = require('inquirer')

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

async function init(){
    await inquirer.prompt([
    {type: 'input', message: 'What is your business acronym? (max of three characters)', name: "text"},
    {type: 'input', message: 'What color is the text (by name or "#<6-hexcode-digits>")?', name: "textColor"},
    {type: 'list', message: 'Choose a shape for your logo!', name: "shape", choices: ['circle', 'square', 'triangle']},
    {type: 'input', message: 'What color is the shape (by name or hexcode digits)?', name: "shapeColor"},
])
const logo = buildLogo(response)
console.log(logo.renderShape())
writeFile(`logo.svg`, logo.renderShape(), (err) => {
    err ? console.log(err) : console.log('logo generated')
})
}

//begin program
init()