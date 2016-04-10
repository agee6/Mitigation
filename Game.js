var Board = require('./Board.js');


var Game = function(){
  this.board = new Board();
  this.players = [];
  this.currentWars=[];
  this.currentPlayer = 0;
  this.gameOver = false;
  this.inputDiv = document.getElementById("user-input");
  this.gameDiv = document.getElementById('the-game');
  this.mainButton = document.getElementById('main-button');
};

Game.prototype.startGame = function(){
  this.getPlayers();
  this.setBoard();
  while(!this.gameOver){
    this.playTurn();
    this.rotatePlayers();
  }
};

Game.prototype.playTurn = function(){

  this.distributeSoldiers();
  for (var i = 0; i < this.currentWars.length; i++) {
    if(this.currentWars[i].isOffense(this.players[this.currentPlayer])){
      this.battle(this.currentWars[i]);
    }
  }
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

};

Game.prototype.battle = function(war){
  var soldiersAttack = war.attackPlayer.getSoldiers();
  var soldiersDefend = war.playerTwo.getSoldiers();
  if(soldiersAttack > soldiersDefend){
    war.addAttackVictory();
  }else {
    war.addDefenseVictory();
  }
  war.updateSoldiers(soldiersAttack, soldiersDefend);
  if(war.over()){

    this.removeWar(war);
  }

};


Game.prototype.getPlayers = function(){

  //get the players

};
Game.prototype.setBoard = function(){
  //rotate through players, choosing countries.
  
};

Game.prototype.distributeSoldiers = function(){
  //player recieves and places soldiers on countries at the start of turn.
  //1 player per country?
};

Game.prototype.checkInitiateWar = function(){
  //checks if a player wants to initiate a war, returns true or false
};

Game.prototype.initiateWar = function(){
  //creates new war object where current player is the aggressor and chooses
  //defender. Adds war object to the current wars array.
};

Game.prototype.toMoveMen = function(){
  //checks if a user wants to move soldiers. returns boolean
};

Game.prototype.moveMen = function(){
  //takes in input to move men from given country to another country.
};

Game.prototype.removeWar = function(war){

  var index = this.currentWars.indexOf(war);
  if (index >= 0) {
    this.currentWars.splice( index, 1 );
  }
};
