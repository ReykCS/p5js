function Population() {
  this.popsize = 50;
  this.rockets = [];
  for ( var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.matingpool = [];

  this.run = function(obstacle)  {
    for ( var i = 0; i < this.popsize; i++) {
      this.rockets[i].move();
      this.rockets[i].show();
      this.rockets[i].bumb(obstacle);
    }
  }

  this.evaluate = function()  {
    var maxfit = 0;
    for ( var i = 0 ; i < this.popsize; i++) {
      var localfit = this.rockets[i].calcFitness();
      if ( maxfit < localfit ) {
        maxfit = localfit;
      }
    }
    this.matingpool = [];
    for ( var i = 0 ; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
      var n = this.rockets[i].fitness * 100;
      if ( this.rockets[i].fitness == 1 ) n += 50;
      for ( var x = 0; x < n; x++)  {
        this.matingpool.push(this.rockets[i].dna);
      }
    }
  }

  this.selection = function() {
    var newRockets = [];
    for ( var i = 0; i < this.popsize; i++) {
      var parentA = random(this.matingpool);
      var parentB = random(this.matingpool);

      while ( parentA == parentB )  {
        parentB = random(this.matingpool);
      }

      var child = parentA.crossover(parentB);

      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }
}
