// Grid Neighbours Demo
// Misheel Gankhuyag
// October 25


let grid;
const GRID_SIZE = 15;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  if (height > width){
    cellSize = width/GRID_SIZE;
  }

  else {
    cellSize = height/GRID_SIZE;
  }
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  toggleCell(x, y); //current cell
  toggleCell(x, y-1); //north neighbour
  toggleCell(x, y+1); //south neighbour
  toggleCell(x+1, y); //east neighbour
  toggleCell(x-1, y); //west neighbour
}

function toggleCell(x, y) {
  //check that we're within the grid and toggle
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 0) {
        fill(255);
      }
      else if (grid[y][x] === 1) {
        fill(0);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}