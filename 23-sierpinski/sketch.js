/* eslint-disable indent */
// Sierpinski Triangle Demo
// Misheel
// Jan. 9, 2024
//

let initialTriangle = [
  {x: 400, y: 50},
  {x: 50, y: 550},
  {x: 750, y:550}
];

let debth = 0;
let colors = ["black", "red", "pink", "purple", "yellow", "lightblue", "lightgreen"];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  sierpinski(initialTriangle, debth);
}

function mousePressed() {
  if (debth < colors.length - 1) {
    debth++;
  }
}

function sierpinski(points, degree) {
  fill(colors[degree]);
  triangle(points[0].x, points[0].y, 
    points[1].x, points[1].y, 
    points[2].x, points[2].y);

  if (degree > 0) {
    //draw upper triangle
    sierpinski([points[0],
                getMidPoint(points[0], points[1]),
                getMidPoint(points[0], points[2])],
                degree - 1);

    //draw bottom left
    sierpinski([points[1],
                getMidPoint(points[0], points[1]),
                getMidPoint(points[1], points[2])],
                degree - 1);

    //draw bottom right
    sierpinski([points[2],
                getMidPoint(points[0], points[2]),
                getMidPoint(points[1], points[2])],
                degree - 1);
  }
}

function getMidPoint(point1, point2) {
  let newX = (point1.x + point2.x)/2;
  let newY = (point1.y + point2.y)/2;
  return {x: newX, y: newY};
}