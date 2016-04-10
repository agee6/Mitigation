var Country = require('./Country.js');
var Board = function(){
    this.countries = [];
    var NADiv = document.getElementById('NorthAmerica');
    var SADiv = document.getElementById('SouthAmerica');
    var EDiv = document.getElementById('Europe');
    var RDiv = document.getElementById('Russia');
    var EADiv = document.getElementById('EastAsia');
    var SAsiaDiv = document.getElementById('SouthAsia');
    var MEDiv = document.getElementById('MiddleEast');
    var ADiv = document.getElementById('Africa');
    var AusDiv = document.getElementById('Australia');

    var Africa = new Country(ADiv);
    var EastAsia = new Country(EADiv);
    var Europe = new Country(EDiv);
    var NorthAmerica = new Country(NADiv);
    var Hispania = new Country(SADiv);
    var Russia = new Country(RDiv);
    var SouthAsia = new Country(SAsiaDiv);
    var MiddleEast = new Country(MEDiv);
    var Australia = new Country(AusDiv);

    Africa.addConnection(MiddleEast, Europe, Hispania);
    EastAsia.addConnection(Russia, SouthAsia);
    Europe.addConnection(Africa, Russia, MiddleEast, Europe);
    NorthAmerica.addConnection(Hispania, Europe, Russia);
    Hispania.addConnection(NorthAmerica, Africa);
    Russia.addConnection(NorthAmerica, Europe, EastAsia, SouthAsia, MiddleEast);
    SouthAsia.addConnection(MiddleEast, EastAsia, Russia, Australia);
    MiddleEast.addConnection(Africa, Europe, Russia, SouthAsia);
    Australia.addConnection(SouthAsia);

    this.countries.push(Africa);
    this.countries.push(EastAsia);
    this.countries.push(Europe);
    this.countries.push(NorthAmerica);
    this.countries.push(Hispania);
    this.countries.push(Russia);
    this.countries.push(SouthAsia);
    this.countries.push(MiddleEast);
    this.countries.push(Australia);
};
