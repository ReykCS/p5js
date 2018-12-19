function ThomasAttractor()   {
  this.x = 1;
  this.y = 0;
  this.z = 0;

  this.b = 0.198;

  this.dt = 0.1;

  this.points = [];

  this.angle = 0;
  this.rotateVel = (PI/16) * 0.01;


  this.run = function() {
    this.move();
    this.display();
  }

  this.move = function()  {
    var dx = ( sin(this.y) - ( this.b * this.x ) ) * this.dt;
    var dy = ( sin(this.z) - ( this.b * this.y ) ) * this.dt;
    var dz = ( sin(this.x) - ( this.b * this.z ) ) * this.dt;

    this.x += dx;
    this.y += dy;
    this.z += dz;

    this.angle += this.rotateVel;


    this.points.push(createVector(this.x*2, this.y*2, this.z*2));
  }

  this.display = function() {
    noFill();
    stroke(255);

    rotateY(this.angle);

1
    scale(4);

    beginShape(LINES);
    for ( var i = 0; i < this.points.length; i++ )  {
      vertex(this.points[i].x,  this.points[i].y, this.points[i].z );
    }
    endShape();
  }
}
