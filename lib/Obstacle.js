class Obstacle {
  constructor(x ,y ,width ,height , level){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw (context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  obstacleMove() {
    this.x = this.x - 2;
  }
}

module.exports = Obstacle;
