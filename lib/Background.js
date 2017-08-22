class Background {
  constructor () {
    this.x = 0;
    this.y = 0;
  }

  draw (context) {
    let bkgImage = new Image()

    bkgImage.src = '../assets/flappy_bckg.png';
    context.drawImage(bkgImage, this.x, this.y)
  }

  backgroundMove() {
    this.x --;
    if (this.x < - 1056) {
      this.x = 0;
    }
  }
}

module.exports = Background;
