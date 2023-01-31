const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
// Write code in `index.js` that uses inquirer to gather information about the development team members 
// and creates objects for each team member using the correct classes as blueprints.
const employees = [];  //need this empty array to hold the employess created(manager, intern, engineer). 

// * When a user starts the application then they are prompted to enter the **team manager**’s:
// * Name
// * Employee ID
// * Email address
// * Office number
function init(){
inquirer.prompt([
    {   
        type: "input",
        name: "nameOfManager",
        message:"Please type the name of the manager"
},
    {
        type: "input",
        name: "idOfManager",
        message:"Please type the Id of the manager"
},
    {
        type: "input",
        name: "emailOfManager",
        message:"PLease type email of the manager"
},
    {
        type: "input",
        name: "officeNumberOfManager",
        message:"Please type the contact office number of the manager"
} 
]).then(function(answer){
    const newManager = new Manager(
        answer.nameOfManager,
        answer.idOfManager,
        answer.emailOfManager,
        answer.officeNumberOfManager
        )
    employees.push(newManager);  //pushing the manager created into the empty employer array
    ChoiceOptionMenu(); //function to add new employee, after the manager added, this function runs 
                        //have three choices, two to add new employee and one to finish building team
})
} 
// * When a user enters those requirements then the user is presented with a menu with the option to:
//       * Add an engineer
//       * Add an intern 
//       * Finish building the team

function ChoiceOptionMenu() {
    console.log(employees);

    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message:"Please choose one of the following?",
            choice:["add Engineer", "add Intern", "Finish building the team"]
        }   
      
]).then(function(answer){
// * When a user selects the **engineer** option then a user is prompted to enter the 
// following and then the user is taken back to the menu:
// * Engineer's Name
// * ID
// * Email
// * GitHub username
if (answer.choice === "add Engineer") {
    inquirer.prompt([
        {
                type: "input",
                name: "nameOfEngineer",
                message:"Please type the name of the engineer"
        },
        {
                type: "input",
                name: "idOfEngineer",
                message:"Please type the Id of Engineer"
        },
        
        {
                type: "input",
                name: "emailOfEngineer",
                message:"Please type the email of the engineer"
        },

        {
                type: "input",
                name: "githubOfEngineer",
                message:"PLease type enginner github username"
        }

    ]).then(function(answer){
        const newEngineer = new Engineer (
            answer.nameOfEngineer,
            answer.idOfEngineer,
            answer.emailOfEngineer,
            answer.githubOfEngineer
            );
        employees.push(newEngineer); //pushing engineer to the employee array
        ChoiceOptionMenu(); //start all over again to add another employee
    })
}

// * When a user selects the intern option then a user is prompted to enter the following and then the user is taken back to the menu:
//       * Intern’s name
//       * ID
//       * Email
//       * School

if (answer.choice === "add intern") {
    inquirer.prompt([
        {
            type: "input",
            name: "nameOfIntern",
            message:"Please type the name of intern"
        },

        {
            type: "input",
            name: "idOfIntern",
            message:"Please type the Id of Intern"
        },
        {
            type: "input",
            name: "emailOfIntern",
            message:"Please type the email of the intern"
        },

        {
            type: "input",
            name: "nameOfInternSchool",
            message:"Please type the name of school the intern goes toor have gone to"
        }


    ]).then(function(answer){
        const newIntern = new Intern (
            answer.nameOfIntern,
            answer.idOfIntern,
            answer.emailOfIntern,
            answer.nameOfInternSchool
            );
        employees.push(newIntern); //pushing intern to the employee array
        ChoiceOptionMenu(); //start all over again to add another employee
    })
}
// * When a user decides to finish building their team then they exit the application, and the HTML is generated.

        
    if(answer.choice === "Finish building the team"){
        function createTeam() {
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR);
            } 

// * Call the `render` function (provided for you) and pass in an array containing all employee objects; 
// * The `render` function will generate and return a block of HTML including templated divs for each employee!
else {
    fs.writeFileSync(outputPath, render(employees), 'utf-8');
    console.log('team.html file created in the output folder');
    }
}
    }
})
}

init();