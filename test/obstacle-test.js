const chai = require('chai');
const assert = chai.assert;
const Obstacle = require('../lib/Obstacle.js');

describe ('Obstacle', function () {

  it ('should be a function', () => {
    assert.isFunction(Obstacle);
  });

  it('should be an object', () => {
    const pipe = new Obstacle()

    assert.isObject(pipe);
  })

  it('should take an argument for its starting x coordinate', () => {
    const pipe = new Obstacle(720);

    assert.equal(pipe.x, 720);
  })

  it('should take an argument for its starting y coordinate', () => {
    const pipe = new Obstacle(720, 480);

    assert.equal(pipe.y, 480);
  })

  it('should take an argument for its width', () => {
    const pipe = new Obstacle(720, 480, 100);

    assert.equal(pipe.width, 100);
  })

  it('should take an argument for its height', () => {
    const pipe = new Obstacle(720, 480, 100, 300);

    assert.equal(pipe.height, 300);
  })

  it('should have a method called obstacleMove', () => {
    const pipe = new Obstacle(720, 480, 100, 300);

    assert.isFunction(pipe.obstacleMove);
  })

  it('should move to left on the axis when a speed is passed and obstacleMove is called', () =>{
    const pipe = new Obstacle(720, 480, 100, 300);

    pipe.obstacleMove(1.5);
    assert.equal(pipe.x, 718.5);

    for (var i = 0; i < 100; i++) {
      pipe.obstacleMove(1.5);
    }
    assert.equal(pipe.x, 568.5);
  })
})
