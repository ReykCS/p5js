function DNA(genes)  {
  if ( genes )  {
    this.genes = genes;
  } else {
    this.genes = [];
    for ( var i = 0; i< lifespan; i++)  {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(genesMag);
    }
  }

  this.crossover = function(parent) {
    var newgenes = [];
    // var mid = floor(random(this.genes.length));
    for ( var i = 0; i < this.genes.length; i++)  {
      var r = floor(random(2));
      if ( r )  {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = parent.genes[i];
      }
      // if ( i > mid )  {
      //   newgenes[i] = this.genes[i];
      // } else {
      //   newgenes[i] = parent.genes[i];
      // }
    }
    return new DNA(newgenes);
  }
}
