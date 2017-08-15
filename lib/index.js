const Bird = require('./Bird.js');
let style = require('./style.css');


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var bird = new Bird (20,20);

context.fillStyle = "rgba(255, 0, 255, 1)";

function gameLoop() {
  context.clearRect(0,0, canvas.width, canvas.height);
  bird.draw(context);
  birdDown();
  requestAnimationFrame(gameLoop);
  }

function birdUp(){
  context.clearRect(0,0, canvas.width, canvas.height);
  bird.y -= 40;
  bird.draw(context);
}

function birdDown(){
  context.clearRect(0,0, canvas.width, canvas.height);
  bird.y++;
  bird.draw(context);
}

document.addEventListener('click', birdUp);


requestAnimationFrame(gameLoop);
