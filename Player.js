function Player(name){
  this.countriesOwned = [];
  this.name = name;

}

Player.prototype.claimCountry = function(fromCountry, toCountry){
  this.countriesOwned.push(toCountry);
  toCountry.owner.removeCountry(toCountry);
  toCountry.owner = this;
  //prompt to user to get number of soldiers to move from
  //fromCountry to toCountry
};
Player.prototype.removeCountry = function(country){
  var index = this.countriesOwned.indexOf(country);
  if(index >= 0){
    this.countriesOwned.splice(index,1);
  }
};
Player.prototype.numOwned = function(){
  return this.countriesOwned.length;
};

module.exports = Player;
