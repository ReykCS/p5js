var mover;
var thomas;


function setup(){
    createCanvas(400,400, WEBGL);
    mover = new LorenzAttractor(0.01, 200, 0.1, 0, 0, 0);
    thomas = new ThomasAttractor(0.01, 300, 5, 5, 5, 10)
    colorMode(HSB);
}

function draw(){
  background(0);

  mover.run();
  thomas.run();

}
