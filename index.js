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

const managerQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is your ID?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email?',
    validate: function (input) {
      // Use a regular expression for basic email validation
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(input) ? true : 'Please enter a valid email address';
    }
  },
  {
    type: 'input',
    name: 'office number',
    message: 'What is your office number?',
  },
];

const engineerQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is your ID?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email?',
    validate: function (input) {
      // Use a regular expression for basic email validation
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(input) ? true : 'Please enter a valid email address';
    }
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub Username',
  },
];

const internQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is your ID?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email?',
    validate: function (input) {
      // Use a regular expression for basic email validation
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(input) ? true : 'Please enter a valid email address';
    }
  },
  {
    type: 'input',
    name: 'school',
    message: 'What is your school?',
  },
];

const team = [];

function gatherManagerInfo() {
  inquirer
    .prompt(managerQuestions)
    .then((answers) => {
      const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      team.push(manager);
      promptUser();
    });
}

function gatherEngineerInfo() {
    inquirer
    .prompt(engineerQuestions)
    .then((answers) => {
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      team.push(engineer);
      promptUser();
    });
}

function gatherInternInfo() {
   inquirer
    .prompt(internQuestions)
    .then((answers) => {
      const intern = new Engineer(answers.name, answers.id, answers.email, answers.school);
      team.push(intern);
      promptUser();
    });
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What type of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'Finish building the team'],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Engineer':
          gatherEngineerInfo();
          break;
        case 'Intern':
          gatherInternInfo();
          break;
        case 'Finish building the team':
          generateHTML();
          break;
      }
    });
}

function generateHTML() {
  const html = render(team);
  fs.writeFileSync('./output/team.html', html);
  console.log('HTML file generated successfully!');
}

// Start the application by gathering Manager information
gatherManagerInfo();