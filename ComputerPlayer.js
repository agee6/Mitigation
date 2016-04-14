var Player = require('./Player.js');
var util = require('./util.js');
var War = require('./War.js');


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
  var r2idx = Math.floor(Math.random()*(chosen.connections[0].length));
  var defendor = chosen.connections[0][r2idx];
  var war = new War(chosen, defendor);
  callback(war);

};
ComputerPlayer.prototype.wantToWar = function(callback){
  var choice = Math.random();
  if(choice > 0.5 ){
    callback(true);
  }else {
    callback(false);
  }
};
ComputerPlayer.prototype.getAttackSoldiers = function(war, index, callback){
  var choice = Math.floor(Math.random() * war.aggressor.troops) + 1;
  callback(war, index, choice);
};
ComputerPlayer.prototype.getDefenseSoldiers = function(war, index, callback){
  var choice = Math.floor(Math.random() * (war.defender.troops + 1)) + 1;
  callback(war, index, choice);
};

module.exports = ComputerPlayer;
