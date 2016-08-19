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
	  modal.style.display = "none";


	};
	var secondKick = function(event){

	  var userInput = document.getElementById('user-input');
	  var UserName = userInput.value;
	  closeModal(event);

	  var game = new Game(UserName, 3);
	  submitName.removeEventListener('click', secondKick);
	  startButton.style.display = "none"; 
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
	var HumanPlayer = __webpack_require__(5);
	var ComputerPlayer = __webpack_require__(9);
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
	};

	Game.prototype.getPlayers = function(){

	  // Add code here that will connect to players using the pluggins. Need to figure this out this week, asap.
	  var computerNames = ['Nicolas Cage', 'Anita Job', 'Darth Bird', 'Legolas'];
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
	};

	Game.prototype.setBoard = function(){
	  //rotate through players, choosing countries.
	  var instructionDiv = document.getElementById('instruction-div');
	  this.rotatePlayers();
	  instructionDiv.innerHTML =
	    "Please click on the country of your choice when it is your turn";


	  if(this.board.unclaimedCountries.length> 0 ){
	    this.players[this.currentPlayer].claimUnclaimed(this.board, this.setBoard.bind(this));
	    debugger; 
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
	    this.distributeSoldiers(0);
	  }
	};


	Game.prototype.fightWars = function(index){
	  this.board.update();
	  var currentCountries = this.players[this.currentPlayer].countriesOwned;
	  for (var i = 0; i < currentCountries.length; i++) {
	    currentCountries[i].fightWars(this.startBattle, i, 0);
	  }

	  for (var i = index; i < this.currentWars.length; i++) {
	    if(this.currentWars[i].isOffense(this.players[this.currentPlayer])){
	      this.startBattle(this.currentWars[i], i);
	      break;
	    }
	  }

	  if(index >= this.currentWars.length || i >= this.currentWars.length){
	    this.players[this.currentPlayer].wantToWar(this.checkToWar.bind(this));
	  }
	};

	Game.prototype.checkToWar = function(toFightWar){
	  if(toFightWar){
	    this.instructionsDiv.innerHTML =
	      "choose from which country you will be attacking";
	    this.players[this.currentPlayer].startWar(this.board, this.initiateWar.bind(this));

	  }else{
	    this.instructionsDiv.innerHTML =
	     "click on which country you want to move men from and then to which to move. It will move one solider per click";
	    this.players[this.currentPlayer].moveMen( this.finishMove.bind(this));
	  }
	};

	Game.prototype.finishMove = function(){
	  this.rotatePlayers();
	  this.distributeSoldiers();
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
	  war.aggressor.owner.getAttackSoldiers(war, index, this.getDefense.bind(this));
	};

	Game.prototype.getDefense = function(war, index, attackSoldiers){
	  this.soldiersAttack = attackSoldiers;
	  war.defender.owner.getDefenseSoldiers(war, index, this.battle.bind(this));
	};

	Game.prototype.battle = function(war, index, defenseSoldiers){
	  this.soldiersDefend = defenseSoldiers;
	  if(this.soldiersAttack > this.soldiersDefend){
	    war.addAttackVictory();
	    alert(war.aggressor.owner.name + " has won the battle!");
	  }else {
	    war.addDefenseVictory();
	    alert(war.defender.owner.name + " has won the battle!");
	  }
	  war.updateSoldiers(this.soldiersAttack, this.soldiersDefend);

	  var defense = war.defender.owner;
	  if(war.over()){
	    if(defense.numOwned() === 0){
	      this.removePlayer(defense);
	    }
	    this.removeWar(war);
	    var warsToRemove = [];
	    for (var i = 0; i < this.currentWars.length; i++) {
	      if(this.currentWars[i].aggressor.owner === this.currentWars[i].defender.owner){
	        warsToRemove.push(i);
	      }
	    }
	    for (var j = 0; j < warsToRemove.length; j++) {
	      this.removeWar(warsToRemove[j]);
	    }
	    if(this.numPlayers === 1){
	      this.gameOver();
	    }
	  }
	  this.board.update();

	  if(index < this.currentWars.length){
	    index += 1;
	    this.fightWars(index);
	  }else{
	    this.players[this.currentPlayer].wantToWar(this.checkToWar.bind(this));
	  }
	};

	Game.prototype.removePlayer = function(player){
	  var index = this.players.indexOf(player);
	  if (index >= 0) {
	    this.players.splice( index, 1 );
	  }
	  this.numPlayers -= 1;
	};

	Game.prototype.distributeSoldiers = function(){
	  //player recieves and places soldiers on countries at the start of turn.
	  //1 player per country?
	  var numberPlayers = this.players[this.currentPlayer].numOwned();
	  this.instructionsDiv.innerHTML = "Place your men on the board";
	  this.players[this.currentPlayer].placeSoldiers(numberPlayers, this.fightWars.bind(this), 0);
	};

	Game.prototype.initiateWar = function(war){
	  //creates new war object where current player is the aggressor and chooses
	  //defender. Adds war object to the current wars array.
	  this.currentWars.push(war);
	  this.fightWars(this.currentWars.length-1);
	};

	Game.prototype.removeWar = function(war){
	  war.aggressor.owner.removeOWar(war);
	  war.defender.owner.removeDWar(war);
	  var index = this.currentWars.indexOf(war);
	  if (index >= 0) {
	    this.currentWars.splice( index, 1 );
	  }
	};

	Game.prototype.gameOver = function(){
	  this.warningDiv.innerHTML =
	    "congrats " + this.players[0].name + " you have conquered the world";
	};

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Country = __webpack_require__(3);
	var Connection = __webpack_require__(4);
	function Board(){
	    this.countries = [];
	    var allCountries = document.getElementsByClassName('country');
	    for (var i = 0; i < allCountries.length; i++) {
	      this.countries.push(new Country(allCountries[i]));
	    }
	    // var NADiv = document.getElementById('NorthAmerica');
	    // var SADiv = document.getElementById('SouthAmerica');
	    // var EDiv = document.getElementById('Europe');
	    //
	    // var AsiaDiv = document.getElementById('Asia');
	    //
	    // var MEDiv = document.getElementById('MiddleEast');
	    // var ADiv = document.getElementById('Africa');
	    // var AusDiv = document.getElementById('Australia');
	    //
	    // var Africa = new Country(ADiv);
	    // var Asia = new Country(AsiaDiv);
	    // var Europe = new Country(EDiv);
	    // var NorthAmerica = new Country(NADiv);
	    // var Hispania = new Country(SADiv);
	    //
	    //
	    // var MiddleEast = new Country(MEDiv);
	    // var Australia = new Country(AusDiv);

	    // var AfricaToMidEast = new Connection(Africa, MiddleEast);
	    // var AfricaToEurope = new Connection(Africa, Europe);
	    // var AfricaToHispania = new Connection(Africa, Hispania);
	    // var AsiaToEurope = new Connection(Asia, Europe);
	    // var AsiaToMiddleEast = new Connection(Asia, MiddleEast);
	    // var AsiaToAustrailia = new Connection(Asia, Australia);
	    // var AsiaToNorthAmerica = new Connection(Asia, NorthAmerica);
	    // var EuropeToMiddleEast = new Connection(Europe, MiddleEast);
	    // var EuropeToNorthAmerica = new Connection(Europe, NorthAmerica);
	    // var NorthAmericaToHispania = new Connection(NorthAmerica, Hispania);
	    //
	    //
	    // Africa.addConnection(AfricaToMidEast, AfricaToEurope, AfricaToHispania);
	    // Asia.addConnection(AsiaToEurope, AsiaToAustrailia, AsiaToMiddleEast, AsiaToNorthAmerica);
	    // Europe.addConnection(AfricaToEurope, EuropeToMiddleEast, AsiaToEurope, EuropeToNorthAmerica);
	    // NorthAmerica.addConnection(NorthAmericaToHispania, EuropeToNorthAmerica, AsiaToNorthAmerica);
	    // Hispania.addConnection(NorthAmericaToHispania, AfricaToHispania);
	    // MiddleEast.addConnection(AfricaToMidEast, EuropeToMiddleEast, AsiaToMiddleEast);
	    // Australia.addConnection(AsiaToAustrailia);
	    //
	    // this.countries.push(Africa);
	    // this.countries.push(Asia);
	    // this.countries.push(Europe);
	    // this.countries.push(NorthAmerica);
	    // this.countries.push(Hispania);
	    // this.countries.push(MiddleEast);
	    // this.countries.push(Australia);
	    debugger;
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
	  this.ableToMove = 0;
	  this.fighting = [];
	  this.defending = [];
	}

	Country.prototype.addConnection = function(){
	  // this.connections = this.connections.concat(arguments);
	  for (var i = 0; i < arguments.length; i++) {
	      this.connections.push(arguments[i]);
	  }
	};

	Country.prototype.neighbors = function(){
	  var neighborArr = [];
	  for (var i = 0; i < this.connections.length; i++) {
	    neighborArr.push(this.connections[i].getNeighbor(this));
	  }
	  return(neighborArr);
	};

	Country.prototype.getFriendlyNeighbors = function(){
	  var friendly = [];
	  for (var i = 0; i < this.connections.length; i++) {
	      if(this.connections[i].friendly){
	        friendly.push(this.connections[i].getNeighbor(this));
	      }
	  }
	  return friendly;
	};

	Country.prototype.getEnemyNeighbors = function(){
	  var enemies = [];
	  for (var i = 0; i < this.connections.length; i++) {
	    if(!this.connections[i].friendly){
	      enemies.push(this.connections[i].getNeighbor(this));
	    }
	  }
	};

	Country.prototype.update = function(){
	  if(this.owner !== null){
	    var inner = "owner: " + this.owner.name +  " troops: " + this.troops;
	    this.div.innerHTML = inner;
	  }
	};

	Country.prototype.fightWars = function(callback, indexOne, indexCurrent){
	  for (var i = indexCurrent; i < this.wars.length; i++) {
	    callback(this.wars[i], i);
	    break;
	  }
	};

	Country.prototype.resetFriendly = function(){
	  this.connections.forEach(function(connection){
	    connection.updateFriendly();
	  });
	};

	Country.prototype.resetAbleToMove = function(){
	  this.ableToMove = this.troops - 1;
	};

	Country.prototype.ableToFight = function(){
	  if(this.troops < 2){
	    return false;
	  }
	  var enemies = this.getEnemyNeighbors();
	  for (var i = 0; i < enemies.length; i++) {
	    if(enemies[i].atWar === false){
	      return true;
	    }
	  }
	  return false;
	};

	Country.prototype.addFight = function(country){
	  this.fighting.push(country);
	};

	Country.prototype.addDefend = function(country){
	  this.defending.push(country);
	};


	module.exports = Country;


