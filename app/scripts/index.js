'use strict';

var fb = new Firebase('https://battleshippractice.firebaseio.com/');
var board = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
//var board2 = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
var ship = '<img src="http://www.clipartlord.com/wp-content/uploads/2013/03/submarine.png" height="100px" width="100px">';
var shipNumber = 0;
var player1 = true;
var boardObj;
var thisGameUUID;

//this code is turning the board array into an object. Just got to figure out where to fire this (after the board is made)
function boardArraytoObj(){
	boardObj = _.zipObject(['row1', 'row2', 'row3', 'row4', 'row5'], board);
	boardObj.row1 = _.zipObject(['1', '2', '3', '4', '5'], boardObj.row1);
	boardObj.row2 = _.zipObject(['1', '2', '3', '4', '5'], boardObj.row2);
	boardObj.row3 = _.zipObject(['1', '2', '3', '4', '5'], boardObj.row3);
	boardObj.row4 = _.zipObject(['1', '2', '3', '4', '5'], boardObj.row4);
	boardObj.row5 = _.zipObject(['1', '2', '3', '4', '5'], boardObj.row5);
}

// function createNewGame(){ var fb2 = new Firebase('https://battleshippractice.firebaseio.com/'); 
// var newGameRef = fb2.push(); 
// var uuid = newGameRef.key(); 
// newGameRef.set({p1Board: '', p2Board: '', p1Ships: '', p2Ships: '', p1Points: 0, p2Points: 0}) 
// return uuid; }

//takes the last firebase object. If there is no player 2, you join as player 2. If there is a player 2, create new game.

$('.start').on('click', function(){
  createBoard(board);
  //createNewGame();
  fb.child('/Games').limitToLast(1).once('value', function(snapshot) {
	  var data = snapshot.val();
	  var key = data && Object.keys(data)[0] || null;
	  var game = data && data[key] || null;
	  if (!data || game.p1 && game.p2) {
	    var gameRef = fb.child('/Games').push({p1: 'player1'});
	    thisGameUUID = gameRef.key();    
	  } else {
	    fb.child('/Games').child(key).update({p1: game.p1, p2: 'player2'});
	    thisGameUUID = fb.child('/Games').child(key).key();
	    player1 = false;
	  }
 });
});

$('.play').on('click',function(){
  boardArraytoObj();
  sendBoardtoFB();
});


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
}

function sendBoardtoFB(){
	if(player1 === true){fb.child('/Games').child(thisGameUUID).child('/board1').set(boardObj);}
	else{fb.child('/Games').child(thisGameUUID).child('/board2').set(boardObj);}
}

function updateBoardDisplay(coords, board){
	if(shipNumber <= 3){
      board[coords.row][coords.col] = ship;  
    }
	//$('table').replaceWith(createBoard(board));
}

function findCoords(){
  $('td').one('click', function(e){
  	var coords = findIndex(e.target)
    shipNumber += 1;
    if (shipNumber <= 3) {attatchShip($(this));}   
    updateBoardDisplay(coords, board);
  });
}

function findIndex(element) {
  var row = $(element).closest('tr').index(),
      col = $(element).index();
  return { row: row, col: col }
}

function attatchShip(td) {
  td.append(ship);
}


