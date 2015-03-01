'use strict';

var fb = new Firebase('https://xogame.firebaseio.com/');
var fb2 = new Firebase('https://xogame.firebaseio.com/Games');
var emptyBoard = [['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b']];
var emptyBoard2 = ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'];

var subImg = '<img src="/img/submarine.png">';
var sub = "sub";
var shipNumber = 0;
var coords;
var uuid;
var p1Board;

$('.create').on('click', function(){
  createNewGame();   // consider adding a game array that uuids would push into
});

$('.set').on('click', function(){
  setShips();
});


// Creates new game with empty boards & ship/points counters for each players
function createNewGame() {
  var fb2 = new Firebase('https://xogame.firebaseio.com/Games');
  var newGameRef = fb2.push();
  var uuid = newGameRef.key();
  newGameRef.set({p1Board: emptyBoard2, p2Board: emptyBoard2, p1Ships: '', p2Ships: '', p1Points: 0, p2Points: 0})
  return uuid;
}

// Trying a new version of setShips function

function setShips() {
  $('td').one('click', function(e){
  var index = $(e.target).attr('id');
  var uuid = '-JjLsgULrOzhuU0VEjpd';  // need this to be pulling, not hard coded

  updateP1Board(uuid, index, sub);   // Want to change this so the ship can be changed by user.
  });
}

// updates player1's board-array in firebase
// index is the cell to be marked with a ship
// uuid is the identifier for the game being used
// ship will equal the type of ship (or portion of a ship) being added
function updateP1Board(uuid, index, ship) {
  fb2.child(uuid).child('p1Board').child(index).set(ship);
}

/////////////////////////////////////////////////////
//                                                 //
//  GOAL 1: append ship data to display            //
//                                                 //
//  The append function I was using yesterday      //
//  looked like this:                              //
//                                                 //
//  $(cellClass).append(subImg);                   //
//                                                 //
//  The goal is to pull the data w a fb.snapshot   //
//  so we're pulling from Firebase to update the   //
//  board display for player1 (and eventually p2)  //
//                                                 //
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
//                                                 //
//  GOAL 2: allow user to choose ships             //
//                                                 //
//  This is going to require additional buttons    //
//  and probably a multi-step process for the      //
//  larger (multi-cell) ships.                     //
//                                                 //
//  Needs to feed the ship data into 'setShips'    //
//  so the correct ship data is added to array     //
//                                                 //
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
//                                                 //
//  GOALS 3+                                       //
//                                                 //
//  3. Display player 2 board (w no ships) to p1   //
//                                                 //
//  4. Switch turns between players                //
//                                                 //
//  5. Track hits & misses (similar to setShips)   //
//                                                 //
//  6. Change color of square based on hit/miss    //
//                                                 //
//  7. Track points based on hits (store in FB)    //
//                                                 //
//  8. Track remaining ships (based on hits)       //
//                                                 //
//  9. Add bonus points for sinking whole ship?    //
//                                                 //
//  10. Determine game over & winner (by points)    //
//                                                 //
/////////////////////////////////////////////////////


/////////////////////////////////////////////////////
//                                                 //
//  The code below has been deprecated by reworks  //
//                                                 //
/////////////////////////////////////////////////////

// Replaced by 'updateP1Board'
function updateBoardArray(coords, board) {
    board[coords.row][coords.col] = sub;
    fb.child('/Games').child('/uuid').set(board);
}

// Replaced by 'setShipIndex'
function findIndex(element) {
  var row = $(element).closest('tr').index(),
      col = $(element).index();
  console.log(row, col);
  return { row: row, col: col };
}

