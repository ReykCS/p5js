var inc = 0.25;
var start = 0;
var cols, rows;
var scl = 15;

var zoff = 0;

var fr;

var debug = true;

var flowfield = [];

var particles = [];
var particlesLength = 300;

var wind;

function setup()  {

  createCanvas(600, 600);
  cols = floor(height/scl);
  rows = floor(width/scl);

  //wind = createVector(0,-0.25);

  flowField = new Array(cols * rows);

  //particles[0] = new Particle();
  for ( var i = 0 ; i < particlesLength ; i++)  {
    particles.push(new Particle());
  }

}

function draw() {
  //background(255);
  noStroke();
  var yoff = 0;
  for(var y = 0; y < cols; y++)  {
    var xoff = 0;
    for ( var x = 0; x < rows; x++) {
      var angle = noise(xoff, yoff, zoff)*TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.5);
      flowfield[x + y * cols] = v;
      xoff += inc;
    }
    yoff += inc;

    zoff += 0.001;
  }

  //particles[0].show();
  for ( var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].applyForce(wind);
    particles[i].edges();
    particles[i].follow(flowfield);
    particles[i].show();
  }
}
