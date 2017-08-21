const canvasWidth = 480;
const canvasHeight = 640;

class Bird {
  constructor () {
    this.x = canvasWidth/2;
    this.y = canvasHeight/2;
    this.width = 60;
    this.height = 48;
  }

  draw (context){
    let birdImage = new Image()
    birdImage.src = '../assets/flappy-the-bird-use.png';
    context.drawImage(birdImage, this.x, this.y)
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
