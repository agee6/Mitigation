var Player = require('./Player.js');
var util = require('./util.js');

function HumanPlayer(options){
  Player.call(this,options);
}
util.inherits(HumanPlayer, Player);

HumanPlayer.prototype.claimUnclaimed = function(board, callBack){

  var countriesToAdd = board.unclaimedCountries;
  var that = this;
  var addCountry = function(event){
    var countryDiv = event.target;
    var country = board.getCountryByDiv(countryDiv);

    that.countriesOwned.push(country);
    country.owner = that;
    country.troops = 1;
    for (var i = 0; i < countriesToAdd.length; i++) {
      countriesToAdd[i].div.removeEventListener('click', addCountry);
    }
    board.removeUnclaimed(country);
    board.update();

    callBack();
  };
  for (var i = 0; i < countriesToAdd.length; i++) {
    countriesToAdd[i].div.addEventListener('click', addCountry);
  }

};

HumanPlayer.prototype.placeSoldiers = function(num, callBack, soldiersRemaining){
  
  var that = this;
  var addMen = function(event){
    event.preventDefault();
    var countryDiv = event.target;
    var country = that.getCountryFromDiv(countryDiv);
    country.troops += num;
    for (var i = 0; i < that.countriesOwned.length; i++) {
      that.countriesOwned[i].div.removeEventListener('click',addMen);
    }
    callBack(soldiersRemaining);
  };
  for (var i = 0; i < this.countriesOwned.length; i++) {
    this.countriesOwned[i].div.addEventListener('click',addMen);
  }


};
HumanPlayer.prototype.getCountryFromDiv = function(div){
  for (var i = 0; i < this.countriesOwned.length; i++) {
    if(this.countriesOwned[i].div === div){
      return this.countriesOwned[i];
    }
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


};





HumanPlayer.prototype.type = "HumanPlayer";
module.exports = HumanPlayer;
