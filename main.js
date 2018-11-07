'use strict';
import Unit from './unit.js';
import Stage from './stage.js';

let stage = new Stage('screen',20, 20   );


//adding a unit to stage override its move function
let achille = new Unit('Achille');
stage.addUnit(achille, 4,3);
