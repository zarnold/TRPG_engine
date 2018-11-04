/**
 *
 * @module unit.js
 * Unit Class
 */
'use strict';
export let name1, name2;

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

let a = new Unit("ball");
console.log(a.name);
console.log(a.hp);
a.hurt(78);
console.log(a.hp);
a.hurt(78);
console.log(a.hp);

