'use strict';

var fb = new Firebase('https://xogame.firebaseio.com/Games');
var emptyBoard2 = ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'];
var player1 = true;
var subImg = '<img src="/img/submarine.png">';
var tempImg = '<img src="/img/temp.jpeg">'
var ship = "sub";
var subNumber = 0;
var gameId;


////////////////  ---   STARTING THE GAME  ---  ///////////////////////

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
      $('.boardp1').show();
      $('.set1').show();
      var player = "p1";
      var board = "p1Board";

      readyForShips1(gameId, player, board);
    }
    else {
      fb.child(gameId).update({p2: {p2Board: emptyBoard2, p2Ships: '', p2Points: 0,}});
      player1 = false;
      $('.messagediv').append("Welcome player 2");
      $('.boardp2').show();
      $('.set2').show();
      var player = "p2";
      var board = "p2Board";

      readyForShips2(gameId, player, board);
    }

      $('.join').hide();
  });
});


///////////////// Setting Ships on the Board ////////////////////////////

// Need BOTH of these functions to make the correct button click
function readyForShips1(gameId, player, board) {
  $('.set1').one('click', function() {
    setShips(gameId, player, board, gatherData);
    console.log("I got to line 56");
  });
}

// Need BOTH of these functions to make the correct button click
function readyForShips2(gameId, player, board) {
  $('.set2').one('click', function() {
    setShips(gameId, player, board, gatherData);
  });
}

function updateArray(gameId, player, board, index, ship) {
  fb.child(gameId).child(player).child(board).child(index).set(ship);
}

function setShips(gameId, player, board, callback) {       // Want to change this so the ship can be changed by user.
  $('td').on('click', function(e){
    var index = $(e.target).attr('id');
    console.log(subNumber);
    if (subNumber != 3) {
     {$(this).append(tempImg)}  // Take this out later?
      updateArray(gameId, player, board, index, ship);
      subNumber += 1;
    }
    $('.set1').hide();
    $('.set2').hide();
    $('.messagediv').hide();
    callback(gameId, player, board);
    console.log("This is line 84");
  });
}

function gatherData(gameId, player, board) {
  var shipIndex = [];
  var hitIndex = [];
  var missIndex = [];
  var customFb = new Firebase('https://xogame.firebaseio.com/Games/' + gameId + '/' + player + '/' + board);
  customFb.orderByValue().on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      console.log("This is line 95");
      console.log(data.key() + ":" + data.val());
      if (data.val() === "sub") {
        // var id = "#" + data.key(); <-- this approach appended multiple times
        //$(id).append(subImg);       <-- to the same cell.  Need it to only append
        //                            <-- AFTER all the ships have been placed
        //                            <-- OR after the shipIndex array has been built
        shipIndex.push(data.key());
        return shipIndex;  // How can I get the shipIndex values to use in a
                          //  line 98-99 style append?
      }
      else if (data.val() === "m") {
        missIndex.push(data.key());
        return missIndex;

      }
      else if (data.val() === "h") {
        hitIndex.push(data.key());
        return hitIndex;

      }

    });
  });
}

//////////   --  Work Space  --   ////////////////////








