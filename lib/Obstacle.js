class Obstacle {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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

// class ObstacleUpper extends Obstacle {
//   constructor (x, y, width, height) {
//     super(x, y, width, height)
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.scored = false
//   }
//
//   draw (context) {
//     let tubeImageUpper = new Image()
//
//     context.fillRect(this.x, 0, this.width, this.height);
//     tubeImageUpper.src = '../assets/tubes_uper_use.png';
//     context.drawImage(tubeImageUpper, this.x, this.y)
//   }
//
//   obstacleMove(speed) {
//     this.x = this.x - speed;
//   }
// }

module.exports = Obstacle;
