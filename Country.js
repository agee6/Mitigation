

function Country(div){
  this.owner = null;
  this.troops = 0;
  this.connections = [];
  this.div = div;
  this.ableToMove = 0;
}

Country.prototype.addConnection = function(){
  this.connections = this.connections.concat(arguments);
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
module.exports = Country;
