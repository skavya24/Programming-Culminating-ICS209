/*
   Description: Simon Memory Game
   Author: Kavya S
   Date of last edit: Jun 15
*/
/*Program functionality errors: 
  [supposed to] light up in order based on the randomSequence
  frameRate messes up userClicking experience
  couldn't figure out how to light up color one-by-one
  instead lights up all colors in sequence at same time */

//Determines the levels of the game after each sequence
let currentLevel = 0;
let updatedLevel = 0;
//Arrays to store the numbers(representing 4 colors) in sequence
let userClicked = [];
let randomSequence = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  //for the first color light up 
  randomSequence.push(Math.floor(random(0, 4)));
  //to set up the 4 buttons representing each color
  button1 = createButton("click");
  button1.position(windowWidth / 8 * 3, windowHeight / 8 * 2);
  button1.mousePressed(blueButton);
  button2 = createButton("click");
  button2.position(windowWidth / 8 * 5, windowHeight / 8 * 2);
  button2.mousePressed(redButton);
  button3 = createButton("click");
  button3.position(windowWidth / 8 * 3, windowHeight / 8 * 4);
  button3.mousePressed(greenButton);
  button4 = createButton("click");
  button4.position(windowWidth / 8 * 5, windowHeight / 8 * 4);
  button4.mousePressed(yellowButton);
  //prints sequence to console (0=blue; 1=red; 2=green; 3=yellow) 
  print("seq: " + randomSequence);
  print("levels: " + updatedLevel);
  print("user: " + userClicked);
  startScreen();
  lightup();
  updatedLevel += 1;
}

function draw() {
  //displays a non-lit-up rect when not clicked 
  startScreen();

  //lights up the clicked rect
  if (mouseIsPressed == true) {
    if (mouseX >= windowWidth / 4 && mouseY >= windowHeight / 8 && mouseX <= windowWidth / 4 * 2 && mouseY <= windowHeight / 8 * 3) {
      blueLight();
    } else if (mouseX >= windowWidth / 4 * 2 && mouseY >= windowHeight / 8 * 3 && mouseX <= windowWidth / 4 * 3 && mouseY <= windowHeight / 8 * 5) {
      yellowLight();
    } else if (mouseX >= windowWidth / 4 * 2 && mouseY >= windowHeight / 8 && mouseX <= windowWidth / 4 * 3 && mouseY <= windowHeight / 8 * 3) {
      redLight();
    } else {
      greenLight();
    }
  }
  
  //checks if both arrarys are same
  for(i=0; i < userClicked.length; i++){
    if (userClicked[i] == randomSequence[i]) {
      if(userClicked.length == randomSequence.length){
        randomSequence.push(Math.floor(random(0, 4)));
        userClicked.splice(0, userClicked.length);
        updatedLevel += 1;
        if (currentLevel < updatedLevel) {
          //if user clicks correct order, user moves to next level
          lightup();
          currentLevel = updatedLevel;
        }
      }
    } else { //if order is not correct, game stops
      updatedLevel = 0;
      randomSequence.splice(0, randomSequence.length);
      textSize(windowHeight/20);
      text("End of Game",windowWidth/5,windowHeight/16);
    }
    print("seq: " + randomSequence);
  }
}
//buttons called to add colors to Array when user clicks
function blueButton() {
  userClicked.push(0);
}
function redButton() {
  userClicked.push(1);
}
function greenButton() {
  userClicked.push(2);
}
function yellowButton() {
  userClicked.push(3);
}
//functions created for organization -> light up buttons 
function blueLight(){
  stroke(0, 0, 200);
  fill(0, 0, 150);
  rect(windowWidth / 4, windowHeight / 8, windowWidth / 4, windowHeight / 4, 3);
  noStroke();
}
function redLight(){
  stroke(200, 0, 0);
  fill(175, 0, 0);
  rect(windowWidth / 4 * 2, windowHeight / 8, windowWidth / 4, windowHeight / 4, 3);
  noStroke();
}
function greenLight(){
  stroke(0, 200, 0);
  fill(0, 180, 0);
  rect(windowWidth / 4, windowHeight / 8 * 3, windowWidth / 4, windowHeight / 4, 3);
  noStroke();
}
function yellowLight(){
  stroke(190, 190, 0);
  fill(180, 180, 0);
  rect(windowWidth / 4 * 2, windowHeight / 8 * 3, windowWidth / 4, windowHeight / 4, 3);
  noStroke();
}
//normal/non-litUp rectangles
function startScreen(){
  for (x = 0; x < 2; x++) {
    for (y = 0; y < 2; y++) {
      fill(150 * x, 150 * y, 75);
      rect(windowWidth / 4 * x + windowWidth / 4, windowHeight / 4 * y + windowHeight / 8, windowWidth / 4, windowHeight / 4, 3);
    }
  }
}
/*Errors with functionality:
  lights up all colors in sequence at same time even with frameRate for delay -> frameRate makes color-clicking(if statements in draw loop) experience worse (but without it, mousePressed if statements works)*/
function lightup() {
  let i = 0;
  while (i < randomSequence.length) {
    if (randomSequence[i] == 0) {
      blueLight();
      frameRate(3);
    } else if (randomSequence[i] == 1) {
      redLight();
      frameRate(3);
    } else if (randomSequence[i] == 2) {
      greenLight();
      frameRate(3);
    } else {
      yellowLight();
      frameRate(3);
    }
    i += 1;
  }
}
