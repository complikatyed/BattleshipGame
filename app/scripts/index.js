'use strict';

var fb = new Firebase('https://battleshippractice.firebaseio.com/');
var board = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
var otherBoard;
var ship = '<img src=../imgs/submarine.png height="100px" width="100px">';
var fire = '<img src=../imgs/fire.png height="100px" width="100px">';
var shipNumber = 0;
var player1 = true;
var thisGameUUID;
var hits = 0;


//takes the last firebase object. If there is no player 2, you join as player 2. If there is a player 2, create new game.

$('.start').on('click', function(){
  createBoard(board);
  fb.child('/Games').limitToLast(1).once('value', function(snapshot) {
	  var data = snapshot.val();
	  var key = data && Object.keys(data)[0] || null;
	  var game = data && data[key] || null;
	  if (!data || game.p1 && game.p2) {
	    var gameRef = fb.child('/Games').push({winner: false, p1: 'player1'});
	    thisGameUUID = gameRef.key();    
	  } else {
	    fb.child('/Games').child(key).update({p2: 'player2'});
	    thisGameUUID = fb.child('/Games').child(key).key();
	    player1 = false;
	  }
	  $('.start').hide();
 });
});

//the Play Someone! button pushes respective board to firebase. It needs to append board1 or board2 object as a table next to it
//alerts if you didn't use all your ships
$('.send').on('click',function(){
  if(shipNumber >= 3){sendBoardtoFB(); grabSecondBoard();}
  else{alert('you still have' + ' ' + (3 - shipNumber) + ' ' + 'ships to use!');}
  $('.send').hide();
});

$('.play').on('click', function(){
  if(player1 == true){alert('You have no one to play with, try waiting and clicking Play again');}
  else {createBoard(otherBoard); assessMove();}
});

function checkWinner(){
  fb.child('/Games').child(thisGameUUID).on('value', function(res){
    var data = res.val();
    if(data.winner.winner == 'player1'){alert('player1 Won the Game');}
    else if(data.winner.winner == 'player2'){alert('player2 Won the Game');}
  });
}

function assessMove(){
	$('td').on('click', function(e){
	  if($(this).hasClass('X')){hits += 1; $(this).append(fire);}
	  if(hits >= 3 && player1 == true){fb.child('/Games').child(thisGameUUID).child('/winner').update({winner: 'player1'});}
	  else if(hits >= 3 && player1 == false){fb.child('/Games').child(thisGameUUID).child('/winner').update({winner: 'player2'});}
	});
	checkWinner();
}

//loops through array to create empty table
function createBoard (tableData) {
  var $table = $('<table></table>');
  tableData.forEach(function (row) {
    var $tr = $('<tr></tr>');
    row.forEach(function (cell){
      $tr.append($('<td class=' + cell + '></td>'));
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
function updateBoardArray(coords, board){
	if(shipNumber <= 3){
      board[coords.row][coords.col] = 'X';  
    }
}

//attaches ship to td
function findCoords(){
  $('td').one('click', function(e){
  	var coords = findIndex(e.target)
    shipNumber += 1;
    if (shipNumber <= 3) {$(this).append(ship)}   
    updateBoardArray(coords, board);
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



