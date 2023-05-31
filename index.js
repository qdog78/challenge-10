const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptForText() {
  return new Promise((resolve) => {
    rl.question('What text do you want on your logo? (3 letters max): ', (text) => {
      resolve(text);
    });
  });
}

function promptForTextColor() {
  return new Promise((resolve) => {
    rl.question('What color do you want your text: ', (color) => {
      resolve(color);
    });
  });
}

function promptForShape() {
  return new Promise((resolve) => {
    rl.question('circle, triangle, or square: ', (shape) => {
      resolve(shape);
    });
  });
}

function promptForShapeColor() {
  return new Promise((resolve) => {
    rl.question(' shape color: ', (color) => {
      resolve(color);
    });
  });
}
//place text then shape otherwise the shape will cover the text
function generateLogo(text, textColor, shape, shapeColor) {
  const shapeElement = getShapeElement(shape);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" height="200" width="300">
    <style>
      text {
        font-size: 60px;
        font-family: Arial, sans-serif;
        fill: ${textColor};
      }
      .shape {
        fill: ${shapeColor};
      }
    </style>
    ${shapeElement}
    <text x="150" y="100" text-anchor="middle">${text}</text>
  </svg>`;

  fs.writeFileSync('logo.svg', svg, { encoding: 'utf8' });
  console.log('Generated logo.svg');
}

function getShapeElement(shape) {
  switch (shape) {
    case 'circle':
      return '<circle class="shape" cx="150" cy="100" r="75" />';
    case 'triangle':
      return '<polygon class="shape" points="75,150 225,150 150,25" />';
    case 'square':
      return '<rect class="shape" x="50" y="50" width="200" height="200" />';
    default:
      return '';
  }
}


async function run() {
  const text = await promptForText();
  const textColor = await promptForTextColor();
  const shape = await promptForShape();
  const shapeColor = await promptForShapeColor();

  generateLogo(text, textColor, shape, shapeColor);

  rl.close();
}

run();
