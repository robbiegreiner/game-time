const GamePieces = require('./Game-Pieces.js')

class Background extends GamePieces {
  constructor (x, y) {
    super(x, y)
  }

  draw (context) {
    let bkgImage = new Image()

    bkgImage.src = '../assets/flappy_bckg_try.png';
    context.drawImage(bkgImage, this.x, this.y)
  }

  backgroundMove() {
    this.x --;
    if (this.x < - 19500) {
      this.x = 0;
    }
  }
}

module.exports = Background;
