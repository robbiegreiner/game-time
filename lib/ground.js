const GamePieces = require('./Game-Pieces.js')

class Ground extends GamePieces {
  constructor(x, y) {
    super(x, y)
  }

  draw (context) {
    let groundImage = new Image()

    groundImage.src = '../assets/flappy-ground.png';
    context.drawImage(groundImage, this.x, this.y)
  }

  groundMove(speed) {
    this.x = this.x - speed;
    if (this.x < - 9520) {
      this.x = 0;
    }
  }
}

module.exports = Ground;
