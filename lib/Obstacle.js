class Obstacle{
  constructor(height,width,x,y){
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  draw (context){
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  obstacleMove(){
    this.x --;
  }
}

module.exports = Obstacle;
