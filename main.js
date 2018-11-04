'use strict';
import Unit from './unit.js';



let a = new Unit("ball");
console.log(a.name);
console.log(a.hp);
a.hurt(44);
console.log(a.hp);
a.hurt(44);
console.log(a.hp);

