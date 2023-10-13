// Arrays Object Notation Assignment
// Misheel Gankhuyag
// October 10, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let tower = [];
let blockWidth = 150;
let blockHeight = 40;

let fundamentalBlock;
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
    if (blockTouchesFundamentalBlock(currentBlock)) {
      // If the block touches the fundamental block, it's added to the tower.
      addToTower(currentBlock);
      initializeNewBlock();
    } 
    else if (blockHitsGround(currentBlock)) {
      // If the block touches the ground without landing on the fundamental block, the game is over.
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
      if (currentBlock.x + blockWidth + 5 <= windowWidth) {
        currentBlock.x += 5;
      }
    }
  }
}

function initializeGame() {
  tower = [];
  initializeFundamentalBlock();
  initializeNewBlock();
}

function initializeFundamentalBlock() {
  fundamentalBlock = {
    x: windowWidth / 2 - blockWidth / 2,
    color: color(0, 0, 0), // Fundamental block is black
  };
}

function initializeNewBlock() {
  currentBlock = {
    x: random(windowWidth/4, windowWidth - windowWidth/4),
    y: 0,
    color: color(random(255), random(255), random(255)),
  };
}

function drawTower() {
  for (let i = 0; i < tower.length; i++) {
    let block = tower[i];
    fill(block.color);
    rect(block.x, block.y, blockWidth, blockHeight);
  }

  fill(fundamentalBlock.color);
  rect(fundamentalBlock.x, windowHeight - blockHeight, blockWidth, blockHeight);
}

function drawCurrentBlock() {
  if (currentBlock) {
    fill(currentBlock.color);
    rect(currentBlock.x, currentBlock.y, blockWidth, blockHeight);
  }
}

function blockTouchesFundamentalBlock(block) {
  let fundamentalTopY = windowHeight - blockHeight;
  return (
    block.x + blockWidth > fundamentalBlock.x &&
    block.x < fundamentalBlock.x + blockWidth &&
    block.y + blockHeight === fundamentalTopY
  );
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

