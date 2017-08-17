class Ground {
    constructor(){
      this.x = 0;
      this.y = 528;
  }

  draw (context){
    let groundImage = new Image()
    groundImage.src = '../assets/flappy-ground.png';
    context.drawImage(groundImage, this.x, this.y)
    }

  groundMove(){
    this.x --;
    if (this.x<-1056){
      this.x = 0;
    }
  }
}

// class Ground extends Obstacle {
//   super()
// }




module.exports = Ground;
