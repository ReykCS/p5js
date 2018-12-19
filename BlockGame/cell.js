function Cell(x, y) {
  this.x = x;
  this.y = y;

  this.a = floor(random(0, 2));
  this.b = floor(random(0, 2));
  this.c = floor(random(0, 2));

  this.alive = 1;

  this.fill = color(255 * this.a, 255 * this.b, 255 * this.c);

  this.display = function() {
    stroke(0);
    fill(this.fill);
    if ( ! this.alive )  {
      fill(100,100,100);
    }
    rect(this.x * blockWidth, this.y * blockWidth, blockWidth, blockWidth);
  }

  this.getFill = function() {
    return (this.a * 1) + (this.b * 5) + (this.c * 7);
  }

  this.index = function(x, y) {
    if ( ( this.x + x ) < 0 || ( this.y + y ) < 0 || ( this.x + x ) >= cols || ( this.y + y ) >= rows)  {
      return false;
    } else {
      return true;
    }
  }

  this.checkNeighbors = function(neighbors)  {
    if ( this.index(0, -1) && blocks[(this.x) + ((this.y - 1) * cols)].getFill() == this.getFill() && checkExisting(neighbors, (this.x) + ((this.y - 1) * cols))) {

      neighbors.push((this.x) + ((this.y - 1) * cols));
      neighbors = blocks[(this.x) + ((this.y - 1) * cols)].checkNeighbors(neighbors);
    }

    if ( this.index(-1, 0) && blocks[(this.x - 1) + ((this.y) * cols)].getFill() == this.getFill() && checkExisting(neighbors, (this.x - 1) + ((this.y) * cols))) {

      neighbors.push((this.x - 1) + ((this.y) * cols));
      neighbors = blocks[(this.x -1) + ((this.y) * cols)].checkNeighbors(neighbors);
    }

    if ( this.index(1, 0) && blocks[(this.x + 1) + ((this.y) * cols)].getFill() == this.getFill() && checkExisting(neighbors, (this.x + 1) + ((this.y) * cols))) {

      neighbors.push((this.x + 1) + ((this.y) * cols));
      neighbors = blocks[(this.x + 1) + ((this.y) * cols)].checkNeighbors(neighbors);
    }

    if ( this.index(0, 1) && blocks[(this.x) + ((this.y + 1) * cols)].getFill() == this.getFill() && checkExisting(neighbors, (this.x) + ((this.y + 1) * cols))) {

      neighbors.push((this.x) + ((this.y + 1) * cols));
      neighbors = blocks[(this.x) + ((this.y + 1) * cols)].checkNeighbors(neighbors);
    }

    return neighbors;
  }

}
