function Particle() {
  this.loc = createVector(random(width), random(height));
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxspeed = 2;

  this.previous = this.loc.copy();

  this.update = function()  {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.loc.add(this.vel);
    this.acc.mult(0);
  }

  this.follow = function(vectors) {
    var x = floor(this.loc.x / scl);
    var y = floor(this.loc.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);

  }

  this.show = function() {
    stroke(0, 50);
    strokeWeight(1);
    line(this.loc.x, this.loc.y, this.previous.x, this.previous.y);

    //point(this.loc.x, this.loc.y);
    // ellipse(this.loc.x, this.loc.y, 3, 3);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.updatePrev = function() {
    this.previous = this.loc.copy();
  }

  this.edges = function() {
    if ( this.loc.x > width) this.loc.x = 0;
    if ( this.loc.x < 0) this.loc.x = width;
    if ( this.loc.y > height) this.loc.y = 0;
    if ( this.loc.y < 0) this.loc.y = height;
    this.updatePrev();
  }

}
