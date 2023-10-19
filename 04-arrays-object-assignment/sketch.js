// Arrays Object Notation Assignment
// Misheel Gankhuyag
// October 10, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let state = "start screen";
let leftSide;
let topSide;
let boxWidth;
let boxHeight;

let tower = [];
let blockHeight = 40;
let currentBlock;
let fundamentalBlock;

let gameOver;
let gameOverImg;

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

  boxWidth = 300;
  boxHeight = 50;
  leftSide = (windowWidth - boxWidth) / 2;
  topSide = (windowHeight - boxHeight) / 2;
  initializeGame();

  gameOver = false;
}

function draw() {
  if (state === "start screen") {
    startScreen();
  } else if (state === "game") {
    background("lightblue");

    if (!gameOver) {
      drawTower();
      drawCurrentBlock();
      drawScoreAndLevel();

      if (currentBlock) {
        currentBlock.y += fallingSpeed;

        if (blockTouchesFundamentalBlock(currentBlock)) {
          addToTower(currentBlock);
          initializeNewBlock();
          score++;
          if (score % 5 === 0) {
            removeAndPushBlocks();
            level++;
            fallingSpeed += 1;
          }
        } else if (blockHitsGround(currentBlock)) {
          showGameOver();
        }
      }

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
  } else {
    showGameOver();
  }
}

function initializeGame() {
  tower = [];
  score = 0;
  level = 1;
  fallingSpeed = 5;
  initializeFundamentalBlock();
  initializeNewBlock();
}

function removeAndPushBlocks() {
  if (tower.length >= 5) {
    tower.shift();
  }
}

function initializeFundamentalBlock() {
  fundamentalBlock = {
    x: windowWidth / 2 - blockHeight / 2,
    color: color(0, 0, 0),
    width: 150,  // Set a fixed width for the fundamental block
  };
}

function initializeNewBlock() {
  currentBlock = {
    x: random(windowWidth / 4, windowWidth - windowWidth / 4),
    y: 0,
    color: color(random(255), random(255), random(255)),
    width: random(100, 200),  // Random width between 100 and 200
  };
}

function drawTower() {
  for (let i = 0; i < tower.length; i++) {
    let block = tower[i];
    fill(block.color);
    rect(block.x, block.y, block.width, blockHeight);
  }

  fill(fundamentalBlock.color);
  rect(fundamentalBlock.x, windowHeight - (blockHeight + 5), fundamentalBlock.width, blockHeight);
}

function drawCurrentBlock() {
  if (currentBlock) {
    fill(currentBlock.color);
    rect(currentBlock.x, currentBlock.y, currentBlock.width, blockHeight);
  }
}

function blockTouchesFundamentalBlock(block) {
  let fundamentalTopY = windowHeight - blockHeight;
  return (
    block.x + block.width > fundamentalBlock.x &&
    block.x < fundamentalBlock.x + fundamentalBlock.width &&
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
    initializeGame();
    loop();
  }
}

function startScreen() {
  noStroke();
  fill("lightgreen");
  rect(leftSide, topSide, boxWidth, boxHeight);

  fill("black");
  textSize(24);
  text("Click to Start", leftSide + boxWidth / 4, topSide + boxHeight / 2 + 10);
}

function mousePressed() {
  if (state === "start screen") {
    let isClicked = isInRect(mouseX, mouseY, topSide, topSide + boxHeight, leftSide, leftSide + boxWidth);
    if (isClicked) {
      state = "game";
    }
  }
}

function isInRect(x, y, top, bottom, left, right) {
  return x >= left && x <= right && y >= top && y <= bottom;
}

function showGameOver() {
  noLoop();
  image(gameOverImg, windowWidth / 2, windowHeight / 2, gameOverImg.width, gameOverImg.height);
  console.log("Game Over");
}

function drawScoreAndLevel() {
  fill(0);
  textSize(18);
  textAlign(RIGHT);
  text(`Score: ${score}`, windowWidth - 20, 30);
  text(`Level: ${level}`, windowWidth - 20, 60);
}

