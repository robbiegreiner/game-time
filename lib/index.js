const Bird = require('./Bird.js');
const Ground  = require ('./Ground.js')
const Obstacle = require ('./Obstacle.js')
let style = require('./style.css');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Background {
  constructor () {
    this.x = 0;
    this.y = 0;
  }

  draw (context){
    let bkgImage = new Image()
    bkgImage.src = '../assets/flappy_bckg.png';
    context.drawImage(bkgImage, this.x, this.y)
    }

  backgroundMove(){
    this.x --;
    if (this.x<-1056){
      this.x = 0;
    }
  }
}

var obstacleArray = [];

const bird = new Bird (20,20);
const background = new Background;
const ground = new Ground;
const obstacle = new Obstacle (480, 328, 50, 200);
const obstacle2 = new Obstacle (700, 228,50, 300);
const obstacle3 = new Obstacle (900, 328, 50, 200);

var obstacleArray = [obstacle, obstacle2, obstacle3];





context.fillStyle = "rgba(255, 0, 255, 1)";

function gameLoop() {
  context.clearRect(0,0, canvas.width, canvas.height);
  background.draw(context);
  background.backgroundMove();
  bird.draw(context);
  ground.draw(context);
  ground.groundMove();
  obstacle.draw(context);
  obstacle.obstacleMove();
  obstacle3.draw(context);
  obstacle3.obstacleMove();
  obstacle2.draw(context);
  obstacle2.obstacleMove();
  bird.moveDown();
  collisionDetectionBelow();
  collisionDetectionAbove();
  requestAnimationFrame(gameLoop);
  }

function birdUp(){
  bird.y -= 40;
}

function collisionDetectionBelow(){
  for (var i = 0; i < obstacleArray.length; i++) {
    var o = obstacleArray[i];
    if (( bird.x > o.x - bird.width && bird.x < o.x + o.width - bird.width/2 && bird.y > o.y - bird.height) || bird.y > 510){
      alert("Game Over");
      document.location.reload();
    }
  }
}




document.addEventListener('click', birdUp);

requestAnimationFrame(gameLoop);
