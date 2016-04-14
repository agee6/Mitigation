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
	var secondKick = function(event){

	  var userInput = document.getElementById('user-input');
	  var UserName = userInput.value;
	  closeModal(event);

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
	var ComputerPlayer = __webpack_require__(7);
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
	  war.attackPlayer.getAttackSoldiers(war, index, this.getDefense);

	};
	Game.prototype.getDefense = function(war, index, attackSoldiers){
	  this.soldiersAttack = attackSoldiers;
	  war.defensePlayer.getDefensePlayers(war, index, this.battle);
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
	  debugger; 
	  var totalSoldiers = numberToPlace;
	  if(totalSoldiers > 0){
	    totalSoldiers -= 1;
	    this.players[this.currentPlayer].placeSoldiers(1, this.placeSecondSoldiers.bind(this), totalSoldiers);
	  }else {
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Country = __webpack_require__(3);
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	

	function Country(div){
	  this.owner = null;
	  this.troops = 0;
	  this.connections = [];
	  this.div = div;
	}

	Country.prototype.addConnection = function(){
	  this.connections = this.connections.concat(arguments);
	};

	Country.prototype.update = function(){
	  if(this.owner !== null){
	    var inner = "owner: " + this.owner.name +  " troops: " + this.troops;
	    this.div.innerHTML = inner;

	  }
	};
	module.exports = Country;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(5);
	var util = __webpack_require__(6);

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Player(name){
	  this.countriesOwned = [];
	  this.name = name;

	}

	Player.prototype.claimCountry = function(fromCountry, toCountry){
	  this.countries.Owned.push(toCountry);
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


/***/ },
/* 6 */
/***/ function(module, exports) {

	var Util = {


	  inherits: function(ChildClass, BaseClass){
	    function Surrogate(){this.constructor = ChildClass;  }
	    Surrogate.prototype = BaseClass.prototype;
	    ChildClass.prototype = new Surrogate();

	  }
	};

	module.exports = Util;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(5);
	var util = __webpack_require__(6);


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
	  var r2idx = Math.floor(Math.random()*(chosen.neighbors.length));
	  var defendor = chosen.neighbors[r2idx];

	};
	module.exports = ComputerPlayer;


/***/ }
/******/ ]);