//Misheel Ganlhuyag
//Interactive Scene
//Computer Scvience 30
//September 25, 2023

//"wow me" factor: 'push()'function, used for the movement and overall structure of the obstacles//

let state = "start screen";  // The current game state (start screen or game)
let leftSide;  
let topSide;  
let boxWidth;  
let boxHeight;  

let x, y;  
let ponyoVelocity;  // Vertical velocity of the character
let gravity;  // Acceleration due to gravity
let obstacles, score;  
let gameOver; 
let ponyoScale;  
let obstacleSpacing;  
let obstacleSpeed;  
let obstacleWidth;  
let obstacleHeight;  
let currentLevel; 
let ponyoImg;
let gameOverImg;
let scoreImg;
let gameScale;
let scoreScale;


let backgroundImage;  // Stores the background image

// Stores obstacle images
let obstacleImages = [];

function preload() {
  // Load images and store them in variables
  ponyoImg = loadImage("ponyo.png");  // Character image
  gameOverImg = loadImage("gameover.png");  // Game over image
  scoreImg = loadImage("score.png");  // Score image
  // Background image 
  backgroundImage = loadImage("mainbackground.jpg");
  // Obstacle images 
  obstacleImages.push(loadImage("fish.png"));
  obstacleImages.push(loadImage("dust.png"));
  obstacleImages.push(loadImage("rocks.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight / 1.5);
  x = 50;  // Initial x-coordinate of the character
  y = height - x;  // Initial y-coordinate of the character
  boxWidth = 200;  // Width of the start button rectangle
  boxHeight = 50;  // Height of the start button rectangle
  leftSide = (windowWidth - boxWidth) / 2;  // Centered horizontally
  topSide = (windowHeight - boxHeight) / 2;  // Centered vertically
  ponyoVelocity = 0;
  gravity = 1;
  obstacles = [];  
  score = 0;
  gameOver = false;
  ponyoScale = 0.35;
  gameScale = 0.8;
  scoreScale = 0.35;
  obstacleSpacing = 90;  
  obstacleSpeed = 6;  // Initial obstacle speed
  obstacleWidth = 55;  
  obstacleHeight = 45;  
  currentLevel = 1;  // Starting level
}

function draw() {
  // Draw the background image
  image(backgroundImage, 0, 0, width, height);

  if (state === "start screen") {
    startScreen();  // Display the start screen
  } 
  else if (state === "game") {
    background("lightblue");

    if (!gameOver) {
      // Spawn obstacles periodically
      if (frameCount % obstacleSpacing === 0) {
        let obstacleY = random(height - 100, height - 50);
        let randomObstacleImage = random(obstacleImages);
        obstacles.push({ x: width, y: obstacleY, image: randomObstacleImage });
      }

      // Move and display obstacles, check for collisions
      for (let i = obstacles.length - 1; i >= 0; i--) {
        moveObstacle(obstacles[i]);
        showObstacle(obstacles[i]);
        if (hits(x, y, obstacles[i].x, obstacles[i].y)) {
          gameOver = true;
        }
      }

      moveSquare();  // Move the character
      showSquare();  // Display the character
      showPonyo();  // Display the character's image

      // Remove off-screen obstacles and update the score
      for (let i = obstacles.length - 1; i >= 0; i--) {
        if (obstacles[i].x < -obstacleWidth) {
          obstacles.splice(i, 1);
          score++;
        }
      }

      // Display the player's score
      showScore();  
      fill("darkblue");
      textSize(32);
      text(score, 115, 33);  
      fill("darkblue");
      textSize(32);
      text("Level: " + currentLevel, width - width / 5, 33);  // Display current level

      // Increase the game level and adjust obstacle parameters
      if (score >= currentLevel * 10) {
        currentLevel++;
        obstacleSpacing -= 20;  // Reduce spacing between obstacles
        obstacleSpeed += 1;  // Increase obstacle speed
      }
    } 
    else {
      showGameOver();  // Display the game over screen
    }
  }
}

// Handle character jump when the spacebar is pressed
function keyPressed() {
  if (state === "game" && key === " "  && !gameOver && y === height - 50) {
    ponyoVelocity = -20;
  }
}

// Update character's vertical position and velocity
function moveSquare() {
  ponyoVelocity += gravity;
  y += ponyoVelocity;

  if (y > height - 50) {
    y = height - 50;
    ponyoVelocity = 0;
  }
}

// Display the character on the screen
function showSquare() {
  fill(0);
  square(x, y, 10);
}

// Move obstacles horizontally
function moveObstacle(obs) {
  obs.x -= obstacleSpeed;
}

// Display obstacles on the screen
function showObstacle(obs) {
  image(obs.image, obs.x, obs.y, obstacleWidth, obstacleHeight);
}

// Check for collisions between character and obstacles
function hits(x1, y1, x2, y2) {
  let d = dist(x1, y1, x2, y2);
  return d < 30;
}

// Display the character's image on the screen
function showPonyo() {
  image(ponyoImg, x, y, ponyoImg.width * ponyoScale, ponyoImg.height * ponyoScale);
  imageMode(CENTER);
}

// Display the game over screen
function showGameOver() {
  image(gameOverImg, width / 2, height / 2, gameOverImg.width * gameScale, gameOverImg.height * gameScale);
  imageMode(CENTER);
  fill("darkblue");
  textSize(32);
  text("Final Score: " + score, width / 2 - 90, height - 40);
}

// Display the player's score
function showScore() {
  image(scoreImg, 60, 20, scoreImg.width * scoreScale, scoreImg.height * scoreScale);
}

// Display the start screen
function startScreen() {
  image(backgroundImage, 0, 0, width, height);

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
