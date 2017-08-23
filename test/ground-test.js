const chai = require('chai');
const assert = chai.assert;
const Ground = require('../lib/ground.js');

describe ('Obstacle', function() {

  it('should be a function', () => {
    assert.isFunction(Ground);
  });

  it ('should be an object', () => {
    const theGround = new Ground(0, 528);

    assert.isObject(theGround);
  })

  it('should start with an x coordinate of 0', () => {
    const theGround = new Ground(0, 528);

    assert.equal(theGround.x, 0);
  })

  it('should start with a y coordinate of 528', () => {
    const theGround = new Ground(0, 528);

    assert.equal(theGround.y, 528);
  })

  it('should have a method called groundMove', () => {
    const theGround = new Ground(0, 528);

    assert.isFunction(theGround.groundMove);
  })

  it('should move to the left a speed that is passed when groundMove is called', () =>{
    const theGround = new Ground(0, 528);
    
    theGround.groundMove(1.5);
    assert.equal(theGround.x, -1.5);

    for (var i = 0; i < 100; i++) {
      theGround.groundMove(1.5);
    }
    assert.equal(theGround.x, -151.5);
  })
})
