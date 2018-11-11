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

    this.element = document.createElement("div");
    this.element.classList.add("unit");
    this.element.addEventListener('click', this.clicked.bind(this));
  };


  /**
   * Getter and setter
   */
  get hp() {
    return this.HP;
  }

  /**
   * Prototypes
   */
  hurt(damage) {
    this.HP >= damage ? this.HP -= damage : this.HP=0;
  };

  moveTo(a,b) {
    // Dummy function for starting
    // Must be overridden by parent
    console.log(`Move to ${a}, ${b}`) ;
  };

  clicked(event) {
    console.log(`${this.name} was clicked`);
    console.log(event.target);
    console.log(this);

    // pass some parameter to bubbled parent
    event.src = this;
  }
  /**
   * Statics
   */

}
