'use strict';

var fb = new Firebase('https://xogame.firebaseio.com/Games');
var emptyBoard = [['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b']];
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
        // hide player 2 home board caption?
      readyForShips1(gameId);
    }
    else {
      fb.child(gameId).update({p2: {p2Board: emptyBoard2, p2Ships: '', p2Points: 0,}});
      player1 = false;
      $('.messagediv').append("Welcome player 2");
      $('.boardp2').show();
      $('.set2').show();
        // hide player 1 home board caption?
      readyForShips2(gameId);
    }

      $('.join').hide();
  });
});





///////////////// Board 1 Stuff ////////////////////////////

function readyForShips1(gameId) {
  $('.set1').one('click', function() {
    setShips1(gameId, gatherP1Data);
  });
}

function updateP1Array(gameId, index, ship) {
  fb.child(gameId).child('p1').child('p1Board').child(index).set(ship);
}

function setShips1(gameId, callback) {       // Want to change this so the ship can be changed by user.
  $('td').on('click', function(e){
    var index = $(e.target).attr('id');
    console.log(subNumber);
    if (subNumber != 3) {
     {$(this).append(tempImg)}  // Take this out later?
      updateP1Array(gameId, index, ship);
      subNumber += 1;
    }
    $('.set1').hide();
    $('.messagediv').hide();
    callback(gameId);
  });
}

function gatherP1Data(gameId) {
  var shipIndex = [];
  var hitIndex = [];
  var missIndex = [];
  var ref = new Firebase("https://xogame.firebaseio.com/Games/" + gameId + "/p1/p1Board");
  ref.orderByValue().on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      if (data.val() === "sub") {
        shipIndex.push(data.key());
      }
      else if (data.val() === "m") {
        missIndex.push(data.key());
      }
      else if (data.val() === "h") {
        hitIndex.push(data.key());
      }
      return shipIndex, missIndex, hitIndex;
    });
  });
}

//////////////////// Board 2 Stuff //////////////////////////

function readyForShips2(gameId) {
  $('.set2').one('click', function() {
    setShips2(gameId, gatherP2Data);
  });
}

function setShips2(gameId, callback) {
  $('td').on('click', function(e){
    var index = $(e.target).attr('id');
    console.log(subNumber);
    if (subNumber != 3) {
     {$(this).append(tempImg)}  // Take this out later?
      updateP2Array(gameId, index, ship);
      subNumber += 1;
    }
    $('.set2').hide();
    $('.messagediv').hide();
    callback(gameId);
  });
}

function updateP2Array(gameId, index, ship) {
  fb.child(gameId).child('p2').child('p2Board').child(index).set(ship);
}

function gatherP2Data(gameId) {
  var shipIndex = [];
  var hitIndex = [];
  var missIndex = [];
  var ref = new Firebase("https://xogame.firebaseio.com/Games/" + gameId + "/p2/p2Board");
  ref.orderByValue().on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      if (data.val() === "sub") {
        shipIndex.push(data.key());
      }
      else if (data.val() === "m") {
        missIndex.push(data.key());
      }
      else if (data.val() === "h") {
        hitIndex.push(data.key());
      }
      return shipIndex, missIndex, hitIndex;
    });
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



// Currently hard-coded as player2 data, not the long-term goal here!








// // ** This is a temporary setup to see if I could pass the uuid from "createNewGame"
// // ** to the two subsequent functions.  It has worked, but will need to be changed
// // ** so we can use ships that are bigger than one square.
// function prepPlayBoard (uuid) {
//   $('.set').on('click', function(){
//     setShips(uuid);
//     //findShips(uuid);
//   });
// }

// // Sets up the board with a ship as user clicks on board squares
// // NOTE: additional work is needed before larger ships can be placed.
// function setShips(uuid) {
//   $('td').one('click', function(e){
//   var index = $(e.target).attr('id');
//   updateP1Board(gameId, index, sub);   // Want to change this so the ship can be changed by user.
//   });
// }

// // updates player1's board-array in firebase
// function updateBoardArray(gameId, index, ship) {
//   fb.child(gameId).child('p1').child('p1Board').child(index).set(ship);
//   console.log(index);
// }

/////////////////////////////////////////////////////
//                                                 //
//  THE CODE BELOW HAS BEEN DEPRECATED BY REWORKS  //
//                                                 //
/////////////////////////////////////////////////////

// // Replaced by 'setShips'
// function setBoard(){
//   $('td').one('click', function(e){
//   var coords = findIndex(e.target);
//     shipNumber+=1;
//     if (shipNumber <= 3) {
//     updateBoardArray(coords, board);
//     }
//   });
// }

// // Replaced by 'updateP1Board'
// function updateBoardArray(coords, board) {
//     board[coords.row][coords.col] = sub;
//     fb.child('/Games').child('/uuid').set(board);
// }

// // Replaced by 'setShipIndex'
// function findIndex(element) {
//   var row = $(element).closest('tr').index(),
//       col = $(element).index();
//   console.log(row, col);
//   return { row: row, col: col };
// }

// These elements were added to the 'joinGame' function instead
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
