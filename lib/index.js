const Bird = require('./Bird.js');
const Ground  = require ('./Ground.js')
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


const bird = new Bird (20,20);
const background = new Background;
const ground = new Ground;



context.fillStyle = "rgba(255, 0, 255, 1)";

function gameLoop() {
  context.clearRect(0,0, canvas.width, canvas.height);
  background.draw(context);
  background.backgroundMove();
  bird.draw(context);
  ground.draw(context);
  ground.groundMove();
  bird.moveDown();
  requestAnimationFrame(gameLoop);
  }

function birdUp(){
  bird.y -= 40;
}


document.addEventListener('click', birdUp);

requestAnimationFrame(gameLoop);
