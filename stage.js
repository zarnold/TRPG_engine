/**
 *
 * @module stage.js
 */
'use strict';

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
   * Manage Stage current state from 
   * event
   */

  dispatchEvent(event) {
    console.log(`Something happened to the stage !`);
    console.log(event.target);
    if(event.hasOwnProperty('src')) {
      console.log(event.src);
      console.log(event.i);
      console.log(event.j);

      event.src.moveTo(event.src.moveTo(event.i+1, event.j));
    }
  }
  /*
   * Attach an unit to the stage
   */
  addUnit(u, posX=2, posY=2) {
    this.cells[posX][posY].appendChild(u.element);

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
      }
    }.bind(this);
  };

}
