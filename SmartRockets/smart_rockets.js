var population;
var lifespan = 300;
var counter = 0;
var genesMag = 0.2;

var obstacles = [];

var target;

var evolution = 0;
var evoP;

var mouseLoc;

function setup()  {
  createCanvas(500, 500);
  background(200);

  evoP = createP();
  evoP.html("Evolution: #" + evolution);

  target = createVector(width/2, height/8);

  population = new Population();
}

function draw() {
  background(200);
  population.run(obstacles);
  for ( var i = 0 ; i < obstacles.length; i++ )  {
      obstacles[i].show();
  }
  counter++;
  if ( counter == lifespan )  {
    population.evaluate();
    population.selection();
    counter = 0;
    evoP.html("Evolution: #" + evolution++);
  }
  ellipse(target.x, target.y, 16, 16);
}

function mousePressed() {
  mouseLoc = createVector(mouseX, mouseY);
}

function mouseReleased()  {
  var xLen = mouseX - mouseLoc.x;
  var yLen = mouseY - mouseLoc.y;
  if ( xLen < 0 ) {
    mouseLoc.x = mouseLoc.x + xLen;
    xLen *= -1;
  }
  if ( yLen < 0 ) {
    mouseLoc.y = mouseLoc.y + yLen;
    yLen *= -1;
  }
  population = new Population();
  counter = 0;
  evolution = 0;

  obstacles.push(new Obstacle(mouseLoc.x, mouseLoc.y, xLen, yLen));
}