/***/ },
/* 4 */
/***/ function(module, exports) {

	

	function Connection(country1, country2){
	  this.src1 = country1;
	  this.src2 = country2;
	  this.friendly = true;
	  this.atWar = false;
	}

	Connection.prototype.updateFriendly = function(){
	  if(this.country1.owner === this.country2.owner){
	    this.friendly = true;
	  }else{
	    this.friendly = false;
	  }
	};

	Connection.prototype.updateWar = function(war){
	  this.atWar = war;
	};

	Connection.prototype.endWar = function(){
	  this.atWar = false;
	  this.updateFriendly();
	};

	module.exports = Connection; 


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(6);
	var util = __webpack_require__(7);
	var War = __webpack_require__(8);

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

	HumanPlayer.prototype.placeSoldiers = function(num,callBack,soldiersRemaining){

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
	    attacker = board.getCountryByDiv(attackDiv);
	    for (var i = 0; i < that.ableToFight.length; i++) {
	      that.ableToFight[i].div.removeEventListener('click',setAttack);
	      that.ableToFight[i].div.classList.remove('glow');
	    }
	    setDefense();
	  };
	  for (var i = 0; i < this.ableToFight.length; i++) {
	    this.ableToFight[i].div.addEventListener('click',setAttack);
	    this.ableToFight[i].div.classList.add('glow');
	  }
	  var setDefense = function(){
	    for (var j = 0; j < attacker.ableToFight().length; j++) {
	      attacker.ableToFight()[j].div.addEventListener('click', sendAttack);
	      attacker.ableToFight()[j].div.classList.add('glow');
	    }
	    document.getElementById('instruction-div').innerHTML =
	      "Choose which country you would like to attack";
	  };

	  var sendAttack = function(){
	    var defenseDiv = event.target;
	    defender = board.getCountryByDiv(defenseDiv);
	    for (var j = 0; j < attacker.ableToFight().length; j++) {
	      attacker.ableToFight()[j].div.removeEventListener('click', sendAttack);
	      attacker.ableToFight()[j].div.classList.remove('glow');
	    }

	    var war = new War(attacker, defender);
	    that.addOWar(war);
	    defender.owner.addDWar(war);
	    callback(war);
	  };

	};

	HumanPlayer.prototype.wantToWar = function(callback){
	  var ableToWar = false;
	  this.ableToFight = [];
	  for (var i = 0; i < this.countriesOwned.length; i++) {
	    if(this.countriesOwned[i].ableToFight()){
	      this.ableToFight.push(this.countriesOwned[i]);
	      ableToWar = true;
	    }
	  }
	  if(!ableToWar){
	    callback(false);
	  }else{
	    var stay = window.confirm("would you like to initiate a War?");

	    if(stay){
	      callback(true);
	    }else{
	      callback(false);
	    }
	  }
	};

	HumanPlayer.prototype.moveMen = function(callback){
	  var finishDiv = document.getElementById('finished-moving');
	  var fromCountry;
	  var toCountry;
	  var warningDiv = document.getElementById('warning-div');
	  var numToMove = 1;
	  var that = this;
	  var placesToMove = [];
	  var oneClicked = false;
	  finishDiv.style.display = 'block';
	  var finishedMoving = function(event){
	    if(oneClicked){
	      for (var i = 0; i < placesToMove.length; i++) {
	        placesToMove[i].div.removeEventListener('click', moveTheMen);
	      }
	    }else{
	      for (var i = 0; i < that.countriesOwned.length; i++) {
	       that.countriesOwned[i].div.removeEventListener('click', toMove);
	       that.countriesOwned[i].div.classList.remove('glow');
	      }

	    }

	    finishDiv.style.display = "none";
	    finishDiv.removeEventListener('click', finishedMoving);
	    callback();

	  };


	  var moveTheMen = function(event){
	    var toDiv = event.target;
	    toCountry = that.getCountryFromDiv(toDiv);
	    fromCountry.troops -= numToMove;
	    fromCountry.ableToMove -= numToMove;
	    toCountry.troops += numToMove;
	    fromCountry.update();
	    toCountry.update();
	    oneClicked = false;
	    for (var i = 0; i < that.countriesOwned.length; i++) {
	      if(that.countriesOwned[i].ableToMove > 0 ){
	        that.countriesOwned[i].div.addEventListener('click', toMove);
	        that.countriesOwned[i].div.classList.add('glow');
	      }
	    }
	    for (var i = 0; i < placesToMove.length; i++) {
	      placesToMove[i].div.removeEventListener('click', moveTheMen);
	      placesToMove[i].div.classList.remove('glow');
	    }
	    placesToMove = [];
	  };

	  var toMove = function(event){
	    var fromDiv = event.target;
	    fromCountry = that.getCountryFromDiv(fromDiv);
	    var hasToMove = false;
	    for (var i = 0; i < fromCountry.connections.length; i++) {
	      if(fromCountry.connections[i].owner === that){
	        hasToMove = true;
	        placesToMove.push(fromCountry.connections[i]);
	      }
	    }


	    if(fromCountry.ableToMove < 1 || !hasToMove){
	      warningDiv.innerHTML = "No soldiers able to move here";
	    }else{
	      for (var i = 0; i < that.countriesOwned.length; i++) {
	       that.countriesOwned[i].div.removeEventListener('click', toMove);
	       that.countriesOwned[i].div.classList.remove('glow');
	      }
	      for (var i = 0; i < placesToMove.length; i++) {
	        placesToMove[i].div.addEventListener('click', moveTheMen);
	        placesToMove[i].div.classList.add('glow');
	      }
	      oneClicked = true;
	    }
	  };

	  finishDiv.addEventListener('click', finishedMoving);
	  for (var i = 0; i < this.countriesOwned.length; i++) {

	    this.countriesOwned[i].resetAbleToMove();
	    if(this.countriesOwned[i].ableToMove > 0){
	      this.countriesOwned[i].div.addEventListener('click', toMove);
	      this.countriesOwned[i].div.classList.add('glow');
	    }
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

	    event.preventDefault();
	    inputVal = parseInt(input.value);
	    if(inputVal > 0 && inputVal <= max){
	      inputBut.removeEventListener('click', validateInput);
	      modal.style.display = "none";

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

	    event.preventDefault();
	    inputVal = parseInt(input.value);
	    if(inputVal > 0 && inputVal <= max){
	      inputBut.removeEventListener('click', validateInput);
	      modal.style.display = "none";

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


/***/ },
/* 6 */
/***/ function(module, exports) {

	function Player(name){
	  this.countriesOwned = [];
	  this.name = name;
	  this.ableToFight = [];
	  this.currentOffensiveWars = [];
	  this.defending = [];

	}

	Player.prototype.claimCountry = function(fromCountry, toCountry){
	  
	  this.countriesOwned.push(toCountry);
	  toCountry.owner.removeCountry(toCountry);
	  toCountry.owner = this;
	  if(toCountry.troops < 1){
	    fromCountry.troops -=1;
	    toCountry.troops += 1;
	  }
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
	Player.prototype.addOWar = function(war){
	  this.currentOffensiveWars.push(war);
	};
	Player.prototype.addDWar = function(war){
	  this.defending.push(war);
	};
	Player.prototype.removeOWar = function(war){

	};
	Player.prototype.removeDWar = function(war){

	};
	Player.prototype.inWarWith = function(country){
	  for (var i = 0; i < this.currentOffensiveWars.length; i++) {
	    if(this.currentOffensiveWars[i].defender === country){
	      return true;
	    }
	  }
	  for (var j = 0; j < this.defending.length; j++) {
	    if(this.defending[j].aggressor === country){
	      return true;
	    }
	  }
	  return false;
	};

	module.exports = Player;


/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	

	function War(aggressor, defendor){
	  this.aggressor = aggressor;
	  this.defender = defendor;
	  this.battles = [];
	  this.victor = null;
	}

	War.prototype.isOffense = function(player){
	  if(this.aggressor.owner === player){
	    return true;
	  }else {
	    return false;
	  }
	};

	War.prototype.addAttackVictory = function(){
	    this.battles.push(1);
	};

	War.prototype.addDefenseVictory = function(){
	  this.battles.push(0);
	};

	War.prototype.updateSoldiers = function(attackMen, defenseMen){
	  var lessOffense = Math.ceil(attackMen/2);
	  var lessDefense = Math.floor(defenseMen/2);
	  if(this.defender.troops === 1){
	    lessDefense = 1;
	  }
	  this.aggressor.troops = this.aggressor.troops - lessOffense;
	  this.defender.troops = this.defender.troops - lessDefense;
	};


	War.prototype.over = function(){
	  if(this.defender.troops === 0){
	    this.aggressor.owner.claimCountry(this.aggressor,this.defender);
	    return true;
	  }
	  var arrSum = 0;
	  this.battles.forEach(function(battle){
	    arrSum += battle;
	  });
	  if(arrSum >= 2){
	    this.aggressor.owner.claimCountry(this.aggressor, this.defender);
	    return true;
	  }
	  if(this.battles.length === 3 ){
	    return true;

	  }
	  return false;
	};

	module.exports = War;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(6);
	var util = __webpack_require__(7);
	var War = __webpack_require__(8);


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
	  var rIdx = Math.floor(Math.random()*(this.ableToFight.length));
	  var chosen = this.ableToFight[rIdx];
	  var r2idx = Math.floor(Math.random()*(chosen.ableToFight().length));
	  var defendor = chosen.ableToFight()[r2idx];
	  var war = new War(chosen, defendor);
	  this.addOWar(war);
	  defendor.owner.addDWar(war);
	  callback(war);

	};

	ComputerPlayer.prototype.wantToWar = function(callback){
	  var choice = Math.random();
	  var ableToWar = false;
	  this.ableToFight = [];
	  for (var i = 0; i < this.countriesOwned.length; i++) {
	    if(this.countriesOwned[i].ableToFight()){
	      this.ableToFight.push(this.countriesOwned[i]);
	      ableToWar = true;
	    }
	  }

	  if(!ableToWar){
	    callback(false);
	  }else{
	    if(choice > 0.5 ){
	      callback(true);
	    }else {
	      callback(false);
	    }

	  }

	};

	ComputerPlayer.prototype.moveMen = function(callback){
	  callback();
	};
	ComputerPlayer.prototype.getAttackSoldiers = function(war, index, callback){
	  var choice = Math.floor(Math.random() * (war.aggressor.troops - 1)) + 1;
	  callback(war, index, choice);
	};
	ComputerPlayer.prototype.getDefenseSoldiers = function(war, index, callback){
	  var choice = Math.floor(Math.random() * war.defender.troops) + 1;
	  callback(war, index, choice);
	};

	module.exports = ComputerPlayer;


/***/ }
/******/ ]);