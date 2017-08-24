const Bird = require('./Bird.js');
const Background = require('./Background.js');
const Ground  = require ('./Ground.js')
const Obstacle = require ('./Obstacle.js')
const Player = require ('./Player.js');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let obstacleBelowArray = [];
let obstacleAboveArray = [];
let NewObstacleXLocation = 500;
let playerArray = [];
let scores = [];
let player;
let orderedPlayerArray = [];
let collision = false;
const bird = new Bird (canvas.width / 2, 250, 60, 48);
const background = new Background(0, 0);
const ground = new Ground(0, 528);

$('.play-again-button').on('click', reloadPage);
$('.play-button').on('click', startGame);
$('.enter-name-button').on('click', hideNameInput);
$(document).on('click', birdFlyMouse);
$(document).on('keydown', birdFly);

firstRandomXAndHeightGenerationObstacle ()
randomXAndHeightGenerationObstacle ()
randomTopAndBottomTubeGenerate ()
randomTopAndBottomTubeGenerateLevelFour ()
getPlayerScores();

function gameLoop () {
  updateScore();
  showLevel();
  context.clearRect(0, 0, canvas.width, canvas.height);
  background.draw(context);
  background.backgroundMove();
  bird.draw(context);
  obsacleIterator();
  groundSpeed();
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

function obsacleIterator () {
  obstacleAboveArray.forEach(function(obstacle) {
    if (player.score < 10) {
      obstacle.obstacleMove(1.5);
      obstacle.draw(context);
    } else if (player.score >= 10) {
      obstacle.obstacleMove(3);
      obstacle.draw(context);
    }
  })
  obstacleBelowArray.forEach(function(obstacle) {
    if (player.score < 10) {
      obstacle.obstacleMove(1.5);
      obstacle.draw(context);
    } else if (player.score >= 10) {
      obstacle.obstacleMove(3);
      obstacle.draw(context);
    }
  })
}

function groundSpeed () {
  if (player.score < 10) {
    ground.groundMove(1.5);
  } else if (player.score >= 10) {
    ground.groundMove(3);
  }
}


// lower Obstacle Randomizing
function generateFirstXLocationLowerObstacle(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightLowerObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150))));

  obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 75, 800, '../assets/tubes_lower_use.png'))
}

function generateOtherXLocationsLowerObstacle(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightLowerObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(100)) + parseInt(100))));

  obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 75, 800, '../assets/tubes_lower_use.png'))
}

function firstRandomXAndHeightGenerationObstacle () {
  let lowerOrUpper = (Math.round((Math.random() * (parseInt(1)) + parseInt(1))));

  if (lowerOrUpper === 1) {
    generateFirstXLocationLowerObstacle ((NewObstacleXLocation - 20), NewObstacleXLocation)
  } else if (lowerOrUpper === 2) {
    generateFirstXLocationUpperObstacle((NewObstacleXLocation - 20), NewObstacleXLocation)
  }
}


function randomXAndHeightGenerationObstacle () {
  for (var i = 0; i < 4; i++) {
    let lowerOrUpper = (Math.round((Math.random() * (parseInt(1)) + parseInt(1))));

    if (lowerOrUpper === 1) {
      generateOtherXLocationsLowerObstacle ((NewObstacleXLocation + 300), (NewObstacleXLocation + 400))
    } else if (lowerOrUpper === 2) {
      generateOtherXLocationsUpperObstacle(NewObstacleXLocation + 300, NewObstacleXLocation + 400)
    }
  }
}


function generateOtherXLocationsBothTubes(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(50)) + parseInt(50))));

  obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightUpperObstacle + 200, 75, 800, '../assets/tubes_lower_use.png'))
  obstacleAboveArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle, '../assets/tubes_uper_use.png'))
}

function generateOtherXLocationsBothTubesLevelFour(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(50)) + parseInt(50))));

  obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightUpperObstacle + 125, 75, 800, '../assets/tubes_lower_use.png'))
  obstacleAboveArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle, '../assets/tubes_uper_use.png'))
}

function randomTopAndBottomTubeGenerate () {
  for (var i = 0; i < 10; i++) {
    generateOtherXLocationsBothTubes(NewObstacleXLocation + 300, NewObstacleXLocation + 400)
  }
}

function randomTopAndBottomTubeGenerateLevelFour () {
  for (var i = 0; i < 100; i++) {
    generateOtherXLocationsBothTubesLevelFour(NewObstacleXLocation + 300, NewObstacleXLocation + 400)
  }
}

// upper Obstacles Randomizing
function generateFirstXLocationUpperObstacle(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150))));

  obstacleAboveArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle, '../assets/tubes_uper_use.png'))
}

function generateOtherXLocationsUpperObstacle(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150))));

  obstacleAboveArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle, '../assets/tubes_uper_use.png'))
}

function birdFly (event) {

  if (event.keyCode === 38) {
    event.returnValue = false;
    bird.flyUp();
  }
}

function birdFlyMouse () {
  bird.flyUp();
}

function collisionDetectionBelow() {
  for (var i = 0; i < obstacleBelowArray.length; i++) {
    let o = obstacleBelowArray[i];

    if (bird.x > o.x - bird.width && bird.x < o.x + o.width - bird.width / 2 && bird.y - 5 > o.y - bird.height || bird.y > 485) {
      collision = true;
      gameOver();
      storePlayer(player.name);
      playerAppend();
      return;
    }
  }
}

function collisionDetectionAbove() {
  for (var i = 0; i < obstacleAboveArray.length; i++) {
    let o = obstacleAboveArray[i];

    if (bird.x > o.x - bird.width && bird.x < o.x + o.width - bird.width / 2 && bird.y < o.y + 800) {
      collision = true;
      gameOver();
      storePlayer(player.name);
      playerAppend();
      return;
    }
  }
}

function playerAppend() {
  $('ul').append("<li>" + player.name + " " +  "<span class='score-text'>" + player.score + "</span></li>");
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
    orderedPlayerArray = playerArray.sort(function(a, b) {
      return a - b
    })
    for (var i = 0; i < playerArray.length; i++) {
      scores.push(JSON.parse(localStorage.getItem(playerArray[i])));
    }
    orderedPlayerArray = scores.sort(function(a, b) {
      return parseFloat(b.score) - parseFloat(a.score)
    })
    postScores();
  }
}

function postScores() {
  for (var i = 0; i < orderedPlayerArray.length; i++) {
    $('ul').append("<li>" + orderedPlayerArray[i].name + " " +  "<span class='score-text'>" + orderedPlayerArray[i].score + "</span></li>")
  }
}

function hideNameInput() {
  if ($('input').val() === "") {
    alert("Please Enter Your Name");
    return;
  }
  let name = $('input').val();
  
  player = new Player(name);
  $('.welcome-screen').remove();
}

function startGame() {
  $('.instruction-screen').remove()
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
