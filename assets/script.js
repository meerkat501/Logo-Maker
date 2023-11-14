const inquirer = require('inquirer');
const fs = require('fs');

const userInput = {};

const askText = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: (input) => input.length <= 3
    }
  ]).then(answers => {
    userInput.text = answers.text;
    askTextColor();
  });
};

const askTextColor = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (keyword or hex):'
    }
  ]).then(answers => {
    userInput.textColor = answers.textColor;
    askShape();
  });
};

const askShape = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['Circle', 'Triangle', 'Square']
    }
  ]).then(answers => {
    userInput.shape = answers.shape.toLowerCase();
    askShapeColor();
  });
};

const askShapeColor = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (keyword or hex):'
    }
  ]).then(answers => {
    userInput.shapeColor = answers.shapeColor;
    generateSVG();
  });
};

