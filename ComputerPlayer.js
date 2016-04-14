var Player = require('./Player.js');
var util = require('./util.js');


function ComputerPlayer(name){

}

ComputerPlayer.prototype.claimUnclaimed = function(board, callback){
  var countriesToAdd = board.unclaimedCountries();
  var rIdx = Math.floor(Math.random()*(countriesToAdd.length));
  var chosen = countriesToAdd[rIdx];
  this.countriesOwned.push(chosen);
  chosen.owner = this;
  chosen.troops = 1;
  board.update();



};

ComputerPlayer.prototype.placeSoldiers = function(num, callback){
  var rIdx = Math.floor(Math.random()*(this.countriesOwned.length));
  var chosen = this.countriesOwned[rIdx];
  chosen.troops += num;

};

ComputerPlayer.prototype.startWar = function(board, callback){
  var rIdx = Math.floor(Math.random()*(this.countriesOwned.length));
  var chosen = this.countriesOwned[rIdx];
  var r2idx = Math.floor(Math.random()*(chosen.neighbors.length));
  var defendor = chosen.neighbors[r2idx];

};
util.inherits(ComputerPlayer, Player);
module.exports = ComputerPlayer;
