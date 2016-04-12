

var Country = function(div){
  this.owner = null;
  this.troops = 0;
  this.connections = [];
  this.div = div;
};

Country.prototype.addConnection = function(){
  this.connections = this.connections.concat(arguments);
};

module.exports = Country; 
