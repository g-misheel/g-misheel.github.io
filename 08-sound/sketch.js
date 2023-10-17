// Sounds and Images Demo
// Misheel Gankhuyag
// October 17, 2023

let ponyo;
let ponyoSound;
let backgroundSound;

function preload(){
  ponyo = loadImage("fish.png");
  ponyoSound = loadSound("sound.ogg");
  backgroundSound = loadSound("backgroundsound.mp3");

  backgroundSound.setVolume(0.5);
  ponyoSound.setVolume(0.1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(ponyo, mouseX, mouseY);
}

function mousePressed(){
  ponyoSound.play();

  if (!backgroundSound.isPlaying()){
    backgroundSound.loop();
  }
}