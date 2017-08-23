const chai = require('chai');
const assert = chai.assert;
const Player = require('../lib/Player.js');
const Bird = require('../lib/Bird.js');
const Obstacle = require('../lib/Obstacle.js');

describe('Player', function(){

  it('should be a function', () => {
    assert.isFunction(Player);
  });

  it('should be an object', () => {
    const player = new Player("Jose");
    assert.isObject(player);
  })

  it('should be passed a name', () => {
    const player = new Player("Jose");
    assert.equal(player.name, "Jose");
  })

  it('should start with a score of 0', () => {
    const player = new Player("Jose");
    assert.equal(player.score, 0);
  })
})
