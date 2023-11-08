// Grid-Based Game Assignment
// Misheel Gankhuyag
// October 27, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// let grid;
// const GRID_SIZE = 5;

// let cellSize;

// let colors = ["pink", "blue", "light green", "red", "yellow", "purple", "light blue"];


// function setup() {
//   createCanvas(windowWidth * 0.8, windowHeight * 0.8);
//   grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);


//   if (height > width) {
//     cellSize = width/GRID_SIZE;
//   }
//   else {
//     cellSize = height/GRID_SIZE;
//   }
// }

// function draw() {
//   background(220);
//   displayGrid();
// }


// function displayGrid() {
//   for (let y = 0; y < GRID_SIZE; y++) {
//     for (let x = 0; x < GRID_SIZE; x++) {
//       if (grid[y][x] === 0) {
//         fill("white");
//         stroke("pink");
//         rect(x*cellSize, y*cellSize, cellSize, cellSize);
//       }
//       ellipseMode(CORNER);
//       let margin = 5;
//       stroke(0);
//       // fill(random(colors));
//       circle(x*cellSize + margin, y*cellSize + margin, cellSize - margin*2);
//     }
//   }
// }


// function generateEmptyGrid(cols, rows) {
//   let newGrid = [];
//   for (let y = 0; y < rows; y++) {
//     newGrid.push([]);
//     for (let x = 0; x < cols; x++) {
//       newGrid[y].push(0);
//     }
//   }
//   return newGrid;
// }



let rows = 8;
let cols = 8;
let tileSize = 60;
let grid = [];
let candyColors = 6;

let selected = null;
let score = 0;
let moves = 20;
let level = 1;
let objective = 2000; // Score needed to complete the level

function setup() {
  createCanvas(cols * tileSize, rows * tileSize);
  generateGrid();
}

function draw() {
  background(220);
  displayGrid();
  displayScore();
  displayMoves();
  displayLevel();
  displayObjective();
}

function generateGrid() {
  for (let x = 0; x < cols; x++) {
    grid[x] = [];
    for (let y = 0; y < rows; y++) {
      grid[x][y] = floor(random(candyColors));
    }
  }
}

function displayGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let candyType = grid[x][y];
      fill(getColor(candyType));
      ellipse(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, tileSize - 10);
    }
  }

  if (selected) {
    let x = floor(mouseX / tileSize);
    let y = floor(mouseY / tileSize);
    let dx = selected.x - x;
    let dy = selected.y - y;

    if (abs(dx) + abs(dy) === 1) {
      fill(255, 0, 0, 100); // Highlight the selected candy
      ellipse(selected.x * tileSize + tileSize / 2, selected.y * tileSize + tileSize / 2, tileSize - 10);
    }
  }
}

function getColor(candyType) {
  let colors = [
    color(255, 0, 0),  // Red
    color(0, 255, 0),  // Green
    color(0, 0, 255),  // Blue
    color(255, 255, 0),  // Yellow
    color(255, 0, 255),  // Purple
    color(255, 165, 0)  // Orange
  ];
  return colors[candyType];
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
      swapCandies(selected.x, selected.y, x, y);
      selected = createVector(x, y);
    }
  }
}

function mouseReleased() {
  selected = null;
}

function swapCandies(x1, y1, x2, y2) {
  let temp = grid[x1][y1];
  grid[x1][y1] = grid[x2][y2];
  grid[x2][y2] = temp;

  if (!checkForMatches()) {
    // If the swap doesn't create matches, swap back
    temp = grid[x1][y1];
    grid[x1][y1] = grid[x2][y2];
    grid[x2][y2] = temp;
  }
}

function checkForMatches() {
  let matches = [];

  // Check horizontal matches
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols - 2; x++) {
      let candyType = grid[x][y];
      if (candyType === grid[x + 1][y] && candyType === grid[x + 2][y]) {
        matches.push({ x, y });
        matches.push({ x: x + 1, y });
        matches.push({ x: x + 2, y });
      }
    }
  }

  // Check vertical matches
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows - 2; y++) {
      let candyType = grid[x][y];
      if (candyType === grid[x][y + 1] && candyType === grid[x][y + 2]) {
        matches.push({ x, y });
        matches.push({ x, y: y + 1 });
        matches.push({ x, y: y + 2 });
      }
    }
  }

  if (matches.length > 0) {
    // Eliminate matched candies
    for (let match of matches) {
      grid[match.x][match.y] = -1; // Use a special value to mark candies for elimination
    }

    // Update the score
    score += matches.length;

    // Check for level completion
    if (score >= objective) {
      level++;
      moves = 20; // Reset moves for the next level
      objective += 1000; // Increase the objective for the next level
      // Generate a new grid for the next level (you can implement this function)
      generateGrid();
    }

    applyGravity();
    
    return true;
  }

  return false;
}

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

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y] === -1) {
        grid[x][y] = floor(random(candyColors));
      }
    }
  }
}

function displayScore() {
  fill(0);
  textSize(24);
  text(`Score: ${score}`, 10, height - 10);
}

function displayMoves() {
  fill(0);
  textSize(24);
  text(`Moves: ${moves}`, width - 100, height - 10);
}

function displayLevel() {
  fill(0);
  textSize(24);
  text(`Level: ${level}`, 10, 30);
}

function displayObjective() {
  fill(0);
  textSize(24);
  text(`Objective: ${objective}`, width - 200, 30);
}
