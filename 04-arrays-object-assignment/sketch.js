// Arrays Object Notation Assignment
// Misheel Gankhuyag
// October 10, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let tower = [];
let blockHeight = 40;

let currentBlock;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeGame();
}

function draw() {
  background(220);
  drawTower();
  drawCurrentBlock();

  if (currentBlock) {
    currentBlock.y += 5; // Falling speed
    if (blockStacksOnTower(currentBlock)) {
      // Add the block to the tower
      addToTower(currentBlock);
      initializeNewBlock();
    } 
    
    else if (blockHitsGround(currentBlock)) {
      // If the block touches the ground, the game is over
      gameOver();
    }
  }

  if (currentBlock) {
    if (keyIsDown(65)) {
      // A key (move left)
      if (currentBlock.x - 5 >= 0) {
        currentBlock.x -= 5;
      }
    }
    if (keyIsDown(68)) {
      // D key (move right)
      if (currentBlock.x + currentBlock.width + 5 <= windowWidth) {
        currentBlock.x += 5;
      }
    }
  }
}

function initializeGame() {
  tower = [];
  initializeNewBlock();
}

function initializeNewBlock() {
  currentBlock = {
    x: random(windowWidth / 4, windowWidth - windowWidth / 4),
    y: 0,
    color: color(random(255), random(255), random(255)),
    width: random(80, 150), // Randomize the width
  };
}

function drawTower() {
  for (let i = 0; i < tower.length; i++) {
    let block = tower[i];
    fill(block.color);
    rect(block.x, block.y, block.width, blockHeight);
  }
}

function drawCurrentBlock() {
  if (currentBlock) {
    fill(currentBlock.color);
    rect(currentBlock.x, currentBlock.y, currentBlock.width, blockHeight);
  }
}

function blockStacksOnTower(block) {
  for (let i = tower.length - 1; i >= 0; i--) {
    let existingBlock = tower[i];
    if ( block.x + block.width > existingBlock.x && block.x < existingBlock.x + existingBlock.width && block.y + blockHeight === existingBlock.y) {
      return true;
    }
  }
  return false;
}

function blockHitsGround(block) {
  return block.y + blockHeight >= windowHeight;
}

function addToTower(block) {
  block.y = windowHeight - blockHeight * (tower.length + 1);
  tower.push(block);
}

function gameOver() {
  noLoop();
  console.log("Game Over");
}

function keyPressed() {
  if (keyCode === 32) {
    // Space key to start a new game
    initializeGame();
    loop();
  }
}


