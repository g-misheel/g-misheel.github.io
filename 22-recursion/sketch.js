// Recursive Circles
// Misheel
// December 22, 2023
//



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  recursiveCircles(width/2, height/2, mouseX);
}

function recursiveCircles(x, y, radius) {
  let grey = map(radius, 30, height/2, 255, 0);
  fill(grey);
  circle(x, y, radius*2);
  if (radius >= 30) {
    recursiveCircles(x - radius/2, y, radius/2);
    recursiveCircles(x + radius/2, y, radius/2);
    // recursiveCircles(x, y + radius/2, radius/2);
    // recursiveCircles(x, y - radius/2, radius/2);
  }
}