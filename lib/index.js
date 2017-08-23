const Bird = require('./Bird.js');
const Background = require('./Background.js');
const Ground  = require ('./Ground.js')
const Obstacle = require ('./Obstacle.js')
const ObstacleUpper = require ('./ObstacleUpper.js')
const Player = require ('./Player.js');
let style = require('./style.css');


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


let obstacleBelowArray = [];
let obstacleAboveArray = [];
var NewObstacleXLocation = 500
let playerArray = [];
let scores = [];
let player;
let orderedPlayerArray = [];


// lower Obstacle Randomizing
function generateFirstXLocationLowerObstacle(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightLowerObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150))));

  obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 75, 800))
}

function generateOtherXLocationsLowerObstacle(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightLowerObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(100)) + parseInt(100))));

  obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 75, 800))
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

  obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightUpperObstacle + 200, 75, 800))
  obstacleAboveArray.push (new ObstacleUpper (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle))
}

function randomTopAndBottomTubeGenerate () {
  for (var i = 0; i < 20; i++) {
    generateOtherXLocationsBothTubes(NewObstacleXLocation + 300, NewObstacleXLocation + 400)
  }
}


firstRandomXAndHeightGenerationObstacle ()
randomXAndHeightGenerationObstacle ()
randomTopAndBottomTubeGenerate ()


// upper Obstacles Randomizing
function generateFirstXLocationUpperObstacle(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150))));

  obstacleAboveArray.push (new ObstacleUpper (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle))
}

function generateOtherXLocationsUpperObstacle(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150))));

  obstacleAboveArray.push (new ObstacleUpper (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle))
}


console.log(canvas.width);

const bird = new Bird (canvas.width/2, canvas.height/2, 60, 48);
const background = new Background(0, 0);
const ground = new Ground(0, 528);

context.fillStyle = "rgba(0, 0, 0, 0)";

function gameLoop () {
  updateScore();
  showLevel();
  context.clearRect(0, 0, canvas.width, canvas.height);
  background.draw(context);
  background.backgroundMove();
  bird.draw(context);
  obstacleAboveArray.forEach(function(obstacle) {
    if (player.score < 10) {
      obstacle.obstacleMove(1.5);
      obstacle.draw(context);
      return;
    } else if (player.score >= 10) {
      obstacle.obstacleMove(3);
      obstacle.draw(context);
      return;
    }
  })
  obstacleBelowArray.forEach(function(obstacle) {
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
  } else if(player.score >= 10){
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


function birdFly(event){
  if(event.keyCode === 38){
    bird.flyUp();
  }
}

function birdFlyMouse(event){
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
      $('ul').append("<li>" + player.name + " " +  "<span class='score-text'>" + player.score + "</span></li>");
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
      $('ul').append("<li>" + player.name + " " +  "<span class='score-text'>" + player.score + "</span></li>");
      return;
    }
  }
}

function updateScore() {
  if(player.score < 5){
    updateScoreUpperL1();
    updateScoreLowerL1();
  } else{
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

function getPlayerScores(){
  if(localStorage.length > 0){
    playerArray = JSON.parse(localStorage.getItem('playerArray'));
    orderedPlayerArray = playerArray.sort(function(a,b){
      return a - b
    })
    for (var i = 0; i < playerArray.length; i++) {
      scores.push(JSON.parse(localStorage.getItem(playerArray[i])));
    }
    orderedPlayerArray = scores.sort(function(a,b){
      return parseFloat(b.score) - parseFloat(a.score)
    })
    postScores();
  }
}

function postScores(){
  for (var i = 0; i < orderedPlayerArray.length; i++) {
    $('ul').append("<li>" + orderedPlayerArray[i].name + " " +  "<span class='score-text'>" + orderedPlayerArray[i].score + "</span></li>")
  }
}



$('.play-again-button').on('click', reloadPage);
$('.play-button').on('click', startGame);
$('.enter-name-button').on('click', hideNameInput);
document.addEventListener('click', birdFlyMouse);
document.addEventListener('keyup', birdFly);

getPlayerScores();

function hideNameInput(){
  let name = $('input').val();
  player = new Player(name);
  $('.welcome-screen').remove();
}

function startGame(){
  $('.instruction-screen').remove()
  $('img').remove();
  requestAnimationFrame(gameLoop);
}

function gameOver(){
  $('.game-over').css('display','flex');
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
