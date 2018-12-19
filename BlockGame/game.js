var cols, rows;
var blockWidth = 20;

var blocks = [];

var score = 0;
var scoreP;

var reset;

function setup()  {
  createCanvas(600,400);
  cols = floor(width / blockWidth);
  rows = floor(height / blockWidth);

  scoreP = createP('Score: 0');
  createP('Max Score: ' + (cols* rows));

  blocks = new Array(cols * rows);

  reset = createButton('Reset');
  reset.mousePressed(resetGame);

  for ( var i = 0; i < rows; i++) {
    for ( var j = 0 ; j < cols; j++)  {
      blocks[j + i * cols] = new Cell(j, i);
    }
  }
}

function resetGame()  {
  for ( var i = 0; i < rows; i++) {
    for ( var j = 0 ; j < cols; j++)  {
      blocks[j + i * cols] = new Cell(j, i);
    }
  }
}

function draw() {
  background(100);

  for ( var i = 0; i < blocks.length; i++)  {
    blocks[i].display();
  }

  turn();
}

function turn() {
  for ( var i = 0; i < blocks.length; i++)  {
    if ( ! blocks[i].alive )  {
      if ( i < cols ) continue;

      var j = i;

      while ( j >= cols )  {

        var temp = blocks[j];
        blocks[j - cols].y++;
        blocks[j] = blocks[j - cols];
        blocks[j - cols] = temp;
        j -= cols;

      }
    }
  }
}

function mousePressed() {
  var x = floor(mouseX / blockWidth);
  var y = floor(mouseY / blockWidth);

  var neighbors = [];

  neighbors.push(x + y * cols);

  neighbors = blocks[x + y* cols].checkNeighbors(neighbors);

  if ( neighbors.length > 2 ) {
    for ( let i = 0; i < neighbors.length ; i++ ) {
      blocks[ neighbors[i] ].alive = 0;
    }
    score += neighbors.length;
    scoreP.html('Score: ' + score);
  }
}

function checkExisting(array, number) {
  for ( var i = 0 ; i < array.length ; i++) {
    if ( array[i] == number ) return false;
  }
  return true;
}
