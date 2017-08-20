const chai = require('chai');
const assert = chai.assert;
const Bird = require('../lib/Bird.js');

describe('Bird', function(){

  it('should be a function', () => {
    assert.isFunction(Bird);
  });

  it('should be an object', () => {
    const birdy = new Bird()
    assert.isObject(birdy);
  })

  it('should start with an x coordinate of 240', () => {
    const birdy = new Bird();
    assert.equal(birdy.x, 240);
  })

  it('should start with a y coordinate of 320', () => {
    const birdy = new Bird();
    assert.equal(birdy.y, 320);
  })

  it('should have a default width of 60', () =>{
    const birdy = new Bird();
    assert.equal(birdy.width, 60);
  })

  it('should have a default width of 60', () =>{
    const birdy = new Bird();
    assert.equal(birdy.width, 60);
  })

  it('should have a method called gravity', () => {
    const birdy = new Bird();
    assert.isFunction(birdy.gravity);
  })

  it('should go down 1.5 on the y axis when gravity is called', () => {
    const birdy = new Bird();
    birdy.gravity();
    assert.equal(birdy.y, 321.5)
  })

  it('should have a method called flyUp', () => {
    const birdy = new Bird();
    assert.isFunction(birdy.flyUp);
  })

  it('should go up 40 on the y axis when flyUp is called', () => {
    const birdy = new Bird();
    birdy.flyUp();
    assert.equal(birdy.y, 280);
  })
});
