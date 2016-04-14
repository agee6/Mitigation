

function Country(div){
  this.owner = null;
  this.troops = 0;
  this.connections = [];
  this.div = div;
}

Country.prototype.addConnection = function(){
  this.connections = this.connections.concat(arguments);
};

Country.prototype.update = function(){
  if(this.owner !== null){
    var inner = "owner: " + this.owner.name +  " troops: " + this.troops;
    this.div.innerHTML = inner;

  }
};
module.exports = Country;
