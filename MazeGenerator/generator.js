var w = 40;

var cols, rows;

var grid = [];

var current = [];

function setup()  {
  createCanvas(400,400);

  frameRate(10);

  cols = width / w;
  rows = height / w;
  console.log(cols + " " + rows);

  for ( var j = 0; j < rows ; j++)  {
    for ( var i = 0; i < cols; i++)  {
      console.log(i);
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current.push(grid[0]);

  for ( var i = 0; i < grid.length; i++) {
    grid[i].startHighlight();
  }

}

function draw() {

  var index = current.length - 1;
  console.log(index);

  if ( index == -1 )  {
    console.log("Finished");
    noLoop();
    return;
  }

  for ( var i = 0; i < grid.length; i++)  {
    grid[i].show();
  }

  current[index].visited = true;
  current[index].hightlight();

  var next = current[index].checkNeighbors();
  if ( next ) {
    next.visited = true;

    removeWalls(current[index], next);

    current.push(next);
  } else {
    current.pop();
  }
}

function getNeighbor(i, j)  {
  if ( i < 0 || j < 0 || i >= cols || j >= rows )  {
    console.log("return: i: " + i+ " j: " +j);
    return -1;
  }
  return i + j * cols;
}

function Cell(i, j) {
  this.i = i;
  this.j = j;

  this.walls = [true /*top*/, true, true, true /*left*/];

  this.visited = false;

  this.checkNeighbors = function()  {

    var neighbors = [];

    var top = grid[getNeighbor(i, j-1)];
    var right = grid[getNeighbor(i+1, j)];
    var bottom = grid[getNeighbor(i, j+1)];
    var left = grid[getNeighbor(i-1, j)];

    if ( top && !top.visited)  {
      neighbors.push(top);
    }
    if ( right && !right.visited)  {
      neighbors.push(right);
    }
    if ( bottom && !bottom.visited)  {
      neighbors.push(bottom);
    }
    if ( left && !left.visited)  {
      neighbors.push(left);
    }

    console.log(neighbors.length);

    if ( neighbors.length > 0 ) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  this.hightlight = function() {
    var x = this.i * w;
    var y = this.j * w;

    fill(255, 30, 30, 200);
    noStroke();
    rect(x, y, w, w);
  }

  this.startHighlight = function()  {
    var x = this.i * w;
    var y = this.j * w;


    noStroke();
    fill(117, 142, 155, 100)
    rect(x, y, w, w);
  }

  this.show = function()  {
    var x = this.i * w;
    var y = this.j * w;

    stroke(0);
    strokeWeight(2);
    if ( this.walls[0] )  {
      line(x    , y   , x + w, y     );
    }
    if ( this.walls[1] )  {
      line(x + w, y   , x + w, y + w );
    }
    if ( this.walls[2] )  {
      line(x    , y+w , x + w, y + w );
    }
    if ( this.walls[3] )  {
      line(x    , y   , x    , y + w );
    }

    if ( this. visited) {
      fill(41, 255, 246, 150);
      noStroke();
      rect(x, y, w, w);
    }

  };
}

function removeWalls(a, b)  {
  var x = a.i - b.i;
  if ( x == 1 ) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if ( x == -1 ) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if ( y == 1 ) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if ( y == -1 ) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
