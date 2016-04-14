var Country = require('./Country.js');
function Board(){
    this.countries = [];
    var NADiv = document.getElementById('NorthAmerica');
    var SADiv = document.getElementById('SouthAmerica');
    var EDiv = document.getElementById('Europe');

    var AsiaDiv = document.getElementById('Asia');

    var MEDiv = document.getElementById('MiddleEast');
    var ADiv = document.getElementById('Africa');
    var AusDiv = document.getElementById('Australia');

    var Africa = new Country(ADiv);
    var Asia = new Country(AsiaDiv);
    var Europe = new Country(EDiv);
    var NorthAmerica = new Country(NADiv);
    var Hispania = new Country(SADiv);


    var MiddleEast = new Country(MEDiv);
    var Australia = new Country(AusDiv);

    Africa.addConnection(MiddleEast, Europe, Hispania);
    Asia.addConnection(Europe, MiddleEast, Australia, NorthAmerica);
    Europe.addConnection(Africa, MiddleEast, Europe, NorthAmerica);
    NorthAmerica.addConnection(Hispania, Europe, Asia);
    Hispania.addConnection(NorthAmerica, Africa);
    MiddleEast.addConnection(Africa, Europe, Asia);
    Australia.addConnection(Asia);
    
    this.countries.push(Africa);
    this.countries.push(Asia);
    this.countries.push(Europe);
    this.countries.push(NorthAmerica);
    this.countries.push(Hispania);
    this.countries.push(MiddleEast);
    this.countries.push(Australia);
    this.unclaimedCountries = this.countries.slice();
}
Board.prototype.update = function(){

  for (var i = 0; i < this.countries.length; i++) {
    this.countries[i].update();
  }

};
Board.prototype.removeUnclaimed = function(country){
  var savedIdx;
  for (var i = 0; i < this.unclaimedCountries.length; i++) {
    if(this.unclaimedCountries[i] === country){
      savedIdx = i;
      break;
    }
  }
  this.unclaimedCountries.splice(i, 1);
};
Board.prototype.getCountryByDiv = function(div){
  for (var i = 0; i < this.countries.length; i++) {
    if(this.countries[i].div === div){
      return this.countries[i];
    }
  }
};



module.exports = Board;
