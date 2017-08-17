class Bird {
  constructor (width, height) {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.width = width;
    this.height = height;
  }

  draw (context){
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  moveDown(){
    this.y += 1.5;
  }
}

module.exports = Bird;
