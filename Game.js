var Board = require('./Board.js');
var HumanPlayer = require('./HumanPlayer.js');
var ComputerPlayer = require('./ComputerPlayer.js');
window.HumanPlayer = HumanPlayer;

function Game(name, numPlayers){
  this.board = new Board();
  this.playersName = name;
  this.players = [];
  this.currentWars=[];
  this.currentPlayer = numPlayers - 1;
  this.gameOver = false;
  this.inputDiv = document.getElementById("user-input");
  this.gameDiv = document.getElementById('the-game');
  this.mainButton = document.getElementById('main-button');
  this.numPlayers = numPlayers;
  this.instructionsDiv = document.getElementById('instruction-div');
  this.turnDiv = document.getElementById('turnDiv');
}

Game.prototype.startGame = function(){

  this.getPlayers();
  this.setBoard();
  // this.gameOver = true;
  // while(!this.gameOver){
  //   this.playTurn();
  //   this.rotatePlayers();
  //
  // }
};
Game.prototype.fightWars = function(index){

  for (var i = index; i < this.currentWars.length; i++) {
    if(this.currentWars[i].isOffense(this.players[this.currentPlayer])){
      this.startBattle(this.currentWars[i], i);
      break;
    }
  }
  if(index >= this.currentWars.length || i > this.currentWars.length){
    this.players[this.currentPlayer].wantToWar(this.checkToWar.bind(this));

  }


};
Game.prototype.checkToWar = function(toFightWar){
  if(toFightWar){
    this.instructionsDiv.innerHTML =
      "choose from which country you will be attacking";
    this.players[this.currentPlayer].startWar(this.board, this.initiateWar.bind(this));

  }else{
    this.players[this.currentPlayer].wantToMove( this.checkToMove.bind(this));
  }

};

Game.prototype.playTurn = function(){

  // this.distributeSoldiers();
  var wantToWar = true;
  while (wantToWar){
    if(this.checkInitiateWar()){
      this.initiateWar();
      this.battle(this.currentWars[-1]);

    }else {
      wantToWar = false;
    }
  }
  var wantToMove = true;
  while(wantToMove){
    if(this.toMoveMen()){
      this.moveMen();
    }
    else{
      wantToMove = false;
    }
  }


};

Game.prototype.rotatePlayers = function(){

  this.currentPlayer = (this.currentPlayer + 1) % this.players.length;

  this.turnDiv.innerHTML =
  'It is ' + this.players[this.currentPlayer].name + '\'s turn';

};
Game.prototype.startBattle = function(war, index){
  this.soldiersAttack = 0;
  this.soldiersDefend = 0;
  this.instructionsDiv.innerHTML = "";
  war.aggressor.owner.getAttackSoldiers(war, index, this.getDefense);

};
Game.prototype.getDefense = function(war, index, attackSoldiers){
  this.soldiersAttack = attackSoldiers;
  debugger;
  war.defender.owner.getDefenseSoldiers(war, index, this.battle);
};

Game.prototype.battle = function(war, index, defenseSoldiers){
  this.soldiersDefend = defenseSoldiers;
  if(this.soldiersAttack > this.soldiersDefend){
    war.addAttackVictory();
  }else {
    war.addDefenseVictory();
  }
  war.updateSoldiers(this.soldiersAttack, this.soldiersDefend);
  if(war.over()){

    this.removeWar(war);
  }
  if(index < this.currentWars.length){
    index += 1;
    this.fightWars(index);
  }else{
    debugger;

  }

};


Game.prototype.getPlayers = function(){
  var computerNames = ['Nicolas Cage', 'Anitta Job', 'Darth Bird', 'Legolas'];
  for (var i = 0; i < this.numPlayers; i++) {

    if(this.playersName !== null){
      var player = new HumanPlayer(this.playersName);
      this.players.push(player);
      this.playersName = null;
    }else{
      var Cplayer = new ComputerPlayer(computerNames[i-1]);
      this.players.push(Cplayer);
    }
  }

  //get the players

};
Game.prototype.setBoard = function(){
  //rotate through players, choosing countries.
  // this.rotatePlayers();

  var instructionDiv = document.getElementById('instruction-div');
  // var turnDiv = document.getElementById('turnDiv');
  this.rotatePlayers();
  instructionDiv.innerHTML =
    "Please click on the country of your choice when it is your turn";

  if(this.board.unclaimedCountries.length> 0 ){

    this.players[this.currentPlayer].claimUnclaimed(this.board, this.setBoard.bind(this));

  }else {
    this.placeFirstSoldiers(50);
  }

};
Game.prototype.placeFirstSoldiers = function(numberToPlace){
  this.instructionsDiv.innerHTML =
    "click on the country to place 3 soldiers on that country";
  this.rotatePlayers();
  this.board.update();

  var totalSoldiers = numberToPlace;
  if( totalSoldiers > this.numPlayers){
    totalSoldiers -= 3;
    this.players[this.currentPlayer].placeSoldiers(3, this.placeFirstSoldiers.bind(this), totalSoldiers);

  }else {
    this.placeSecondSoldiers(totalSoldiers);
  }

};
Game.prototype.placeSecondSoldiers = function(numberToPlace){
  this.instructionsDiv.innerHTML =
    "click on the country to place 1 soldiers on that country";
  this.rotatePlayers();
  this.board.update();

  var totalSoldiers = numberToPlace;
  if(totalSoldiers > 0){
    totalSoldiers -= 1;
    this.players[this.currentPlayer].placeSoldiers(1, this.placeSecondSoldiers.bind(this), totalSoldiers);
  }else {
    this.instructionsDiv.innerHTML = "";
    this.fightWars(0);
  }

};

Game.prototype.distributeSoldiers = function(){
  //player recieves and places soldiers on countries at the start of turn.
  //1 player per country?
  var numberPlayers = this.players[this.currentPlayer].numOwned();
  this.instructionsDiv.innerHTML = "Place your men on the board";
  this.players[this.currenPlayer].placeSoldiers(numberPlayers);
};


Game.prototype.initiateWar = function(war){
  //creates new war object where current player is the aggressor and chooses
  //defender. Adds war object to the current wars array.

  this.currentWars.push(war);
  this.fightWars(this.currentWars.length-1);

};

Game.prototype.toMoveMen = function(){

  var moveMen = window.confirm("would you like to move soldiers?");
  if(moveMen){
    return true;
  }else{
    return false;
  }
  //checks if a user wants to move soldiers. returns boolean
};

Game.prototype.moveMen = function(){
 this.instructionsDiv.innerHTML =
  "click on which country you want to move men from and then to which to move. It will move one solider per click";
  this.players[this.currentPlayer].moveMen();
  //takes in input to move men from given country to another country.
};

Game.prototype.removeWar = function(war){

  var index = this.currentWars.indexOf(war);
  if (index >= 0) {
    this.currentWars.splice( index, 1 );
  }
};

module.exports = Game;
