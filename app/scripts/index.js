'use strict';

var fb = new Firebase('https://xogame.firebaseio.com/');
var fb5 = new Firebase('https://xogame.firebaseio.com/Games');
var emptyBoard = [['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b']];
var emptyBoard2 = ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'];
var player1 = true;
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
  var ref = new Firebase("https://xogame.firebaseio.com/Games/" + uuid + "/p1/p1Board");
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


/////////

var thisGameUUID;

$('.join').one('click', function(){  // on click of 'start' button...
  var fb = new Firebase('https://xogame.firebaseio.com/Games');
  fb.limitToLast(1).once('value', function(snapshot) {  // look at the last game
    var data = snapshot.val(); // data = all the data for that last object (the last game)
    var gameId = data && Object.keys(data)[0] || null;  // this looks for the first index of the object (the uuid?)
    var game = data && data[gameId] || null;  //  Not sure what that's doing...
    if (!data || game.p1 && game.p2) {   // if there's no data or already two players
      var newGameId = fb.push({p1: {p1Board: emptyBoard2, p1Ships: '', p1Points: 0,}});
      gameId = newGameId.key();
      $('.messagediv').append("Welcome player 1");
      $('.p1Board').show();
      $('.set1').show();
    } else {
        fb.child(gameId).update({p2: {p2Board: emptyBoard2, p2Ships: '', p2Points: 0,}});
        player1 = false;
        $('.messagediv').append("Welcome player 2");

        $('.p2Board').show();
        $('.set2').show();
      }
      $('.join').hide();
  });
});

// Creates new game with empty boards & ship/points counters for each players
// and returns the uuid for the new game object (yay!)
function createNewGame() {
  var fb = new Firebase('https://xogame.firebaseio.com/Games');
  var newGameRef = fb.push({p1: {p1Board: emptyBoard2, p1Ships: '', p1Points: 0,}});
  var uuid = newGameRef.key();
  $('.messagediv').append("Welcome player 1");
  $('.join').hide();
  $('.p1Board').show();
  $('.set1').show();
  return uuid;
}

//function prepPlayBoard (uuid) {
  $('.set').on('click', function(){
    uuid = '-JjQZG4uashcaAqNrKmR';
    setShips(uuid);
    findShips(uuid);
  });
//}

function setShips(uuid) {
  $('td').one('click', function(e){
  var index = $(e.target).attr('id');
  updateP1Board(uuid, index, sub);   // Want to change this so the ship can be changed by user.
  });
}

function updateP1Board(uuid,index, ship) {
  fb5.child(uuid).child('p1').child('p1Board').child(index).set(ship);
  console.log(index);
}



/////////////////  Copies of functions to mess with as needed  //////////////////////////

// // THIS IS A COPY -- IT CAN BE MESSED WITH
// $('.create').on('click', function(){
//   var uuid = createNewGame();
//   prepPlayBoard(uuid); // add a game array that uuids would push into?
// });


// // THIS IS A COPY -- IT CAN BE MESSED WITH
// function setShips(uuid) {
//   $('td').one('click', function(e){
//   var index = $(e.target).attr('id');
//   updateP1Board(uuid, index, sub);   // Want to change this so the ship can be changed by user.
//   });
// }

// // THIS IS A COPY -- IT CAN BE MESSED WITH
// function prepPlayBoard (uuid) {
//   $('.set').on('click', function(){
//     setShips(uuid);
//     findShips(uuid);
//   });
// }


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
// $('.create').on('click', function(){
//   var uuid = createNewGame();
//   prepPlayBoard(uuid); // add a game array that uuids would push into?
// });

/*// ** This is a temporary setup to see if I could pass the uuid from "createNewGame"
// ** to the two subsequent functions.  It has worked, but will need to be changed
// ** so we can use ships that are bigger than one square.
function prepPlayBoard (uuid) {
  $('.set').on('click', function(){
    setShips(uuid);
    //findShips(uuid);
  });
}

// Creates new game with empty boards & ship/points counters for each players
// and returns the uuid for the new game object (yay!)
function createNewGame() {
  var fb = new Firebase('https://xogame.firebaseio.com/Games');
  var newGameRef = fb.push({p1: {p1Board: emptyBoard2, p1Ships: '', p1Points: 0,}});
  var uuid = newGameRef.key();
  $('.messagediv').append("Welcome player 1");
  // hide "join game" button
  // display player2 board
  // player1 = true    <-- This is a Andy thing I'm adding.
  // Display "place ships" button
  // display player1 board
  return uuid;
}


// Sets up the board with a ship as user clicks on board squares
// NOTE: additional work is needed before larger ships can be placed.
function setShips(uuid) {
  $('td').one('click', function(e){
  var index = $(e.target).attr('id');
  updateP1Board('-JjQRF36ZWXBRfyZiLgp', index, sub);   // Want to change this so the ship can be changed by user.
  });
}

// updates player1's board-array in firebase
function updateP1Board(uuid, index, ship) {
  fb.child('-JjQRF36ZWXBRfyZiLgp').child('p1').child('p1Board').child(index).set(ship);
  console.log(index);
}
*/

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


////////////////////////  Margaret's code ////////////////////////////////////
/*
'use strict';

var fb = new Firebase('https://battleship16.firebaseio.com/');
var board = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
//var board2 = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
var ship = '<img src="http://www.clipartlord.com/wp-content/uploads/2013/03/submarine.png" height="100px" width="100px">';
var fire = '<img src="http://www.clker.com/cliparts/a/6/4/9/11954351131708850731zeimusu_Fire_Icon.svg.hi.png" height="100px" width="100px">';
var shipNumber = 0;

$('button').on('click', function(){
  createBoard(board);
  //createBoard(board2);
})

function createBoard (tableData) {
  var $table = $('<table></table>');
  tableData.forEach(function (row) {
    var $tr = $('<tr></tr>');
    row.forEach(function (cell){
      $tr.append($('<td></td>'));
      $table.append($tr);
    });
  });
  $('.board').append($table);
  findCoords();
  displayFire(tableData)
}

function updateBoardDisplay(coords, board) {
  if(shipNumber <= 3){
    console.log();
      board[coords.row][coords.col] = ship;
      fb.child('/Game').child('/board').update(board);
  }
  //$('table').replaceWith(createBoard(board));
}

function findCoords(){
  $('td').one('click', function(e){
    var coords = findIndex(e.target)
    shipNumber += 1;
    if (shipNumber <= 3) {attachShip($(this));}
    updateBoardDisplay(coords, board);
  });
}

function findIndex(element) {
  var row = $(element).closest('tr').index(),
      col = $(element).index();
  return { row: row, col: col }
}

function attachShip(td) {
  td.append(ship);
}

function attachFire(td) {
  td.append(fire);
}

function displayFire(data) {
  $('td').one('click', function (event) {
    _.forEach(data, function(populatedBoardArray, key){
      console.log(populatedBoardArray);
      console.log(key);
      if (populatedBoardArray[0] === '<img src="http://www.clipartlord.com/wp-content/up…3/03/submarine.png" height="100px" width="100px">') {
        attachFire($(this));
      }
    });
  })
}
*/
