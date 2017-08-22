const GamePieces = require('./Game-Pieces.js')

class Bird extends GamePieces {
  constructor (x, y, width, height) {
    super(x, y, width, height);
    this.gravityCounter = 0;
    this.drawCounter = 0;
  }

  draw (context) {
    let birdImage = new Image()

    birdImage.src = '../assets/flappy-the-bird-use.png';
    context.drawImage(birdImage, this.x, this.y)
    this.drawCounter++;
    // context.fillRect(this.x, this.y, this.width, this.height);
  }

  gravity() {
    this.gravityCounter++;
    if (this.gravityCounter >= 0) {
      this.y += 1.5;
    }
    if (this.gravityCounter >= 15) {
      this.y += 2;
    }
    if (this.gravityCounter >= 30) {
      this.y += 3;
    }
  }

  flyUp() {
    this.y -= 40;
    this.gravityCounter = 0;
  }
}

module.exports = Bird;
