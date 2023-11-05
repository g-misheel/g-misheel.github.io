// Grid-Based Game Assignment
// Misheel Gankhuyag
// October 27, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid;
const GRID_SIZE = 5;

let cellSize;


function setup() {
  createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);


  if (height > width) {
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


function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 0) {
        fill("white");
        stroke("pink");
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
      }
      
    }
  }
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