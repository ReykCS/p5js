function Obstacle(x, y, xlen, ylen)  {
  this.pos = createVector(x, y);
  this.dim = createVector(xlen, ylen);

  this.show = function() {
    fill(255);
    noStroke();
    rect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
  }
}
