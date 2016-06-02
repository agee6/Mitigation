

function Country(div){
  this.owner = null;
  this.troops = 0;
  this.connections = [];
  this.div = div;
  this.ableToMove = 0;
  this.fighting = [];
  this.defending = [];
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

Country.prototype.fightWars = function(callback, indexOne, indexCurrent){
  for (var i = indexCurrent; i < this.wars.length; i++) {
    callback(this.wars[i], i);
    break;
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

Country.prototype.addFight = function(country){
  this.fighting.push(country);
};

Country.prototype.addDefend = function(country){
  this.defending.push(country);
};


module.exports = Country;
