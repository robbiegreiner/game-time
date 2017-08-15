const Block = require('./Block.js');
let style = require('./style.css');


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var blockCount = 5;
var blocks = [];

for (var i =0; i < blockCount; i++){
  blocks.push (new Block (20 * i, 20, 10, 10))
}

context.fillStyle = "rgba(255, 0, 255, 1)";

function gameLoop() {
  context.clearRect(0,0, canvas.width, canvas.height);
  for (var i = 0; i < blocks.length; i++){
    blocks[i].move(i);
    blocks[i].draw(context);

  }
  //run function again
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', function (event) {
  blocks.push (new Block (event.clientX, event.clientY, 10, 10));
});



requestAnimationFrame(gameLoop);
