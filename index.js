const inquirer = require('inquirer');
const fs = require("fs");
const path = require("path");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./src/page-template.js");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


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

// function that gather Manager information

function gatherManagerInfo() {
  inquirer
    .prompt(managerQuestions)
    .then((answers) => {
      const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      team.push(manager);
      promptUser();
    });
}

// function that engineer Manager information

function gatherEngineerInfo() {
    inquirer
    .prompt(engineerQuestions)
    .then((answers) => {
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      team.push(engineer);
      promptUser();
    });
}

// function that gather intern information

function gatherInternInfo() {
   inquirer
    .prompt(internQuestions)
    .then((answers) => {
      const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
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
  fs.writeFileSync(outputPath, html);
  console.log('HTML file generated successfully!');
}

// Start the application by gathering Manager information
gatherManagerInfo();