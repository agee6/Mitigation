/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);

	var modal = document.getElementById('myModal');
	var startButton = document.getElementById("main-button");


	var kick = function(){
	  modal.style.display = "block";
	  submitName.disabled = false;
	  };
	var closeModal = function(event){
	  event.preventDefault();
	  modal.style.disply = "none";

	};
	var secondKick = function(){

	  var userInput = document.getElementById('user-input');
	  var UserName = userInput.value;

	  var game = new Game(UserName, 3);
	  game.startGame();
	};

	  //var newContent = document.createTextNode("Hi there and greetings!");

	  startButton.addEventListener('click', kick);

	var span = document.getElementsByClassName("close")[0];
	var submitName= document.getElementById('user-input-button');
	submitName.addEventListener('click', secondKick);


	// When the user clicks on <span> (x), close the modal



	// When the user clicks anywhere outside of the modal, close it
	window.addEventListener('click', function(event){
	  if (event.target === modal) {
	    modal.style.display = "none";
	  }

	});



	  // add the newly created element and its content into the DOM


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);
	var HumanPlayer = __webpack_require__(4);
	var ComputerPlayer = __webpack_require__(5);


	var Game = function(name, numPlayers){
	  this.board = new Board();
	  this.playersName = name;
	  this.players = [];
	  this.currentWars=[];
	  this.currentPlayer = 0;
	  this.gameOver = false;
	  this.inputDiv = document.getElementById("user-input");
	  this.gameDiv = document.getElementById('the-game');
	  this.mainButton = document.getElementById('main-button');
	  this.numPlayers = numPlayers;
	  this.instructionsDiv = document.getElementById('instruction-div');
	};

	Game.prototype.startGame = function(){
	  this.getPlayers();
	  this.setBoard();
	  this.gameOver = true;
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
	  var instructionDiv = document.getElementById('instruction-div');
	  var turnDiv = document.getElementById('turnDiv');
	  instructionDiv.innerHTML = "Please click on the country of your choice when it is your turn";

	  while(this.board.unclaimedCountries() > 0 ){
	    turnDiv='It is ' + this.players[this.currentPlayer].name + '\'s turn';
	    this.players.currentPlayer.claimUnclaimed(this.board);
	    this.rotatePlayers();

	  }
	  instructionDiv.innerHTML = "click on the country to place 2 soldiers on that country";

	  var totalSoldiers = 30;
	  while(totalSoldiers > this.numPlayers){
	    this.players.currentPlayer.placeSoldiers(2);
	    this.rotatePlayers();
	    totalSoldiers -= 2;
	  }
	  instructionDiv.innerHTML = "click on the country to place 1 soldiers on that country";

	  while(totalSoldiers > 0){
	    this.players.currentPlayer.placeSoldiers(1);
	    this.rotatePlayers();
	    totalSoldiers -= 1;
	  }

	};

	Game.prototype.distributeSoldiers = function(){
	  //player recieves and places soldiers on countries at the start of turn.
	  //1 player per country?
	  var numberPlayers = this.players[this.currentPlayer].numOwned();
	  this.instructionsDiv.innerHTML = "Place your men on the board";
	  this.players[this.currenPlayer].placeSoldiers(numberPlayers);
	};

	Game.prototype.checkInitiateWar = function(){

	  // this.instructionsDiv.innerHTML = "would you like to initiate a war?";
	  var stay = window.confirm("would you like to initiate a War?");

	  if(stay){
	    return true;
	  }else{
	    return false;
	  }
	  //checks if a player wants to initiate a war, returns true or false
	};

	Game.prototype.initiateWar = function(){
	  //creates new war object where current player is the aggressor and chooses
	  //defender. Adds war object to the current wars array.
	  this.currentWars.push(this.players[this.currentPlayer].startWar(this.board));

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
	 this.instructionsDiv.innerHTML = "click on which country you want to move men from and then to which to move. It will move one solider per click";
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Country = __webpack_require__(3);
	var Board = function(){
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
	};

	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports) {

	

	var Country = function(div){
	  this.owner = null;
	  this.troops = 0;
	  this.connections = [];
	  this.div = div;
	};

	Country.prototype.addConnection = function(){
	  this.connections = this.connections.concat(arguments);
	};

	module.exports = Country; 


/***/ },
/* 4 */
/***/ function(module, exports) {

	

/***/ },
/* 5 */
/***/ function(module, exports) {

	

/***/ }
/******/ ]);