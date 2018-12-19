var corners = [];
var cornerNumber = 5;

var point_;

var radius = 200;

var moveDist = 0.5;

function setup()  {
  createCanvas(400,400);
  background(0);
  var angle = TWO_PI / cornerNumber + PI;
  for ( var i = 0; i < cornerNumber; i++) {
    corners[i] = createVector(radius * sin(angle), radius * cos(angle));
    console.log(corners[i].x, corners[i].y);
    angle += TWO_PI / cornerNumber;
  }

  point_ = createVector(floor(random(width)), floor(random(height)));
}

function draw() {

  translate(width/2, height/2);

  for ( var i = 0; i < cornerNumber; i++) {
    stroke(255);
    strokeWeight(6);
    point(corners[i].x, corners[i].y);
  }
  var previous;
  for ( var i = 0 ; i < 100 ; i++ ) {
    stroke(255, 0, 0);
    strokeWeight(1);
    point(point_.x, point_.y);
    var r = floor(random(cornerNumber));
    var absolute = abs(r - previous);
    // while ( absolute >= 2 && absolute < (cornerNumber - 1) || previous == r)  {
    while (previous == r)  {
      r = floor(random(cornerNumber));
      absolute = abs(r - previous);
    }
    previous = r;
    point_.x = lerp(point_.x, corners[r].x, moveDist);
    point_.y = lerp(point_.y, corners[r].y, moveDist);
  }
}
