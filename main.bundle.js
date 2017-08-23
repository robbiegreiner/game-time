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
	let style = __webpack_require__(8);

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

	function randomTopAndBottomTubeGenerate() {
	  for (var i = 0; i < 20; i++) {
	    generateOtherXLocationsBothTubes(NewObstacleXLocation + 300, NewObstacleXLocation + 400);
	  }
	}

	firstRandomXAndHeightGenerationObstacle();
	randomXAndHeightGenerationObstacle();
	randomTopAndBottomTubeGenerate();

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

	const bird = new Bird(canvas.width / 2, canvas.height / 2, 60, 48);
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
	  for (var i = 0; i < 15; i++) {
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
	  } else if (player.score >= 10) {
	    level = 3;
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

	    bkgImage.src = '../assets/flappy_bckg.png';
	    context.drawImage(bkgImage, this.x, this.y);
	  }

	  backgroundMove() {
	    this.x--;
	    if (this.x < -1056) {
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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "body{\nfont-family: 'Press Start 2P', cursive;\nbackground-color: #008c41;\nbackground-image: url(\"/Users/admin/turing/mod2/game-time/assets/basketball.png\");\n}\n\ncanvas {\n  border: 3px solid black;\n  position: absolute;\n  left: 15%;\n  top: 83px;\n}\n\nsection{\n  display: flex;\n  margin-top: 79px;\n}\n\n.welcome-screen,\n.game-over,\n.instruction-screen{\n  position: absolute;\n  top: 300px;\n  left: 17.2%;\n  height: 200px;\n  width: 400px;\n  background-color: #058213;\n  z-index: 1;\n  color: #593a01;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  border-radius: 10px;\n  border: 2px solid #825705;\n}\n\n.game-over{\n  z-index: 3;\n  display: none;\n}\n\n.instruction-screen{\n  z-index: 1;\n}\n\n.welcome-screen{\n  z-index: 2;\n}\n\nimg{\n  position: absolute;\n  left: 15.1%;\n  top: 86px;\n  height: 600;\n  width: 480;\n  z-index: 0;\n}\n\ninput{\n  width: 150px;\n  margin-bottom: 10px;\n}\n\nbutton{\n  width: 150px;\n}\n\n.duck-soup-h1{\n  margin: 0;\n  margin-bottom: 40px;\n}\n\n.score-board{\n  width: 480px;\n  height: 640px;\n  background-color: #058213;\n  margin-left: 30px;\n  border: 3px solid black;\n  position: absolute;\n  left: 60%;\n  top: 83px;\n}\n\nul{\n  list-style-type: none;\n  margin-left: 10%;\n}\n\nli{\n  font-size: 20px;\n  margin-bottom: 10px;\n  width: 300px;\n}\n\n.score-text{\n  float: right;\n}\n\nh2{\n  display: inline-block;\n  margin-left: 19%;\n  margin-bottom: 0;\n}\n\n.score-h2{\n  margin-left: 100px;\n}\n\n.top-score{\n  position: absolute;\n  left: 27%;\n  top: 80px;\n  z-index: 3;\n  color: white;\n  font-size: 40px;\n}\n\n.top-level{\n  position: absolute;\n  left: 16%;\n  top: 640px;\n  z-index: 3;\n  color: white;\n  font-size: 16px;\n}\n\nh4{\n  margin: 0;\n  margin-bottom: 20px;\n}\n", ""]);

	// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ]);