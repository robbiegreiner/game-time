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

	// create game class in lieu of index keeps score and all that

	const Bird = __webpack_require__(1);
	const Background = __webpack_require__(2);
	const Ground = __webpack_require__(3);
	const Obstacle = __webpack_require__(4);
	let style = __webpack_require__(5);

	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');

	// class Background {
	//   constructor () {
	//     this.x = 0;
	//     this.y = 0;
	//   }
	//
	//   draw (context){
	//     let bkgImage = new Image()
	//     bkgImage.src = '../assets/flappy_bckg.png';
	//     context.drawImage(bkgImage, this.x, this.y)
	//     }
	//
	//   backgroundMove(){
	//     this.x --;
	//     if (this.x<-1056){
	//       this.x = 0;
	//     }
	//   }
	// }

	let obstacleArray = [];

	function generateFirstXLocation(min, max) {
	  let newNumber = Math.round(Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min));
	  obstacleArray.push(new Obstacle(newNumber, 328, 50, 200));
	  console.log(newNumber);
	}

	function randomNumber() {
	  let newNumber = 500;
	  generateFirstXLocation(newNumber - 20, newNumber);
	}

	randomNumber();

	const bird = new Bird(20, 20);
	const background = new Background();
	const ground = new Ground();
	// const obstacle = new Obstacle (480, 328, 50, 200);
	// const obstacle2 = new Obstacle (700, 428,50, 100);
	// const obstacle3 = new Obstacle (900, 328, 50, 200);
	//
	// const aboveObstacle1 = new Obstacle (480, 0, 50, 200);
	// const aboveObstacle2 = new Obstacle (700, 0, 50, 260);
	// const aboveObstacle3 = new Obstacle (900, 0, 50, 200);


	// var obstacleBelowArray = [obstacle, obstacle2, obstacle3];
	//
	// var obstacleAboveArray = [aboveObstacle1,aboveObstacle2,aboveObstacle3];


	context.fillStyle = "rgba(255, 0, 255, 1)";

	function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  background.draw(context);
	  background.backgroundMove();
	  bird.draw(context);
	  ground.draw(context);
	  ground.groundMove();

	  // obstacle.draw(context); // iterator then call here
	  // obstacle.obstacleMove();
	  // obstacle3.draw(context);
	  // obstacle3.obstacleMove();
	  // obstacle2.draw(context);
	  // obstacle2.obstacleMove();
	  // aboveObstacle1.draw(context);
	  // aboveObstacle1.obstacleMove();
	  // aboveObstacle2.draw(context);
	  // aboveObstacle2.obstacleMove();
	  // aboveObstacle3.draw(context);
	  // aboveObstacle3.obstacleMove();
	  obstacleArray.forEach(function (obstacle) {
	    obstacle.draw(context);
	    obstacle.obstacleMove();
	  });
	  bird.gravity();
	  // collisionDetectionBelow();
	  // collisionDetectionAbove();
	  requestAnimationFrame(gameLoop);
	}

	function birdUp() {
	  bird.y -= 40;
	}

	// function collisionDetectionBelow(){
	//   for (var i = 0; i < obstacleBelowArray.length; i++) {
	//     var o = obstacleBelowArray[i];
	//     if (( bird.x > o.x - 55 && bird.x < o.x + o.width + 55 && bird.y > o.y - 30) || bird.y > 485){
	//       alert("Game Over");
	//       document.location.reload();
	//       return;
	//     }
	//   }
	// }
	//
	// function collisionDetectionAbove(){
	//   for (var i = 0; i < obstacleAboveArray.length; i++) {
	//     var o = obstacleAboveArray[i];
	//     if (bird.x > o.x - 55 && bird.x < o.x + o.width + 55 && bird.y < o.y + o.height){
	//       alert("Game Over");
	//       document.location.reload();
	//       return;
	//     }
	//   }
	// }


	document.addEventListener('click', birdUp);

	requestAnimationFrame(gameLoop);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	class Bird {
	  constructor(width, height) {
	    this.x = canvas.width / 2;
	    this.y = canvas.height / 2;
	    this.width = width;
	    this.height = height;
	  }

	  draw(context) {
	    let groundImage = new Image();
	    groundImage.src = '../assets/flappy-the-bird-use.png';
	    context.drawImage(groundImage, this.x, this.y);
	    // context.fillRect(this.x, this.y, this.width, this.height);
	  }

	  gravity() {
	    this.y += 1.5;
	  }
	}

	module.exports = Bird;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	class Background {
	  constructor() {
	    this.x = 0;
	    this.y = 0;
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
/* 3 */
/***/ (function(module, exports) {

	class Ground {
	  constructor() {
	    this.x = 0;
	    this.y = 528;
	  }

	  draw(context) {
	    let groundImage = new Image();
	    groundImage.src = '../assets/flappy-ground.png';
	    context.drawImage(groundImage, this.x, this.y);
	  }

	  groundMove() {
	    this.x--;
	    if (this.x < -1056) {
	      this.x = 0;
	    }
	  }
	}

	// class Ground extends Obstacle {
	//   super()
	// }


	module.exports = Ground;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	class Obstacle {
	  constructor(x, y, width, height) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	  }

	  draw(context) {
	    context.fillRect(this.x, this.y, this.width, this.height);
	  }

	  obstacleMove() {
	    this.x--;
	  }
	}

	module.exports = Obstacle;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "canvas {\n  border: 3px solid black;\n}\n", ""]);

	// exports


/***/ }),
/* 7 */
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
/* 8 */
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