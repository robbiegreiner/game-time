// create game class in lieu of index keeps score and all that

const Bird = require('./Bird.js');
const Background = require('./Background.js');
const Ground  = require ('./Ground.js')
const Obstacle = require ('./Obstacle.js')
let style = require('./style.css');


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var score = 0;
let obstacleArray = [];
let obstacleBelowArray = [];
let obstacleAboveArray = [];
var NewObstacleXLocation = 500

//lower Obstacle Randomizing
  function generateFirstXLocationLowerObstacle(min, max) {
      NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
      let NewObstacleHeightLowerObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150))));
      obstacleArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 50, 800))
      obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 50, 800))
      console.log(NewObstacleXLocation);
    }

    function generateOtherXLocationsLowerObstacle(min, max) {
        NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
        let NewObstacleHeightLowerObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150))));
        obstacleArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 50, 800))
        obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 50, 800))
        console.log(NewObstacleHeightLowerObstacle);
      }

    function randomXAndHeightGenerationLowerObstacle (){
      generateFirstXLocationLowerObstacle((NewObstacleXLocation-20), NewObstacleXLocation)
      for (var i = 0; i < 9; i++) {
        let lowerOrUpper = (Math.round((Math.random() * (parseInt(1)) + parseInt(1))));
        if(lowerOrUpper === 1){
          generateOtherXLocationsLowerObstacle ((NewObstacleXLocation + 300), (NewObstacleXLocation + 400))
          console.log(obstacleBelowArray);
        }else if (lowerOrUpper === 2) {
          generateOtherXLocationsUpperObstacle(NewObstacleXLocation + 300, NewObstacleXLocation + 400)
          console.log(obstacleAboveArray)
        }
      }
  }

  randomXAndHeightGenerationLowerObstacle ()


// upper Obstacles Randomizing
  // function generateFirstXLocationUpperObstacle(min, max) {
  //     NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  //     let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(450) - parseInt(350)) + parseInt(350))));
  //     obstacleArray.push (new Obstacle (NewObstacleXLocation, 0 , 50, NewObstacleHeightUpperObstacle))
  //     obstacleAboveArray.push (new Obstacle (NewObstacleXLocation, 0, 50, NewObstacleHeightUpperObstacle))
  //     console.log(NewObstacleXLocation);
  //   }

    function generateOtherXLocationsUpperObstacle(min, max) {
        NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
        let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(450) - parseInt(350)) + parseInt(350))));
        obstacleArray.push (new Obstacle (NewObstacleXLocation, 0, 50, NewObstacleHeightUpperObstacle))
        obstacleAboveArray.push (new Obstacle (NewObstacleXLocation, 0, 50, NewObstacleHeightUpperObstacle))
        console.log(NewObstacleHeightUpperObstacle);
      }

    function randomXAndHeightGenerationUpperObstacle (){
      generateFirstXLocationUpperObstacle((NewObstacleXLocation-20), NewObstacleXLocation)
      for (var i = 0; i < 9; i++) {
        generateOtherXLocationsUpperObstacle ((NewObstacleXLocation+300), (NewObstacleXLocation+400))
      }
  }


const bird = new Bird ();
const background = new Background;
const ground = new Ground;
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
  context.clearRect(0,0, canvas.width, canvas.height);
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
  obstacleArray.forEach(function(obstacle){
    obstacle.draw(context)
    obstacle.obstacleMove()
  })
  bird.gravity();
  collisionDetectionBelow();
  if (collision === true) {
    return;
  }
  collisionDetectionAbove();
  if (collision === true) {
    return;
  }
  updateScore();
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
      $('ul').append(
        "<li>Robbie Greiner:" + score + "</li><li><button class='play-again'>Play Again</button></li>");
      return;
    }
  }
}

function collisionDetectionAbove(){
  for (var i = 0; i < obstacleAboveArray.length; i++) {
    var o = obstacleAboveArray[i];
    if (bird.x > o.x - bird.width && bird.x < o.x + o.width - bird.width/2 && bird.y < o.y + o.height){
      collision = true;
      alert("Game Over");
      $('ul').append(
        "<li>Robbie Greiner:" + score + "</li><li><button class='play-again'>Play Again</button></li>");
      return;
    }
  }
}

function updateScore(){
  for (var i = 0; i < obstacleAboveArray.length; i++) {
    var o = obstacleAboveArray[i];
    if (bird.x === o.x + o.width){
      score++;
      $("#score-text").text(score);
    }
  }
}

function reloadPage(){
  console.log("hi");
  document.location.reload();
}


$('ul').on('click', '.play-again', reloadPage);
document.addEventListener('click', birdFly);

requestAnimationFrame(gameLoop);
