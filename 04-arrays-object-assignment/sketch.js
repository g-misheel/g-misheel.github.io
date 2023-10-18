// Arrays Object Notation Assignment
// Misheel Gankhuyag
// October 10, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let state = "start screen";  // The current game state (start screen or game)
let leftSide;  
let topSide;  
let boxWidth;  
let boxHeight;

let tower = [];
let blockHeight = 40;
let currentBlock;
let blockWidth = 150;

let fundamentalBlock;

let gameOver;
let gameOverImg;

function preload() {
  // Load images and store them in variables
  gameOverImg = loadImage("gameover.png");  // Game over image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  boxWidth = 300;  // Width of the start button rectangle
  boxHeight = 50;  // Height of the start button rectangle
  leftSide = (windowWidth - boxWidth) / 2;  // Centered horizontally
  topSide = (windowHeight - boxHeight) / 2;  // Centered vertically
  initializeGame();

  gameOver = false;
}

function draw() {
  if (state === "start screen") {
    startScreen();  // Display the start screen
  } 

  //Start game
  else if (state === "game") {
    background("lightblue");
    
    if (!gameOver) {
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
          showGameOver();
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
  }

  else {
    showGameOver();  // Display the game over screen
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


function keyPressed() {
  if (keyCode === 32) {
    // Space key to start a new game
    initializeGame();
    loop();
  }
}


// Display the start screen
function startScreen() {
  noStroke();
  fill("lightgreen");
  rect(leftSide, topSide, boxWidth, boxHeight);

  fill("black");
  textSize(24);
  text("Click to Start", leftSide + boxWidth / 4, topSide + boxHeight / 2 + 10); // Centered text
}

// Handle mouse click to start the game
function mousePressed() {
  if (state === "start screen") {
    let isClicked = isInRect(mouseX, mouseY, topSide, topSide + boxHeight, leftSide, leftSide + boxWidth);
    if (isClicked) {
      state = "game";
    }
  }
}

// Check if a point is inside the 'start' button
function isInRect(x, y, top, bottom, left, right) {
  return x >= left && x <= right && y >= top && y <= bottom;
}

//Game over screen
function showGameOver() {
  noLoop();
  image(gameOverImg, windowWidth / 2, windowHeight / 2, gameOverImg.width , gameOverImg.height);
  console.log("Game Over");
}

