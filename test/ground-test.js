const chai = require('chai');
const assert = chai.assert;
const Ground = require('../lib/ground.js');

describe('Obstacle', function(){

  it('should be a function', () => {
    assert.isFunction(Ground);
  });

  it('should be an object', () => {
    const theGround = new Ground()
    assert.isObject(theGround);
  })

  it('should start with an x coordinate of 0', () => {
    const theGround = new Ground()
    assert.equal(theGround.x, 0);
  })

  it('should start with a y coordinate of 528', () => {
    const theGround = new Ground()
    assert.equal(theGround.y, 528);
  })

  it('should have a method called groundMove', () => {
    const theGround = new Ground();
    assert.isFunction(theGround.groundMove);
  })

  it('should move 1 to the left when groundMove is called', () =>{
    const theGround = new Ground();
    theGround.groundMove();
    assert.equal(theGround.x, -1);

    for (var i = 0; i < 500; i++) {
      theGround.groundMove();
    }
    assert.equal(theGround.x, -501);
  })

  it('should reset to x coordinate 0 when it moves 1056', () => {
    const theGround = new Ground();
    for (var i = 0; i < 1057; i++) {
      theGround.groundMove();
    }
    assert.equal(theGround.x, 0);
  })
})
