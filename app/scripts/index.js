'use strict';

var fb = new Firebase('https://xogame.firebaseio.com/');
var board = [['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b']];
//var board2 = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
var subImg = '<img src="/img/submarine.png">';
var sub = "sub";
var shipNumber = 0;
var coords;

$('button').on('click', function(){
  setBoard();
});


function setBoard(){
  $('td').one('click', function(e){
 	var coords = findIndex(e.target);
    shipNumber+=1;
    if (shipNumber <= 3) {
    updateBoardArray(coords, board);
    // Still need an appending function here
    }
  });
}

/////////////////////////////////////////////////////
//                                                 //
//  The append function I was using was a mod. of  //
//  Allison's tic-tac-toe code, like this:         //
//                                                 //
//  var cell = board[row][col];                    //
//  var cellClass = '.cell-' + row + '-' + col;    //
//  $(cellClass).append(subImg);                   //
//                                                 //
//  I'd like to make it work with a fb.snapshot    //
//  so we're pulling from Firebase to update the   //
//  board displays for player1 & player2, but not  //
//  really sure (yet) how to make that work.       //
//                                                 //
/////////////////////////////////////////////////////


// updates the board array data in firebase
function updateBoardArray(coords, board) {
    board[coords.row][coords.col] = sub;
    fb.child('/Game').child('/board').set(board);
}

//finds the square's coordinates so a ship can go there
function findIndex(element) {
  var row = $(element).closest('tr').index(),
      col = $(element).index();
  return { row: row, col: col };
  // need to figure out how to parse this returned data
  // so it works for the Allison-style append I want to do.
}

