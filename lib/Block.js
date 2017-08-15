class Block {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw (context){
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  move(velocity){
    this.y += velocity;
    this.x += velocity;
  }
}

module.exports = Block;
