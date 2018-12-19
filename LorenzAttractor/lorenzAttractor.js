function LorenzAttractor(dt, lifespan, x, y, z, startColor)  {
  this.x = x;
  this.y = y;
  this.z = z;

  this.a = 10;
  this.b = 28;
  this.c = 8 / 3;

  this.dt = dt;

  this.angle = 0;
  this.rotateVel = (PI/16) * 0.01;

  this.points = [];

  this.lifespan = lifespan;

  this.run = function() {
    this.move();
    this.display();
    this.destruct();
  }

  this.move = function()  {
    var dx = (this.a * ( this.y - this.x )) * this.dt;
    var dy = (this.x * ( this.b - this.z ) - this.y) * this.dt;
    var dz = (this.x * this.y - this.c * this.z) * this.dt;

    this.x += dx;
    this.y += dy;
    this.z += dz;

    this.angle += this.rotateVel;

    this.points.push(createVector(this.x, this.y, this.z));
  }

  this.destruct = function()  {
    if ( this.points.length >= this.lifespan ) this.points.shift();
  }

  this.hue = startColor;

  this.display = function() {

    rotate(this.angle);

    scale(2);

    noFill();

    var hue = 0;

    beginShape(LINES);
    for ( var i = 0; i < this.points.length-1; i++)  {



      vertex(this.points[i].x, this.points[i].y, this.points[i].z);
      //points[i].x, this.points[i].y, this.points[i].z, this.points[i+1].x, this.points[i+1].y, this.points[i+1].z);
    }
    endShape();

    stroke(this.hue, 255, 255);
    this.hue += 0.1;
    if ( this.hue >= 255 ) this.hue = 0;

  }
}
