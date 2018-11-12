/**
 *
 * @module stage.js
 */
'use strict';

/**
 * stageFSM :  a Finite State Machine for managing occuring action
 *             Give the next state for each state and the transition function
 *             given a event
 */
const stageFSM = {
  'blank' : {
    'unitSelection' : {
      next: 'unitSelected',
      transitionFn: function(t) {
        t.displaySquareState();
      }
    }
  },
  'unitSelected' : {
    'unitSelection' : {
      next: 'unitSelected',
      transitionFn: function(t) {
        t.displaySquareState();
      }
    },
    'unitUnselection' : {
      next: 'blank',
      transitionFn: function(t) {
        t.selected = undefined;
        t.displaySquareState();
      }
    },
    'cancel':{
      next: 'blank',
      transitionFn: function(t) {
        t.selected = undefined;
        t.displaySquareState();
      }
    }
  }
};


export default class Stage {


  constructor(nodeId,  nCol=30, nRow=20 ) {
    this.element= document.getElementById(nodeId);
    this.element.classList.add('stage');

    // Each stage have a click listener
    // that will be bubbled form unit click
    this.element.addEventListener('click', this.dispatchEvent.bind(this));
    // The stage is rows and columns
    // of html element called square
    this.nCol = nCol;
    this.nRow = nRow;  
    this.state = 'blank';
    this.selected = undefined;

    // Element reference are kept 
    // in a cells 2D array
    // for acessing them later
    this.cells = new Array(nRow);
    for( var idx= 0; idx < nRow; idx++)
    {
      this.cells[idx]   = new Array(nCol)
    };

    // add rows
    for ( let i=0; i< this.nRow; i++)
    {
      let newRow = document.createElement("div");
      newRow.className = "row";

      // Add columns to each row, setting class 
      // used for flex box
      for( let j=0; j<this.nCol; j++)
      {
        let newSquare = document.createElement("div");
        newSquare.classList.add("square");
        newSquare.dataset.x=i;
        newSquare.dataset.y=j;
        newRow.appendChild(newSquare);

        // Pass the square coordinate to event bubbling
        newSquare.addEventListener('click', function(event) {
          event.i = i;
          event.j = j;
        });
        this.cells[i][j] = newSquare;
      }
      this.element.appendChild(newRow);
    };
  };


  /**
   * trigger class on cells
   * to show possbility
   */
  displaySquareState() {
    this.cells
        .flat()
        .map( (s) => (s.classList.remove("reachable")));

    this.cells
        .flat()
        .map( (s) => (s.classList.remove("attackable")));

    this.cells
        .flat()
        .filter( (s) => ( Stage.manhattanDistance(s.dataset.x, s.dataset.y, this.selected.x, this.selected.y) < this.selected.charac.move))
        .map( (s) => (s.classList.add("reachable")));

    this.cells
        .flat()
        .filter( (s) => ( Stage.manhattanDistance(s.dataset.x, s.dataset.y, this.selected.x, this.selected.y) < this.selected.charac.atk.max &&  Stage.manhattanDistance(s.dataset.x, s.dataset.y, this.selected.x, this.selected.y) >= this.selected.charac.atk.min ) )
        .map( (s) => (s.classList.add("attackable")));

  };
  /**
   * Manage Stage current state from 
   * event
   */

  somethingHappens(e) {
    let next;

    if(stageFSM.hasOwnProperty(this.state) ) {
      if(stageFSM[this.state].hasOwnProperty(e)) {
        if(stageFSM[this.state][e]['transitionFn']) 
          stageFSM[this.state][e]['transitionFn'](this);
        if(stageFSM[this.state][e]['next']) 
          this.state = stageFSM[this.state][e]['next'];
      };
    };
  };

  dispatchEvent(event) {

    if(event.type == 'click') {

      // A unit was clicked
      if(event.hasOwnProperty('src')) {

        if(event.src == this.selected) {
          this.selected = undefined;
          this.somethingHappens('unitUnselection');
        } else {
          this.selected = event.src;
          this.somethingHappens('unitSelection');
          //event.src.moveTo(event.src.moveTo(event.i+1, event.j));
        };
      }

      console.log(event.target.classList);
      if(event.target.classList.contains("reachable"))
      {
          this.selected.moveTo(event.target.dataset.x, event.target.dataset.y)
          this.somethingHappens('unitUnselection');
      }
    };


    if(event.type == 'keydown') {

      if(event.key=='Escape') {
        this.somethingHappens('cancel');
      };
    }
  }
  /*
   * Attach an unit to the stage
   */
  addUnit(u, posX=2, posY=2) {
    this.cells[posX][posY].appendChild(u.element);

    u.x = posX;
    u.y = posY;

    /**
     * This is the tricky part
     * the stage override each unit
     * moveTo function 
     * by binding its own context
     * and building the move function
     * according to this context.
     *  Thus, the unit only have a moveTo
     * function to call
     */
    u.moveTo = function(x,y) {
      if(x>=0 && y>=0 && y<this.nCol && x<this.nRow )
      {
        this.cells[x][y].appendChild(u.element);
        u.x = x;
        u.y = y;
      }
    }.bind(this);
  };


  static manhattanDistance(x1, y1, x2, y2) 
  {
    return Math.abs(x1-x2) + Math.abs(y1-y2);
  }

}
