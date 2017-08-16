class Bird {
  constructor (width, height) {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.width = width;
    this.height = height;
  }

  draw (context){
    let groundImage = new Image()
    groundImage.src = '../assets/flappy-the-bird-use.png';
    context.drawImage(groundImage, this.x, this.y)
    // context.fillRect(this.x, this.y, this.width, this.height);
  }

  moveDown(){
    this.y++;
  }
}

module.exports = Bird;
