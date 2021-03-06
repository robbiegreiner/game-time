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
/***/ (function(module, exports, __webpack_require__) {

	const Bird = __webpack_require__(1);
	const Background = __webpack_require__(3);
	const Ground = __webpack_require__(4);
	const Obstacle = __webpack_require__(5);
	const ObstacleUpper = __webpack_require__(6);
	const Player = __webpack_require__(7);

	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');

	let obstacleBelowArray = [];
	let obstacleAboveArray = [];
	var NewObstacleXLocation = 500;
	let playerArray = [];
	let scores = [];
	let player;
	let orderedPlayerArray = [];

	// lower Obstacle Randomizing
	function generateFirstXLocationLowerObstacle(min, max) {
	  NewObstacleXLocation = Math.round(Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min));
	  let NewObstacleHeightLowerObstacle = Math.round(Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150));

	  obstacleBelowArray.push(new Obstacle(NewObstacleXLocation, NewObstacleHeightLowerObstacle, 75, 800));
	}

	function generateOtherXLocationsLowerObstacle(min, max) {
	  NewObstacleXLocation = Math.round(Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min));
	  let NewObstacleHeightLowerObstacle = Math.round(Math.random() * (parseInt(300) - parseInt(100)) + parseInt(100));

	  obstacleBelowArray.push(new Obstacle(NewObstacleXLocation, NewObstacleHeightLowerObstacle, 75, 800));
	}

	function firstRandomXAndHeightGenerationObstacle() {
	  let lowerOrUpper = Math.round(Math.random() * parseInt(1) + parseInt(1));

	  if (lowerOrUpper === 1) {
	    generateFirstXLocationLowerObstacle(NewObstacleXLocation - 20, NewObstacleXLocation);
	  } else if (lowerOrUpper === 2) {
	    generateFirstXLocationUpperObstacle(NewObstacleXLocation - 20, NewObstacleXLocation);
	  }
	}

	function randomXAndHeightGenerationObstacle() {
	  for (var i = 0; i < 4; i++) {
	    let lowerOrUpper = Math.round(Math.random() * parseInt(1) + parseInt(1));

	    if (lowerOrUpper === 1) {
	      generateOtherXLocationsLowerObstacle(NewObstacleXLocation + 300, NewObstacleXLocation + 400);
	    } else if (lowerOrUpper === 2) {
	      generateOtherXLocationsUpperObstacle(NewObstacleXLocation + 300, NewObstacleXLocation + 400);
	    }
	  }
	}

	function generateOtherXLocationsBothTubes(min, max) {
	  NewObstacleXLocation = Math.round(Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min));
	  let NewObstacleHeightUpperObstacle = Math.round(Math.random() * (parseInt(300) - parseInt(50)) + parseInt(50));

	  obstacleBelowArray.push(new Obstacle(NewObstacleXLocation, NewObstacleHeightUpperObstacle + 200, 75, 800));
	  obstacleAboveArray.push(new ObstacleUpper(NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle));
	}

	function generateOtherXLocationsBothTubesLevelFour(min, max) {
	  NewObstacleXLocation = Math.round(Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min));
	  let NewObstacleHeightUpperObstacle = Math.round(Math.random() * (parseInt(300) - parseInt(50)) + parseInt(50));

	  obstacleBelowArray.push(new Obstacle(NewObstacleXLocation, NewObstacleHeightUpperObstacle + 125, 75, 800));
	  obstacleAboveArray.push(new ObstacleUpper(NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle));
	}

	function randomTopAndBottomTubeGenerate() {
	  for (var i = 0; i < 10; i++) {
	    generateOtherXLocationsBothTubes(NewObstacleXLocation + 300, NewObstacleXLocation + 400);
	  }
	}

	function randomTopAndBottomTubeGenerateLevelFour() {
	  for (var i = 0; i < 100; i++) {
	    generateOtherXLocationsBothTubesLevelFour(NewObstacleXLocation + 300, NewObstacleXLocation + 400);
	  }
	}

	firstRandomXAndHeightGenerationObstacle();
	randomXAndHeightGenerationObstacle();
	randomTopAndBottomTubeGenerate();
	randomTopAndBottomTubeGenerateLevelFour();

	// upper Obstacles Randomizing
	function generateFirstXLocationUpperObstacle(min, max) {
	  NewObstacleXLocation = Math.round(Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min));
	  let NewObstacleHeightUpperObstacle = Math.round(Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150));

	  obstacleAboveArray.push(new ObstacleUpper(NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle));
	}

	function generateOtherXLocationsUpperObstacle(min, max) {
	  NewObstacleXLocation = Math.round(Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min));
	  let NewObstacleHeightUpperObstacle = Math.round(Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150));

	  obstacleAboveArray.push(new ObstacleUpper(NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle));
	}

	console.log(canvas.width);

	const bird = new Bird(canvas.width / 2, 250, 60, 48);
	const background = new Background(0, 0);
	const ground = new Ground(0, 528);

	context.fillStyle = "rgba(0, 0, 0, 0)";

	function gameLoop() {
	  updateScore();
	  showLevel();
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  background.draw(context);
	  background.backgroundMove();
	  bird.draw(context);
	  obstacleAboveArray.forEach(function (obstacle) {
	    if (player.score < 10) {
	      obstacle.obstacleMove(1.5);
	      obstacle.draw(context);
	      return;
	    } else if (player.score >= 10) {
	      obstacle.obstacleMove(3);
	      obstacle.draw(context);
	      return;
	    }
	  });
	  obstacleBelowArray.forEach(function (obstacle) {
	    if (player.score < 10) {
	      obstacle.obstacleMove(1.5);
	      obstacle.draw(context);
	      return;
	    } else if (player.score >= 10) {
	      obstacle.obstacleMove(3);
	      obstacle.draw(context);
	      return;
	    }
	  });
	  if (player.score < 10) {
	    ground.groundMove(1.5);
	  } else if (player.score >= 10) {
	    ground.groundMove(3);
	  }
	  ground.draw(context);
	  bird.gravity();
	  collisionDetectionBelow();
	  if (collision === true) {
	    return;
	  }
	  collisionDetectionAbove();
	  if (collision === true) {
	    return;
	  }
	  requestAnimationFrame(gameLoop);
	}

	function birdFly(event) {
	  if (event.keyCode === 38) {
	    bird.flyUp();
	  }
	}

	function birdFlyMouse(event) {
	  bird.flyUp();
	}

	var collision = false;

	function collisionDetectionBelow() {
	  for (var i = 0; i < obstacleBelowArray.length; i++) {
	    var o = obstacleBelowArray[i];

	    if (bird.x > o.x - bird.width && bird.x < o.x + o.width - bird.width / 2 && bird.y - 5 > o.y - bird.height || bird.y > 485) {
	      collision = true;
	      gameOver();
	      storePlayer(player.name);
	      $('ul').append("<li>" + player.name + " " + "<span class='score-text'>" + player.score + "</span></li>");
	      return;
	    }
	  }
	}

	function collisionDetectionAbove() {
	  for (var i = 0; i < obstacleAboveArray.length; i++) {
	    var o = obstacleAboveArray[i];

	    if (bird.x > o.x - bird.width && bird.x < o.x + o.width - bird.width / 2 && bird.y < o.y + 800) {
	      collision = true;
	      gameOver();
	      storePlayer(player.name);
	      $('ul').append("<li>" + player.name + " " + "<span class='score-text'>" + player.score + "</span></li>");
	      return;
	    }
	  }
	}

	function updateScore() {
	  if (player.score < 5) {
	    updateScoreUpperL1();
	    updateScoreLowerL1();
	  } else {
	    updateScoreL2();
	  }
	}

	function updateScoreL2() {
	  for (var i = 0; i < obstacleAboveArray.length; i++) {
	    var o = obstacleAboveArray[i];

	    if (bird.x > o.x + o.width && o.scored === false) {
	      o.scored = true;
	      player.score++;
	    }
	  }
	  $("#score-text").text(player.score);
	}

	function updateScoreUpperL1() {
	  for (var i = 0; i < obstacleAboveArray.length; i++) {
	    var o = obstacleAboveArray[i];

	    if (bird.x > o.x + o.width && o.scored === false) {
	      o.scored = true;
	      player.score++;
	    }
	  }
	  $("#score-text").text(player.score);
	}

	function updateScoreLowerL1() {
	  for (var i = 0; i < obstacleBelowArray.length; i++) {
	    var o = obstacleBelowArray[i];

	    if (bird.x > o.x + o.width && o.scored === false) {
	      o.scored = true;
	      player.score++;
	    }
	  }
	  $("#score-text").text(player.score);
	}

	function reloadPage() {
	  document.location.reload();
	}

	function storePlayer(playername) {
	  playerArray.push(player.name);
	  localStorage.setItem('playerArray', JSON.stringify(playerArray));
	  localStorage.setItem(playername, JSON.stringify(player));
	}

	function getPlayerScores() {
	  if (localStorage.length > 0) {
	    playerArray = JSON.parse(localStorage.getItem('playerArray'));
	    orderedPlayerArray = playerArray.sort(function (a, b) {
	      return a - b;
	    });
	    for (var i = 0; i < playerArray.length; i++) {
	      scores.push(JSON.parse(localStorage.getItem(playerArray[i])));
	    }
	    orderedPlayerArray = scores.sort(function (a, b) {
	      return parseFloat(b.score) - parseFloat(a.score);
	    });
	    postScores();
	  }
	}

	function postScores() {
	  for (var i = 0; i < orderedPlayerArray.length; i++) {
	    $('ul').append("<li>" + orderedPlayerArray[i].name + " " + "<span class='score-text'>" + orderedPlayerArray[i].score + "</span></li>");
	  }
	}

	$('.play-again-button').on('click', reloadPage);
	$('.play-button').on('click', startGame);
	$('.enter-name-button').on('click', hideNameInput);
	document.addEventListener('click', birdFlyMouse);
	document.addEventListener('keyup', birdFly);

	getPlayerScores();

	function hideNameInput() {
	  let name = $('input').val();
	  player = new Player(name);
	  $('.welcome-screen').remove();
	}

	function startGame() {
	  $('.instruction-screen').remove();
	  $('img').remove();
	  requestAnimationFrame(gameLoop);
	}

	function gameOver() {
	  $('.game-over').css('display', 'flex');
	}

	function showLevel() {
	  let level = 1;
	  if (player.score >= 5 && player.score < 10) {
	    level = 2;
	  } else if (player.score >= 10 && player.score < 15) {
	    level = 3;
	  } else if (player.score >= 15) {
	    level = 4;
	  }
	  $("#level-text").text(level);
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePieces = __webpack_require__(2);

	class Bird extends GamePieces {
	  constructor(x, y, width, height) {
	    super(x, y, width, height);
	    this.gravityCounter = 0;
	    this.drawCounter = 0;
	  }

	  draw(context) {
	    let birdImage = new Image();

	    birdImage.src = '../assets/flappy-the-bird-use.png';
	    context.drawImage(birdImage, this.x, this.y);
	    this.drawCounter++;
	    // context.fillRect(this.x, this.y, this.width, this.height);
	  }

	  gravity() {
	    this.gravityCounter++;
	    if (this.gravityCounter >= 0) {
	      this.y += 1.5;
	    }
	    if (this.gravityCounter >= 15) {
	      this.y += 2;
	    }
	    if (this.gravityCounter >= 30) {
	      this.y += 3;
	    }
	  }

	  flyUp() {
	    this.y -= 40;
	    this.gravityCounter = 0;
	  }
	}

	module.exports = Bird;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	class GamePieces {
	  constructor(x, y, width, height) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	  }
	}

	module.exports = GamePieces;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePieces = __webpack_require__(2);

	class Background extends GamePieces {
	  constructor(x, y) {
	    super(x, y);
	  }

	  draw(context) {
	    let bkgImage = new Image();

	    bkgImage.src = '../assets/flappy_bckg_try.png';
	    context.drawImage(bkgImage, this.x, this.y);
	  }

	  backgroundMove() {
	    this.x--;
	    if (this.x < -49520) {
	      this.x = 0;
	    }
	  }
	}

	module.exports = Background;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePieces = __webpack_require__(2);

	class Ground extends GamePieces {
	  constructor(x, y) {
	    super(x, y);
	  }

	  draw(context) {
	    let groundImage = new Image();

	    groundImage.src = '../assets/flappy-ground.png';
	    context.drawImage(groundImage, this.x, this.y);
	  }

	  groundMove(speed) {
	    this.x = this.x - speed;
	    if (this.x < -1056) {
	      this.x = 0;
	    }
	  }
	}

	module.exports = Ground;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePieces = __webpack_require__(2);

	class Obstacle extends GamePieces {
	  constructor(x, y, width, height) {
	    super(x, y, width, height);
	    this.scored = false;
	  }

	  draw(context) {
	    let tubeImageLower = new Image();

	    // context.fillRect(this.x, this.y, this.width, this.height);
	    tubeImageLower.src = '../assets/tubes_lower_use.png';
	    context.drawImage(tubeImageLower, this.x, this.y);
	  }

	  obstacleMove(speed) {
	    this.x = this.x - speed;
	  }
	}

	module.exports = Obstacle;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePieces = __webpack_require__(2);

	class ObstacleUpper extends GamePieces {
	  constructor(x, y, width, height) {
	    super(x, y, width, height);
	    this.scored = false;
	  }

	  draw(context) {
	    let tubeImageUpper = new Image();

	    tubeImageUpper.src = '../assets/tubes_uper_use.png';
	    context.drawImage(tubeImageUpper, this.x, this.y);
	  }

	  obstacleMove(speed) {
	    this.x = this.x - speed;
	  }
	}

	module.exports = ObstacleUpper;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	class Player {
	  constructor(name) {
	    this.name = name;
	    this.score = 0;
	  }

	}

	module.exports = Player;

/***/ })
/******/ ]);