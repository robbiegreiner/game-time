const GamePieces = require('./Game-Pieces.js')

class Obstacle extends GamePieces {
  constructor (x, y, width, height) {
    super(x, y, width, height)
    this.scored = false;
  }

  draw (context) {
    let tubeImageLower = new Image()

    // context.fillRect(this.x, this.y, this.width, this.height);
    tubeImageLower.src = '../assets/tubes_lower_use.png';
    context.drawImage(tubeImageLower, this.x, this.y)
  }

  obstacleMove(speed) {
    this.x = this.x - speed
  }
}

module.exports = Obstacle;
