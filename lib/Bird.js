class Bird {
  constructor () {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.width = 60;
    this.height = 48;
  }

  draw (context){
    let groundImage = new Image()
    groundImage.src = '../assets/flappy-the-bird-use.png';
    context.drawImage(groundImage, this.x, this.y)
    // context.fillRect(this.x, this.y, this.width, this.height);
  }

  gravity(){
    this.y += 1.5;
  }

  flyUp(){
    this.y -= 40;
  }
}

module.exports = Bird;
