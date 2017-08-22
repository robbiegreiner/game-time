const GamePieces = require('./Game-Pieces.js')

class ObstacleUpper extends GamePieces {
  constructor (x, y, width, height) {
    super(x, y, width, height)
    this.scored = false;
  }

  draw (context) {
    let tubeImageUpper = new Image()


    tubeImageUpper.src = '../assets/tubes_uper_use.png';
    context.drawImage(tubeImageUpper, this.x, this.y)
  }

  obstacleMove(speed) {
    this.x = this.x - speed;
  }
}

module.exports = ObstacleUpper;
