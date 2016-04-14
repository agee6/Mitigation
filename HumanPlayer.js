var Player = require('./Player.js');
var util = require('./util.js');




function HumanPlayer(name){
  this.name = name;
}

HumanPlayer.prototype.claimUnclaimed = function(board){
  var chosen = false;
  var countriesToAdd = board.unclaimedCountries();
  var that = this;
  var addCountry = function(event){
    var country = event.target;
    this.countriesOwned.push(country);
    country.owner = that;
    country.troops = 1;
    chosen = true;
    board.update();
  };
  for (var i = 0; i < countriesToAdd.length; i++) {
    countriesToAdd[i].div.addEventListener('click', addCountry);
  }

  while(!chosen){

  }


};

HumanPlayer.prototype.placeSoldiers = function(num){
  var placed = false;
  var addMen = function(event){
    event.preventDefault();
    event.target.troops += num;
    placed = true;
  };
  for (var i = 0; i < this.countriesOwned.length; i++) {
    this.countriesOwned[i].div.addEventListener('click',addMen);
  }
  while(!placed){

  }

};

HumanPlayer.prototype.startWar = function(board){
  var attackSet = false;
  var defenseSet = false;
  var attacker = null;
  var defender = null;
  var setAttack = function(event){
    attacker = event.target;
  };
  for (var i = 0; i < this.countriesOwned.length; i++) {
    this.countriesOwned[i].div.addEventListener('click',setAttack);
  }
  while(!attackSet){

  }

};



util.inherits(HumanPlayer, Player);

module.exports = HumanPlayer; 
