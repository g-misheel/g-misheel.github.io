// "Ball Object Notation" Demo
// Oct 5, 2023

let theBall = {
  x: 100,
  y: 100,
  radius: 25,
  r: 255,
  g: 0,
  b: 0,
  dx: -4,
  dy: 3,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}


function displayBall() {
  fill(theBall.r, theBall.g, theBall.b);
  circle(theBall.x, theBall.y, theBall.radius * 2);
}

function moveBall(){
  theBall.x += theBall.dx;
  theBall.y += theBall.dy;

  // off the right side
  if (theBall.x - theBall.radius > width) {
    theBall.x = 0 - theBall.radius;
  }

  // off the left side
  if (theBall.x < 0 - theBall.radius){
    theBall.x = width + theBall.radius;
  }
  
  // off the  bottom
  else if (theBall.y - theBall.radius > height) {
    theBall.y = 0 - theBall.radius;
  }

  // off the top
  if (theBall.y < 0 - theBall.radius){
    theBall.y = height + theBall.radius;
  }
  
}