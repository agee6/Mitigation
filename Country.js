

function Country(div){
  this.owner = null;
  this.troops = 0;
  this.connections = [];
  this.div = div;
  this.ableToMove = 0;
}

Country.prototype.addConnection = function(){

  // this.connections = this.connections.concat(arguments);
  for (var i = 0; i < arguments.length; i++) {
      this.connections.push(arguments[i]);
  }

};

Country.prototype.neighbors = function(){
  return(this.connections);
};

Country.prototype.update = function(){
  if(this.owner !== null){
    var inner = "owner: " + this.owner.name +  " troops: " + this.troops;
    this.div.innerHTML = inner;

  }
};
Country.prototype.resetAbleToMove = function(){
  this.ableToMove = this.troops - 1;
};
Country.prototype.ableToFight = function(){
  var neighborsToFight = [];
  if(this.troops < 2){
    return false;
  }else{
    for (var i = 0; i < this.connections.length; i++) {

      if(this.connections[i].owner !== this.owner && !this.owner.inWarWith(this.connections[i])){
        neighborsToFight.push(this.connections[i]);
      }
    }
    if(neighborsToFight.length > 0){
      return(neighborsToFight);
    }else{
      return false;
    }
  }
};

module.exports = Country;
