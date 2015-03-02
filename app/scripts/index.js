'use strict';

var fb = new Firebase('https://battleshippractice.firebaseio.com/');
var emptyBoard = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
var board = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
var otherBoard;
var ship = '<img src="http://www.clipartlord.com/wp-content/uploads/2013/03/submarine.png" height="100px" width="100px">';
var shipNumber = 0;
var player1 = true;
//var boardObj = _.zipObject(['row1', 'row2', 'row3', 'row4', 'row5'], board);
var thisGameUUID;

//takes the last firebase object. If there is no player 2, you join as player 2. If there is a player 2, create new game.

$('.start').on('click', function(){
  createBoard(board);
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
	  $('.start').hide();
 });
});

//the Play Someone! button pushes respective board to firebase. It needs to append board1 or board2 object as a table next to it
//alerts if you didn't use all your ships
$('.play').on('click',function(){
  if(shipNumber >= 3){sendBoardtoFB(); grabSecondBoard(); createBoard(emptyBoard);}
  else{alert('you still have' + ' ' + (3 - shipNumber) + ' ' + 'ships to use!');}
});

//loops through array to create empty table
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
	if(player1 === true){fb.child('/Games').child(thisGameUUID).child('/board1').set(board);}
	else{fb.child('/Games').child(thisGameUUID).child('/board2').set(board);}
}

//updates board array
function updateBoardDisplay(coords, board){
	if(shipNumber <= 3){
      board[coords.row][coords.col] = ship;  
    }
}

//attaches ship to td
function findCoords(){
  $('td').one('click', function(e){
  	var coords = findIndex(e.target)
    shipNumber += 1;
    if (shipNumber <= 3) {$(this).append(ship)}   
    updateBoardDisplay(coords, board);
  });
}

function findIndex(element) {
  var row = $(element).closest('tr').index(),
      col = $(element).index();
  return { row: row, col: col }
}

//this function grabs otherBoard array
function grabSecondBoard(){
  if(player1 == true) {
  	fb.child('/Games').child(thisGameUUID).child('/board2').once('value', function(res){
      otherBoard = res.val();
    });
  }
  else{fb.child('/Games').child(thisGameUUID).child('/board1').once('value', function(res){
    otherBoard = res.val();
    });
  }
}

function storeOpponentsLocation(){
  
}


