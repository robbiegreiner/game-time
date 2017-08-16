const Bird = require('./Bird.js');
// const Ground = require('./ground.js');
let style = require('./style.css');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// function drawBkg() {
//   let x = 0
//   let y = 0
//   let bkgImage = new Image()
//   bkgImage.src = '../assets/flappy_bckg.png';
//   context.drawImage(bkgImage, x, y)
//   }



class Background {
  constructor () {
    this.x = 0;
    this.y = 0;
    // this.width = width;
    // this.height = height;
  }

  draw (context){
    let bkgImage = new Image()
    bkgImage.src = '../assets/flappy_bckg.png';
    context.drawImage(bkgImage, this.x, this.y)
    }

  move(){
    this.x -= 1;
  }
}

function backgroundMove(){
  background.x --
}

const bird = new Bird (20,20);
const background = new Background



context.fillStyle = "rgba(255, 0, 255, 1)";

function gameLoop() {
  context.clearRect(0,0, canvas.width, canvas.height);
  // drawBkg();
  background.draw(context);
  backgroundMove();
  bird.draw(context);
  // bird.move();
  birdDown();
  requestAnimationFrame(gameLoop);
  }

function birdUp(){
  bird.y -= 40;
}

function birdDown(){
  bird.y++;
}

document.addEventListener('click', birdUp);

function drawGround (){
context.fillStyle = "black"
context.fillRect(0, 610, 50, 30)
context.fillStyle = "blue"
context.fillRect(50, 610, 50, 30)

}

requestAnimationFrame(gameLoop);
