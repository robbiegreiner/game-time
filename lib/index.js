const Bird = require('./Bird.js');
const Background = require('./Background.js');
const Ground  = require ('./Ground.js')
const Obstacle = require ('./Obstacle.js')
const ObstacleUpper = require ('./ObstacleUpper.js')
const Player = require ('./Player.js');
let style = require('./style.css');


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


let obstacleArray = [];
let obstacleBelowArray = [];
let obstacleAboveArray = [];
var NewObstacleXLocation = 500
let playerArray = [];
let scores = [];
let player;


// lower Obstacle Randomizing
  function generateFirstXLocationLowerObstacle(min, max) {
      NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
      let NewObstacleHeightLowerObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150))));
      obstacleArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 50, 800))
      obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 75, 800))
      console.log(NewObstacleXLocation);
    }

function generateOtherXLocationsLowerObstacle(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightLowerObstacle = (Math.round((Math.random() * (parseInt(200) - parseInt(100)) + parseInt(100))));
  obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 75, 800))
  // console.log(NewObstacleHeightLowerObstacle);
  }

  function firstRandomXAndHeightGenerationLowerObstacle (){
      let lowerOrUpper = (Math.round((Math.random() * (parseInt(1)) + parseInt(1))));
      if(lowerOrUpper === 1){
        generateFirstXLocationLowerObstacle((NewObstacleXLocation-20), NewObstacleXLocation)
        console.log(obstacleBelowArray);
      } else if (lowerOrUpper === 2) {
        generateFirstXLocationUpperObstacle((NewObstacleXLocation-20), NewObstacleXLocation)
        console.log(obstacleAboveArray)
      }
    }


    function randomXAndHeightGenerationLowerObstacle (){
      // generateFirstXLocationLowerObstacle((NewObstacleXLocation-20), NewObstacleXLocation)
      for (var i = 0; i < 40; i++) {
        let lowerOrUpper = (Math.round((Math.random() * (parseInt(1)) + parseInt(1))));
        if(lowerOrUpper === 1){
          // generateFirstXLocationLowerObstacle((NewObstacleXLocation-20), NewObstacleXLocation)
          generateOtherXLocationsLowerObstacle ((NewObstacleXLocation + 300), (NewObstacleXLocation + 400))
          // console.log(obstacleBelowArray);
        } else if (lowerOrUpper === 2) {
          // generateFirstXLocationUpperObstacle((NewObstacleXLocation-20), NewObstacleXLocation)
          generateOtherXLocationsUpperObstacle(NewObstacleXLocation + 300, NewObstacleXLocation + 400)
        }
      }
    }

  firstRandomXAndHeightGenerationLowerObstacle ()
  randomXAndHeightGenerationLowerObstacle ()


// upper Obstacles Randomizing
  function generateFirstXLocationUpperObstacle(min, max) {
      NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
      let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(400) - parseInt(150)) + parseInt(150))));
      obstacleAboveArray.push (new ObstacleUpper (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle))
    }

    function generateOtherXLocationsUpperObstacle(min, max) {
        NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
        let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(400) - parseInt(150)) + parseInt(150))));
        obstacleAboveArray.push (new ObstacleUpper (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle))
      }

  //   function randomXAndHeightGenerationUpperObstacle (){
  //     // generateFirstXLocationUpperObstacle((NewObstacleXLocation-20), NewObstacleXLocation)
  //     for (var i = 0; i < 9; i++) {
  //       generateOtherXLocationsUpperObstacle ((NewObstacleXLocation+300), (NewObstacleXLocation+400))
  //     }
  // }




const bird = new Bird ();
const background = new Background;
const ground = new Ground;

context.fillStyle = "rgba(0, 0, 0, 0)";

