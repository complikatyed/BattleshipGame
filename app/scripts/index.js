'use strict';

var fb = new Firebase('https://xogame.firebaseio.com/');
var fb2 = new Firebase('https://xogame.firebaseio.com/Games');
var emptyBoard = [['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b']];
var emptyBoard2 = ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'];

var subImg = '<img src="/img/submarine.png">';
var sub = "sub";
var shipNumber = 0;
var uuid;
var p1Board;


// This SORT OF works...
// It's returning ALL of the index numbers with their values, which may be useful later
// Still not sure how to grab JUST the index numbers that have subs attached.
// It seems like it ought to be .equalTo(); but I can't figure out how to make that work.
function findShips(uuid) {
  var ref = new Firebase("https://xogame.firebaseio.com/Games/" + uuid + "/p1Board");
  ref.orderByValue().on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      console.log(data.key() + " is " + data.val());
    });
  });
}

function displayShips() {
  // 1. Input argument will be info from "findShips" function
  // 2. Using classes and/or ids (that match array index), append images or shapes
  //    A. Possible approach = $(cellClass).append(shipImg);
  //    B. May want to use simple shapes for ease of placement
  //       i.  Should the image or shape have text also?
  //       ii. Different shapes for different ships?
  // 3. Will need adaptations for multi-square ships
  //    A. Could reference larger ships with multi-part names?
  //       i.   Cruiser:  cru1, cru2
  //       ii.  Destroyer: dest1, dest2, dest3
  //       iii. Carrier: car1, car2, car3, car4
  //    B. Can set images hidden for display of board to opponent
}

function joinGame() {
  // 1. on click of 'join game' button, look for game w no ships on p2Board
  // 2. when available game is found, display "place your ships" button
  // 3. on click of "place your ships" button, call functions to build p2Board.
  // 4. When both players are ready, signal game play with message?
  // 5. If no available game is found, create a new game and slot user into it.
}

function takeTurn() {
  // 1. Click on square on "opponent's" board  (use the same approach as before)
  // 2. Calls "checkForHit" function (framed)
  //    A. "MISS"
  //       i.  calls "markHitOrMiss" function (framed)
  //       ii. calls "whoseTurn" function (framed -- sortof)
  //
  //    B. "HIT"
  //       i.  calls "markHitOrMiss" function (framed)
  //       ii. calls "trackShips" function (framed)
  //       ii. calls "gameStatus" function (framed)
  //           a. if player has won -- call "displayWin" (framed)
  //           b. if no one has won yet:
  //               1. Calls "updateScoreArray" function (framed)
  //               2. Calls "updateScoreDisplay" functin (framed)
  //               3. Calls "whoseTurn" function (framed -- sortof)
  // 3. if game not over, tell next player to go.
}

function checkForHit() {
  // Should be much the same as the 'findShips' function
  // (once I get that mess sorted out)
  // 1. On click in a board square, looks for a ship (or "h" or "m") in that spot.
  //    ** If we do what I'm imagining & display the opponent's actual board
  //    ** (with the ships hidden) this part should be incredibly easy.
  // 2. Return "hit" or "miss" (or hit === true?) for the next function
  //
}

function markHitOrMiss() {
  // 1. Take input from "checkForHit" function and react to it
  // 2. Update board arrays with "h" or "m" so they can't be chosen again.
  // 3. Update displayed boards to indicate hit or miss
  //    A. How to show hit?
  //       i. reveal picture (toggle hidden)
  //       ii. Add colored and/or textured background
  //       iii. Some kind of animation?
  //    B. Indicate a miss?
  //       i. nothing to unhide (since no ship is there)
  //       ii. use a symbol or color/texture?
}

function updateScoreArray() {
  // 1. Take input from "checkForHit" (and "trackShips") function and react to it
  // 2. Add to the point value in the player's point array in firebase
  // 3. Return score data for the "updateScoreDisplay" function
}

function updateScoreDisplay() {
  // 1. Take input from "updateScoreArray" to display.
  // 2. Append updated score to the display
  // (we need to create a div or container for this in our index.jade file)
}

function trackShips(){
  // 1. Take hit data and deduct hit from the correct ship
  // 2. if ship already has a hit, did this hit sink it? (less than < 1)
  // 3. if it did sink a ship, send bonus points to score array
}

function whoseTurn() {
  // Not sure if this needs to be a separate function, or just an iterator
  // Putting it here as a function to be written until we decide how to proceed.
}

