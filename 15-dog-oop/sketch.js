// Dog OOP Demo
// Misheel Gankhuyag
// Nov. 14, 2023


class Dog { //classes are written w a capital letter
  constructor(name, color, breed, age, size) {
    this.name = name;
    this.color = color;
    this.breed = breed;
    this.age = age;
    this.size = size;
  }

  bark() { //function but no need to write the word function
    console.log("Arf! says " + this.name);
  }
}

let spot = new Dog("Spot", "black", "poodle", 3 , "smalllish");
let rover = new Dog("Rover", "white", "German Shepherd", 5 , "big");


function setup() {
  createCanvas(windowWidth, windowHeight);
  spot.bark();
  rover.bark();
}

function draw() {
  background(220);
}
