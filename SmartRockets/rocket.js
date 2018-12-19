function Rocket(dna) {
  this.pos = createVector(width/2, height-20);
  this.vel = createVector();
  this.acc = createVector();
  if ( dna )  {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness;

  this.stuck = 0;

  this.finish = 0;

  this.applyForce = function(force)  {
    this.acc.add(force);
  }

  this.calcFitness = function() {
    if ( this.stuck ) {
      this.fitness = 0;
      return 0;
    } else if ( this.finish ){
      this.fitness = width;
      return this.fitness;
    }
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);
    return this.fitness;
  }

  this.move = function()  {
    if ( this.stuck || this.finish ) {
      return;
    }
    this.applyForce(this.dna.genes[counter]);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.bumb = function(obstacle)  {
    if ( dist(this.pos.x, this.pos.y, target.x, target.y) <= 10 ) {
      this.finish = 1;
    }
    if ( this.pos.x >= width || this.pos.x <= 0 || this.pos.y >= height || this.pos.y <= 0 )  {
      this.stuck = 1;
    }
    for ( var i = 0; i < obstacles.length; i++) {
      if ( ( (this.pos.x >= obstacle[i].pos.x) && (this.pos.x <= (obstacle[i].pos.x + obstacle[i].dim.x) ) ) &&
          ( this.pos.y >= obstacle[i].pos.y ) && (this.pos.y <= (obstacle[i].pos.y + obstacle[i].dim.y) ) )  {
            this.stuck = 1;
          }
    }
  }

  this.show = function()  {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    fill(0, 50);
    noStroke();
    rect(0,0, 20, 2);
    pop();
  }
}
