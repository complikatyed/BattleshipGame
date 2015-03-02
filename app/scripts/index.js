'use strict';

var fb = new Firebase('https://battleship16.firebaseio.com/');
var fb5 = new Firebase('https://battleship16.firebaseio.com/Games');
var emptyBoard = [['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b']];
var emptyBoard2 = ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'];

var subImg = '<img src="http://www.clipartlord.com/wp-content/uploads/2013/03/submarine.png" height="100px" width="100px">';
var fire = '<img src="http://www.clker.com/cliparts/a/6/4/9/11954351131708850731zeimusu_Fire_Icon.svg.hi.png" height="100px" width="100px">';
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

function appendShip(td) {
  $(this).append(subImg);
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

$('.join').on('click', function(){  // on click of 'start' button...
  var fb = new Firebase('https://battleship16.firebaseio.com/');
  fb.limitToLast(1).once('value', function(snapshot) {  // look at the last game
    var data = snapshot.val(); // data = all the data for that last object (the last game)
    var uuid = data && Object.keys(data)[0] || null;  // this looks for the first index of the object (the uuid?)
    var game = data && data[uuid] || null;  //  Not sure what that's doing...
    if (!data || game.p1 && game.p2) {   // if there's no data or already two players
      createNewGame();
    } else {
        fb.child(uuid).update({p2: {p2Board: emptyBoard2, p2Ships: '', p2Points: 0,}});
      $('.messagediv').append("Welcome player 2");
      // hide "join game" button
      // display player2 board
      // player1 = false    <-- This is a Andy thing I'm adding.
      // Display "place ships" button
      }
      //How to distinguish between uuid from created game or from original?
      console.log(uuid);
      // IF A NEW GAME IS CREATED, THE UUID IS NOT CHANGING TO MATCH IT
      // WHICH IS A PROBLEM.  FIX IT NEXT!
  });
});

// Creates new game with empty boards & ship/points counters for each players
// and returns the uuid for the new game object (yay!)
function createNewGame() {
  var fb = new Firebase('https://battleship16.firebaseio.com/');
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