var Player = require('./Player.js');
var util = require('./util.js');


function ComputerPlayer(options){
  // this.name = name;
  Player.call(this,options);

}
util.inherits(ComputerPlayer, Player);

ComputerPlayer.prototype.claimUnclaimed = function(board, callBack){
  var countriesToAdd = board.unclaimedCountries;
  var rIdx = Math.floor(Math.random()*(countriesToAdd.length));
  var chosen = countriesToAdd[rIdx];
  this.countriesOwned.push(chosen);
  chosen.owner = this;
  chosen.troops = 1;
  board.removeUnclaimed(chosen);
  board.update();
  
  callBack();

};

ComputerPlayer.prototype.placeSoldiers = function(num, callBack, totalSoldiers){
  var rIdx = Math.floor(Math.random()*(this.countriesOwned.length));
  var chosen = this.countriesOwned[rIdx];
  chosen.troops += num;
  callBack(totalSoldiers);
};

ComputerPlayer.prototype.startWar = function(board, callback){
  var rIdx = Math.floor(Math.random()*(this.countriesOwned.length));
  var chosen = this.countriesOwned[rIdx];
  var r2idx = Math.floor(Math.random()*(chosen.neighbors.length));
  var defendor = chosen.neighbors[r2idx];

};
module.exports = ComputerPlayer;
