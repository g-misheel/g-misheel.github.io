// Grid-Based Game Assignment
// Misheel Gankhuyag
// October 27, 2023
//
// Extra for Experts:
// - abs. - for finding the absolute value of a number
// - floor() - for finding the floor  value of a number
// - createVector() - for creating a new vector with the x and y coordinates of the mouse click position to keep track of the position of the selected circle when the mouse is pressed and dragged


//Variables used for the grid
let rows = 8;
let cols = 8;
let tileSize = 60;
let grid = [];
let circleColors = 6;

//Variables used for tracking the score. level, etc.
let selected = null;
let score = 0;
let level = 1;
let target = 400; //Score needed to complete the level

function setup() {
  createCanvas(cols * tileSize + 200, rows * tileSize); 
  generateGrid();
}

function draw() {
  background(220);
  displayGrid();
  displayScore();
  displayLevel();
  displayTarget();
}

//Generate the initial game grid with random circle colors
function generateGrid() {
  for (let x = 0; x < cols; x++) {
    grid[x] = [];
    for (let y = 0; y < rows; y++) {
      grid[x][y] = floor(random(circleColors));
    }
  }
}

//Display the grid on the canvas
function displayGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let circleType = grid[x][y];
      fill(getColor(circleType));
      ellipse(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, tileSize - 10);
    }
  }

  //Checks if the mouse pointer is within the circle area
  if (selected) {
    let x = floor(mouseX / tileSize);
    let y = floor(mouseY / tileSize);
    let dx = selected.x - x;
    let dy = selected.y - y;

    if (abs(dx) + abs(dy) === 1) {
      ellipse(selected.x * tileSize + tileSize / 2, selected.y * tileSize + tileSize / 2, tileSize - 10);
    }
  }
}

//Use colors to track the circle's 'type'
function getColor(circleType) {
  let colors = [
    color(255, 0, 0),  // Red
    color(0, 255, 0),  // Green
    color(0, 0, 255),  // Blue
    color(255, 255, 0),  // Yellow
    color(255, 0, 255),  // Purple
    color(255, 165, 0)  // Orange
  ];
  return colors[circleType];
}

function mousePressed() {
  let x = floor(mouseX / tileSize);
  let y = floor(mouseY / tileSize);

  if (selected === null) {
    selected = createVector(x, y);
  }
}

function mouseDragged() {
  if (selected !== null) {
    let x = floor(mouseX / tileSize);
    let y = floor(mouseY / tileSize);
    let dx = selected.x - x;
    let dy = selected.y - y;

    if (abs(dx) + abs(dy) === 1) {
      swapCircles(selected.x, selected.y, x, y);
      selected = createVector(x, y);
    }
  }
}

//Reset the selected circle
function mouseReleased() {
  selected = null;
}

//Swap two circles on the grid
function swapCircles(x1, y1, x2, y2) {
  let temp = grid[x1][y1];
  grid[x1][y1] = grid[x2][y2];
  grid[x2][y2] = temp;

  // Check for matches
  if (!checkForMatches()) {
    temp = grid[x1][y1];
    grid[x1][y1] = grid[x2][y2];
    grid[x2][y2] = temp;
  }
}

//Check for horizontal and vertical matches and eliminate them
function checkForMatches() {
  let matches = [];

  //Check horizontal matches
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols - 2; x++) {
      let circleType = grid[x][y];
      if (circleType === grid[x + 1][y] && circleType === grid[x + 2][y]) {
        matches.push({ x, y });
        matches.push({ x: x + 1, y });
        matches.push({ x: x + 2, y });
      }
    }
  }

  //Check vertical matches
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows - 2; y++) {
      let circleType = grid[x][y];
      if (circleType === grid[x][y + 1] && circleType === grid[x][y + 2]) {
        matches.push({ x, y });
        matches.push({ x, y: y + 1 });
        matches.push({ x, y: y + 2 });
      }
    }
  }

  //If matches are found, remove circles, update score, and check for level completion
  if (matches.length > 0) {
    //Remove matched circles
    for (let match of matches) {
      grid[match.x][match.y] = -1; //number that contains the removed circle
    }

    //Update the score
    score += matches.length;

    //Check for level completion
    if (score >= target) {
      level++;
      target += 200; //Increase the target value for the next level
      //Generate a new grid for the next level (you can implement this function)
      generateGrid();
    }

    applyGravity();

    return true;
  }

  return false;
}

//Apply gravity to fill empty spaces after eliminating circles
function applyGravity() {
  for (let x = 0; x < cols; x++) {
    for (let y = rows - 1; y >= 0; y--) {
      if (grid[x][y] === -1) {
        for (let j = y; j >= 0; j--) {
          if (grid[x][j] !== -1) {
            grid[x][y] = grid[x][j];
            grid[x][j] = -1;
            break;
          }
        }
      }
    }
  }

  //Fill empty spaces with new random circles
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y] === -1) {
        grid[x][y] = floor(random(circleColors));
      }
    }
  }
}

function displayScore() {
  fill(0);
  textSize(24);
  text("Score: " + score, width - 180, 30);
}


function displayLevel() {
  fill(0);
  textSize(24);
  text("Level: " + level, width - 180, 60);
}

function displayTarget() {
  fill(0);
  textSize(24);
  text("Target: " + target, width - 180, 90);
}
