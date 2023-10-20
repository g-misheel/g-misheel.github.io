// Arrays Object Notation Assignment
// Misheel Gankhuyag
// October 10, 2023
//
// Extra for Experts:
// - splice()-used for the remove and push function; removes the first block from the tower array, specifying the start index (0) and the number of elements to remove (2). 


let state = "start screen";  //the initial game state
// Initialize variables for button positioning
let leftSide;
let topSide;
let boxWidth;
let boxHeight;

// Array to store stacked blocks
let tower = [];
let blockHeight = 40;
let currentBlock;
let fundamentalBlock;

// Track the game over state
let gameOver;
let gameOverImg; // Load the game over image

// Initialize score, level, speed
let score = 0;
let level = 1;
let fallingSpeed = 5;

function preload() {
  // Load images and store them in variables
  gameOverImg = loadImage("gameover.png");  // Game over image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  // Define button and screen positioning
  boxWidth = 300;
  boxHeight = 50;
  leftSide = (windowWidth - boxWidth) / 2;
  topSide = (windowHeight - boxHeight) / 2;
  initializeGame();

  gameOver = false;
}

function draw() {
  if (state === "start screen") {
    startScreen(); // Display the start screen
  } 
  else if (state === "game") {
    background(255); // Set the game background to white

    // Game starts
    if (!gameOver) {
      drawTower();
      drawCurrentBlock();
      drawScoreAndLevel();
      
      if (fundamentalBlock) {
        fill(fundamentalBlock.color);
        rect(fundamentalBlock.x, fundamentalBlock.y, fundamentalBlock.width, blockHeight);
      }

      if (currentBlock) {
        currentBlock.y += fallingSpeed;  // Move the falling block downward

        // Check if the current block touches the fundamental block
        if (blockTouchesFundamentalBlock(currentBlock)) {
          // If the block touches the fundamental block, add it to the tower.
          addToTower(currentBlock);
          initializeNewBlock();
          fundamentalBlock.y = windowWidth; // Moving the fundamental block off-screen
          score++; // Increase the score

          // Check if the player has reached a new level (every 5 points)
          if (score % 5 === 0) {
            removeAndPushBlocks();
            level++;
            fallingSpeed += 1; // Increase the falling speed
          }
        } 

        // If the block hits the ground, end the game
        else if (blockHitsGround(currentBlock)) {
          showGameOver();
        }
      }

      // Control the movement of the current block using the 'a' and 'd' keys
      if (currentBlock) {
        if (keyIsDown(65)) {
          if (currentBlock.x - 5 >= 0) {
            currentBlock.x -= 5;
          }
        }
        if (keyIsDown(68)) {
          if (currentBlock.x + currentBlock.width + 5 <= windowWidth) {
            currentBlock.x += 5;
          }
        }
      }
    }
  } 
  else {
    showGameOver(); // Display the game over screen
  }
}

// Restart the game
function initializeGame() {
  tower = [];
  score = 0;
  level = 1;
  fallingSpeed = 5;
  initializeFundamentalBlock();
  initializeNewBlock();
}

// Remove the first block from the tower array, when the tower gets too tall
function removeAndPushBlocks() {
  if (tower.length >= 3) {
    tower.splice(0, 3); // Remove the first block
    for (let i = 0; i < tower.length; i++) {
      // Move the remaining blocks up by one block height
      tower[i].y += blockHeight*3;
    }
  }
}

// Fundemental block
function initializeFundamentalBlock() {
  fundamentalBlock = {
    x: windowWidth / 2 - blockHeight / 2,
    color: color(0, 0, 0),
    width: 150,  
    y: windowHeight - blockHeight,
  };
}

// New blocks
function initializeNewBlock() {
  currentBlock = {
    x: random(windowWidth / 3, windowWidth - windowWidth / 3),
    y: 0,
    color: color(random(255), random(255), random(255)),
    width: random(100, 200),  // Random width between 100 and 200
  };
}

//tack the blocks (tower)
function drawTower() {
  for (let i = 0; i < tower.length; i++) {
    let block = tower[i];
    fill(block.color);
    rect(block.x, block.y, block.width, blockHeight);
  }

  if (fundamentalBlock) {
    fill(fundamentalBlock.color);
    rect(fundamentalBlock.x, fundamentalBlock.y, fundamentalBlock.width, blockHeight);
  }
}

function drawCurrentBlock() {
  if (currentBlock) {
    fill(currentBlock.color);
    rect(currentBlock.x, currentBlock.y, currentBlock.width, blockHeight);
  }
}

// Check if a block touches the fundamental block/the last bloxk
function blockTouchesFundamentalBlock(block) {
  if (tower.length > 0) {
    let lastBlock = tower[tower.length - 1];
    if (
      // Check if the new block's y-coordinate between the y-coordinates of the last block
      block.y + blockHeight > lastBlock.y && 
      block.y + blockHeight < lastBlock.y + blockHeight &&
      // Check if the new block's x-coordinate between the x-coordinates of the last block
      block.x + block.width > lastBlock.x + 10 &&
      block.x < (lastBlock.x + lastBlock.width)-10
    ) {
      return true;
    }
  }
  return (
    // Check if the new block's y-coordinate between the y-coordinates of the fundamental block
    block.y + blockHeight > fundamentalBlock.y &&
    // Check if the new block's x-coordinate between the x-coordinates of the fundamental block
    block.x + block.width > fundamentalBlock.x &&
    block.x < fundamentalBlock.x + fundamentalBlock.width 
  );
}

// Check if a block hits the ground
function blockHitsGround(block) {
  return block.y + blockHeight >= windowHeight;
}

// Add a block to the tower
function addToTower(block) {
  block.y = (windowHeight - blockHeight) - blockHeight * (tower.length + 1);
  tower.push(block);
}

// Press the space key to restart the game
function keyPressed() {
  if (keyCode === 32) {
    initializeGame();
    loop();
  }
}

// Display the start screen
function startScreen() {
  background("lightblue")
  noStroke();
  fill("pink");
  rect(leftSide, topSide, boxWidth, boxHeight);

  fill("black");
  textSize(24);
  textAlign(LEFT);
  text("Click to Start", leftSide + boxWidth / 4, topSide + boxHeight / 2 + 10);

  fill("black");
  textSize(24);
  textAlign(CENTER);
  text("Control the movement of the blocks using the 'a'(to left) and 'd'(to right) keys", windowWidth/2, windowHeight - windowHeight/4);
}

// Click to start the game
function mousePressed() {
  if (state === "start screen") {
    let isClicked = isInRect(mouseX, mouseY, topSide, topSide + boxHeight, leftSide, leftSide + boxWidth);
    if (isClicked) {
      state = "game";
    }
  }
}

// Check if the mouse is within a the button
function isInRect(x, y, top, bottom, left, right) {
  return x >= left && x <= right && y >= top && y <= bottom;
}

// Display the game over screen
function showGameOver() {
  noLoop();
  background("pink");
  image(gameOverImg, windowWidth / 2, windowHeight / 2, gameOverImg.width, gameOverImg.height);
  fill("black");
  textSize(24);
  textAlign(CENTER);
  text("Press the space key to restart", windowWidth/2, windowHeight - windowHeight/4);
  fill("darkblue");
  textSize(32);
  text("Final Score: " + score, windowWidth / 2, windowHeight/3);
}

// Display the current score and level
function drawScoreAndLevel() {
  fill(0);
  textSize(22);
  textAlign(RIGHT);
  text(`Score: ${score}`, windowWidth - 20, 30);
  text(`Level: ${level}`, windowWidth - 20, 60);
}