'use strict';
import Unit from './unit.js';
import Stage from './stage.js';

let stage = new Stage('screen',20, 20   );

//Ths whole document must pass the event to stage

document.onkeydown = function(evt) {
  evt = evt || window.event;
  stage.dispatchEvent(evt);
};

//adding a unit to stage override its move function
let achille = new Unit('Achille');
stage.addUnit(achille, 4,3);
let bernard= new Unit('bernard');
stage.addUnit(bernard, 10,10);
bernard.moveTo(1,8);

