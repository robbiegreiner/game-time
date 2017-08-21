class Obstacle {
  constructor(x ,y ,width ,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.scored = false;
  }

  draw (context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  obstacleMove(speed) {
    this.x = this.x - speed;
  }
}

module.exports = Obstacle;
