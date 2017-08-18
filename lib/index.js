// create game class in lieu of index keeps score and all that

const Bird = require('./Bird.js');
const Background = require('./Background.js');
const Ground  = require ('./Ground.js')
const Obstacle = require ('./Obstacle.js')
let style = require('./style.css');


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
      let newNumber = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
      obstacleArray.push (new Obstacle (newNumber, 328, 50, 200))
      console.log(newNumber);
    }

    function generateOtherXLocations(min, max) {
        let newNumber = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
        obstacleArray.push (new Obstacle (newNumber, 328, 50, 200))
        console.log(newNumber);
      }

    function randomNumber (){
      let newNumber = 500
      generateFirstXLocation((newNumber-20), newNumber)
      for (var i = 0; i < 10; i++) {
        generateOtherXLocations ((newNumber+50), (newNumber+400))
      }
  }

  randomNumber ()




const bird = new Bird (20,20);
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
  // collisionDetectionBelow();
  // collisionDetectionAbove();
  requestAnimationFrame(gameLoop);
  }

function birdUp(){
  bird.y -= 40;
}

function collisionDetectionBelow(){
  for (var i = 0; i < obstacleBelowArray.length; i++) {
    var o = obstacleBelowArray[i];
    if (( bird.x > o.x - 55 && bird.x < o.x + o.width + 55 && bird.y > o.y - 30) || bird.y > 485){
      alert("Game Over");
      document.location.reload();
      return;
    }
  }
}

function collisionDetectionAbove(){
  for (var i = 0; i < obstacleAboveArray.length; i++) {
    var o = obstacleAboveArray[i];
    if (bird.x > o.x - 55 && bird.x < o.x + o.width + 55 && bird.y < o.y + o.height){
      alert("Game Over");
      document.location.reload();
      return;
    }
  }
}




document.addEventListener('click', birdUp);

requestAnimationFrame(gameLoop);
