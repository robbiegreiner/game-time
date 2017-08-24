const chai = require('chai');
const assert = chai.assert;
const Bird = require('../lib/Bird.js');
const Obstacle = require('../lib/Obstacle.js');

describe('Bird', function() {

  it('should be a function', () => {
    assert.isFunction(Bird);
  });

  it('should be an object', () => {
    const birdy = new Bird()

    assert.isObject(birdy);
  })

  it('should start with an x coordinate of 240', () => {
    const birdy = new Bird (240, 250, 60, 48)

    assert.equal(birdy.x, 240);
  })

  it('should start with a y coordinate of 250', () => {
    const birdy = new Bird (240, 250, 60, 48)

    assert.equal(birdy.y, 250);
  })

  it('should have a default width of 60', () =>{
    const birdy = new Bird (240, 250, 60, 48)

    assert.equal(birdy.width, 60);
  })

  it('should have a default height of 48', () =>{
    const birdy = new Bird (240, 250, 60, 48)

    assert.equal(birdy.height, 48);
  })

  it('should have a method called gravity', () => {
    const birdy = new Bird();

    assert.isFunction(birdy.gravity);
  })

  it('should go down 1.5 on the y axis when gravity is called once', () => {
    const birdy = new Bird (240, 250, 60, 48)

    birdy.gravity();
    assert.equal(birdy.y, 251.5)
  })

  it('should go down 2 on the y axis when gravity is called 15 times', () => {
    const birdy = new Bird (240, 250, 60, 48)

    for (let i = 0; i < 15; i++) {
      birdy.gravity();
    }
    assert.equal(birdy.y, 274.5)
  })

  it('should have a method called flyUp', () => {
    const birdy = new Bird (240, 250, 60, 48)

    assert.isFunction(birdy.flyUp);
  })

  it('should go up 40 on the y axis when flyUp is called', () => {
    const birdy = new Bird (240, 250, 60, 48)

    birdy.flyUp();
    assert.equal(birdy.y, 210);
  })

  it('should detect collision with an upper obstacle', () => {
    const birdy = new Bird (240, 250, 60, 48);
    const obstacle = new Obstacle(245, 250, 75, 800);

    assert.equal(birdy.collision, false);

    obstacle.obstacleMove(6);
    assert.equal(obstacle.x, 239);
    birdy.collisionAbove(obstacle);
    assert.equal(birdy.collision, true);
  })

  it('should detect collision with an lower obstacle', () => {
    const birdy = new Bird (240, 250, 60, 48);
    const obstacle = new Obstacle(245, 240, 75, 800);

    assert.equal(birdy.collision, false);

    obstacle.obstacleMove(6);
    birdy.gravity();
    birdy.gravity();
    birdy.gravity();
    birdy.gravity();
    birdy.gravity();
    birdy.gravity();
    birdy.gravity();
    assert.equal(obstacle.x, 239);
    birdy.collisionBelow(obstacle);
    assert.equal(birdy.collision, true);
  })

  it('should detect collision with the ground', () => {
    const birdy = new Bird (240, 483, 60, 48);
    const obstacle = new Obstacle(800, 240, 75, 800);

    assert.equal(birdy.collision, false);
    birdy.gravity();
    birdy.gravity();
    birdy.collisionBelow(obstacle);
    assert.equal(birdy.collision, true);
  })




});