function gameStatus() {
  // 1. check for remaining ships (just in one player's set, or both?)
  // 2. If there are still ships, flip the "whoseTurn" marker (or call the function)
  // 3. If there are no ships left (for either player), 'game over' = true;
  // 4. Calls "displayWinMessage"
}

function displayWinMessage() {
  // 1. append some kind of winning message to both pages
  // (not sure what we want the message to be -- same on both screens, etc?)
}


/////////////////  Copies of functions to mess with as needed  //////////////////////////


// THIS IS A COPY -- IT CAN BE MESSED WITH
$('.create').on('click', function(){
  var uuid = createNewGame();
  prepPlayBoard(uuid); // add a game array that uuids would push into?
});


// THIS IS A COPY -- IT CAN BE MESSED WITH
function setShips(uuid) {
  $('td').one('click', function(e){
  var index = $(e.target).attr('id');
  updateP1Board(uuid, index, sub);   // Want to change this so the ship can be changed by user.
  });
}

// THIS IS A COPY -- IT CAN BE MESSED WITH
function prepPlayBoard (uuid) {
  $('.set').on('click', function(){
    setShips(uuid);
    findShips(uuid);
  });
}


///////////////////////////////////////////////////////////////////////
//                                                                   //
//  NOTE TO MYSELF:                                                  //
//                                                                   //
//  The functions between here & the goals section are all working.  //
//  If you need to goof with them, MAKE A COPY so you'll have bkup.  //
//                                                                   //
//  Seriously, try not to mess up this stuff!                        //                                       //
//                                                                   //
///////////////////////////////////////////////////////////////////////


// On click of the 'create a new game' button, this gets everything started.
// It really needs to be more like "Join Game", but we're not there yet
$('.create').on('click', function(){
  var uuid = createNewGame();
  prepPlayBoard(uuid); // add a game array that uuids would push into?
});

// ** This is a temporary setup to see if I could pass the uuid from "createNewGame"
// ** to the two subsequent functions.  It has worked, but will need to be changed
// ** so we can use ships that are bigger than one square.
function prepPlayBoard (uuid) {
  $('.set').on('click', function(){
    setShips(uuid);
    findShips(uuid);
  });
}

// Creates new game with empty boards & ship/points counters for each players
// and returns the uuid for the new game object (yay!)
function createNewGame() {
  var fb2 = new Firebase('https://xogame.firebaseio.com/Games');
  var newGameRef = fb2.push();
  var uuid = newGameRef.key();
  newGameRef.set({p1Board: emptyBoard2, p2Board: emptyBoard2, p1Ships: '', p2Ships: '', p1Points: 0, p2Points: 0})
  return uuid;
}


// Sets up the board with a ship as user clicks on board squares
// NOTE: additional work is needed before larger ships can be placed.
function setShips(uuid) {
  $('td').one('click', function(e){
  var index = $(e.target).attr('id');
  updateP1Board(uuid, index, sub);   // Want to change this so the ship can be changed by user.
  });
}

// updates player1's board-array in firebase
function updateP1Board(uuid, index, ship) {
  fb2.child(uuid).child('p1Board').child(index).set(ship);
}


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

//////////////////////////////////////////////////////////
//                                                      //
//  GOALS 3+                                            //
//                                                      //
//  3. Display opponent's board (w/o ships) to players  //
//                                                      //
//  4. Switch turns between players                     //
//                                                      //
//  5. Track hits & misses (similar to setShips)        //
//                                                      //
//  6. Ch. color/texture of cell based on hit/miss      //
//                                                      //
//  7. Track points based on hits (store in FB)         //
//                                                      //
//  8. Track remaining ships (based on hits)            //
//                                                      //
//  9. Add bonus points for sinking whole ship?         //
//                                                      //
//  10. Determine game over & winner (by points)        //
//                                                      //
//////////////////////////////////////////////////////////


/////////////////////////////////////////////////////
//                                                 //
//  THE CODE BELOW HAS BEEN DEPRECATED BY REWORKS  //
//                                                 //
/////////////////////////////////////////////////////

// Replaced by 'setShips'
function setBoard(){
  $('td').one('click', function(e){
  var coords = findIndex(e.target);
    shipNumber+=1;
    if (shipNumber <= 3) {
    updateBoardArray(coords, board);
    }
  });
}

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