function gameLoop() {
  updateScoreUpper();
  updateScoreLower();
  context.clearRect(0,0, canvas.width, canvas.height);
  background.draw(context);
  background.backgroundMove();
  bird.draw(context);
  obstacleAboveArray.forEach(function(obstacle){
    if(player.score <= 3){
      obstacle.obstacleMove(2);
      obstacle.draw(context);
      return;
    }
    if(player.score < 6 ){
      obstacle.obstacleMove(3);
      obstacle.draw(context);
      return;
    }
    if(player.score < 9){
      obstacle.obstacleMove(4);
      obstacle.draw(context)
      return;
    }
    if(player.score < 12){
      obstacle.obstacleMove(5);
      obstacle.draw(context);
      return;
    }
  })
  obstacleBelowArray.forEach(function(obstacle){
    if(player.score <= 3){
      obstacle.obstacleMove(2);
      obstacle.draw(context);
      return;
    }
    if(player.score < 6 ){
      obstacle.obstacleMove(3);
      obstacle.draw(context);
      return;
    }
    if(player.score < 9){
      obstacle.obstacleMove(4);
      obstacle.draw(context)
      return;
    }
    if(player.score < 12){
      obstacle.obstacleMove(5);
      obstacle.draw(context);
      return;
    }
  });
  ground.draw(context);
  ground.groundMove();
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

function birdFly(){
  bird.flyUp();
}

var collision = false;

function collisionDetectionBelow(){
  for (var i = 0; i < obstacleBelowArray.length; i++) {
    var o = obstacleBelowArray[i];
    if (bird.x > o.x - bird.width && bird.x < o.x + o.width - bird.width/2 && bird.y - 5 > o.y - bird.height || bird.y > 485){
      collision = true;
      alert("Game Over");
      storePlayer(player.name);
      $('ul').append(
        "<li>" + player.name + " " + player.score + "</li><li><button class='play-again'>Play Again</button></li>");
      return;
    }
  }
}

function collisionDetectionAbove(){
  for (var i = 0; i < obstacleAboveArray.length; i++) {
    var o = obstacleAboveArray[i];
    if (bird.x > o.x - bird.width && bird.x < o.x + o.width - bird.width/2 && bird.y < o.y + 800) {
      collision = true;
      alert("Game Over");
      storePlayer(player.name);
      $('ul').append(
        "<li>" + player.name + " " + player.score + "</li><li><button class='play-again'>Play Again</button></li>");
      return;
    }
  }
}

function updateScoreUpper(){
  for (var i = 0; i < obstacleAboveArray.length; i++) {
    var o = obstacleAboveArray[i];
    if (bird.x > o.x + o.width && o.scored === false){
      o.scored = true;
      player.score++;
    }
  }
  $("#score-text").text(player.score);
}

function updateScoreLower(){
  for (var i = 0; i < obstacleBelowArray.length; i++) {
    var o = obstacleBelowArray[i];
    if (bird.x > o.x + o.width && o.scored === false){
      o.scored = true;
      player.score++;
    }
  }
  $("#score-text").text(player.score);
}

function reloadPage(){
  // console.log("hi");
  document.location.reload();
}

function storePlayer(playername){
  playerArray.push(player.name);
  localStorage.setItem('playerArray', JSON.stringify(playerArray));
  localStorage.setItem(playername, JSON.stringify(player));
}

function getPlayerScores(){
  if(localStorage.length > 0){
    playerArray = JSON.parse(localStorage.getItem('playerArray'))
    for (var i = 0; i < playerArray.length; i++) {
      scores.push(JSON.parse(localStorage.getItem(playerArray[i])));
    }
    postScores();
  }
}

function postScores(){
  for (var i = 0; i < scores.length; i++) {
    $('ul').append("<li>" + scores[i].name + " " + scores[i].score + "</li>")
  }
}



$('ul').on('click', '.play-again', reloadPage);
$('.play-button').on('click', startGame);
document.addEventListener('click', birdFly);
document.addEventListener('keyup', birdFly);

getPlayerScores();

function startGame(){
  let name = $('input').val();
  player = new Player(name);
  $('.welcome-screen').remove()
  requestAnimationFrame(gameLoop);
}
