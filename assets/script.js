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

const generateSVG = () => {
  const svgStart = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
  const svgEnd = `</svg>`;
  let shapeElement = '';

  switch (userInput.shape) {
    case 'circle':
      shapeElement = `<circle cx="150" cy="100" r="50" fill="${userInput.shapeColor}" />`;
      break;
    case 'triangle':
      shapeElement = `<polygon points="150,50 100,150 200,150" fill="${userInput.shapeColor}" />`;
      break;
    case 'square':
      shapeElement = `<rect x="100" y="50" width="100" height="100" fill="${userInput.shapeColor}" />`;
      break;
  }

  const textElement = `<text x="150" y="115" font-family="Verdana" font-size="35" fill="${userInput.textColor}" text-anchor="middle">${userInput.text}</text>`;
  
  const svgContent = `${svgStart}${shapeElement}${textElement}${svgEnd}`;

  fs.writeFile('logo.svg', svgContent, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('Generated logo.svg');
    }
  });
};


askText();
