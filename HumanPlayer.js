var Player = require('./Player.js');
var util = require('./util.js');
var War = require('./War.js');

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

HumanPlayer.prototype.startWar = function(board, callback){

  var defender = null;
  var attacker = null;
  var that = this;
  var setAttack = function(event){
    var attackDiv = event.target;
    attacker = that.getCountryFromDiv(attackDiv);
    for (var i = 0; i < that.countriesOwned.length; i++) {
      that.countriesOwned[i].div.addEventListener('click',setAttack);
    }
    setDefense();
  };
  for (var i = 0; i < this.countriesOwned.length; i++) {
    this.countriesOwned[i].div.addEventListener('click',setAttack);
  }
  var setDefense = function(){
    for (var j = 0; j < attacker.connections[0].length; j++) {
      attacker.connections[0][j].div.addEventListener('click', sendAttack);
      attacker.connections[0][j].div.classList.add('glow');
    }
    document.getElementById('instruction-div').innerHTML =
      "Choose which country you would like to attack";

  };
  var sendAttack = function(){
    var defenseDiv = event.target;
    defender = that.getCountryFromDiv(defenseDiv);
    var war = new War(attacker, defender);
    callback(war);

  };
};

HumanPlayer.prototype.wantToWar = function(callback){
  var stay = window.confirm("would you like to initiate a War?");

  if(stay){
    callback(true);
  }else{
    callback(false);
  }
};

HumanPlayer.prototype.getAttackSoldiers = function(war, index, callback){
  var instructDiv = document.getElementById('input-label');
  var input = document.getElementById('user-input');
  var inputBut = document.getElementById('user-input-button');
  input.value = 1;
  var inputVal;
  var max = war.aggressor.troops - 1;
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
  var instructString =
    "Enter how many soldiers you want to send to war(min: 1, max: " + max + ")";
  instructDiv.innerHTML = instructString;

  var validateInput = function(event){
    debugger;
    event.preventDefault();
    inputVal = parseInt(input.value);
    if(inputVal > 0 && inputVal <= max){
      inputBut.removeEventListener('click', validateInput);
      modal.style.display = "none";
      debugger;
      callback(war, index, inputVal);
    }else{
      instructDiv.innerHTML =
      "invalid input please enter a number between 1 and " + max + ".";

    }

  };
  inputBut.addEventListener('click', validateInput);



};
HumanPlayer.prototype.getDefenseSoldiers = function(war, index, callback){
  var instructDiv = document.getElementById('input-label');
  var input = document.getElementById('user-input');
  var inputBut = document.getElementById('user-input-button');
  input.value = 1;
  var inputVal;
  var max = war.defender.troops;
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
  var instructString =
    "Enter how many soldiers you want to use to defend(min: 1, max: " + max + ")";
  instructDiv.innerHTML = instructString;

  var validateInput = function(event){
    debugger;
    event.preventDefault();
    inputVal = parseInt(input.value);
    if(inputVal > 0 && inputVal <= max){
      inputBut.removeEventListener('click', validateInput);
      modal.style.display = "none";
      debugger;
      callback(war, index, inputVal);
    }else{
      instructDiv.innerHTML =
      "invalid input please enter a number between 1 and " + max + ".";

    }

  };
  inputBut.addEventListener('click', validateInput);



};


HumanPlayer.prototype.type = "HumanPlayer";
module.exports = HumanPlayer;
