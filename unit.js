/**
 *
 * @module unit.js
 * Unit Class
 */
'use strict';

export default class Unit {

  constructor(name="anonymous") {
    this.name=name;
    this.HP=100;
  };


  get hp() {
    return this.HP;
  }

  hurt(damage) {
    this.HP >= damage ? this.HP -= damage : this.HP=0;
  }
}
