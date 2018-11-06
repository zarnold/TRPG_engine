'use strict';
import Unit from './unit.js';
import Stage from './stage.js';

let stage = new Stage('screen', 100,100);
let stage_b = new Stage('screen_B');


//adding a unit to stage override its move function
let achille = new Unit('Achille');
stage.addUnit(achille, 4,3);

//test move
let i=8, j=2;
setInterval( function() {
  achille.moveTo(i++, j++);
}, 400);

let hercule= new Unit('Hercule');
stage_b.addUnit(hercule);

//test move
let m=4, n=2;
setInterval( function() {
  hercule.moveTo(m++, n++);
}, 700);


// perf test
for (var k=0; k<200; k++) {
  let h=new Unit();
  stage.addUnit(h, Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
        setInterval( function() {
          h.moveTo( Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
        }, 200);
}
