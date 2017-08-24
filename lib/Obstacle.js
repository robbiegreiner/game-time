const GamePieces = require('./Game-Pieces.js')

class Obstacle extends GamePieces {
  constructor (x, y, width, height, source) {
    super(x, y, width, height)
    this.scored = false;
    this.source = source
  }

  draw (context) {
    let tubeImageLower = new Image()

    // context.fillRect(this.x, this.y, this.width, this.height);
    tubeImageLower.src = this.source
    context.drawImage(tubeImageLower, this.x, this.y)
  }

  obstacleMove(speed) {
    this.x = this.x - speed
  }
}

module.exports = Obstacle;
