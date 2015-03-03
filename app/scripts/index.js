'use strict';

var fb = new Firebase('https://battleship16.firebaseio.com/');
var board = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
var otherBoard;
var ship = '<img src=../imgs/submarine.png height="100px" width="100px">';
var fire = '<img src=../imgs/fire.png height="100px" width="100px">';
var shipNumber = 0;
var player1 = true;
var thisGameUUID;
var hits = 0;
var shots = 5;


//takes the last firebase object. If there is no player 2, you join as player 2. If there is a player 2, create new game.

$('.start').on('click', function(){
  createBoard(board);
  $('.message1').append($('<h2>You Have 3 Submarines. Place Them Wisely.</h2>'));
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
	$('.send').toggleClass('hidden');
 });
});

//sends board to firebase
$('.send').one('click',function(){
  $('.message1').hide();
  if(shipNumber >= 3){sendBoardtoFB(); $('.send').toggleClass('hidden'); $('.play').toggleClass('hidden');}
  else{alert('you still have' + ' ' + (3 - shipNumber) + ' ' + 'ships to use!');}
  $('table').eq(0).hide();
});

//grabs another players board from firebase
$('.play').on('click', function(){
  fb.child('/Games').child(thisGameUUID).child('/board2').on('value', function(res){
      var boardData = res.exists();
  if(boardData == false){alert('You have no one to play with, try waiting and clicking Play again');}
  else {grabSecondBoard(); createBoard(otherBoard); assessMove(); $('.message2').append('<h2>You have 5 Missles. Fire them!</h2>'); $('.play').hide();}
  });
});

function checkWinner(){
  fb.child('/Games').child(thisGameUUID).on('value', function(res){
    var data = res.val();
    if(data.winner.winner == 'player1'){alert('player1 Won the Game');}
    else if(data.winner.winner == 'player2'){alert('player2 Won the Game');}
  });
}

function assessMove(){
	$('td').one('click', function(e){
	  if($(this).hasClass('X') && shots <= 5){hits += 1; $(this).append(fire);}
	  else if(shots <= 0){alert('you ran out of ammo -- gameover');}
	  if(hits >= 3 && player1 == true){fb.child('/Games').child(thisGameUUID).child('/winner').update({winner: 'player1'});}
	  else if(hits >= 3 && player1 == false){fb.child('/Games').child(thisGameUUID).child('/winner').update({winner: 'player2'});}
	  shots -= 1; 
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
  	fb.child('/Games').child(thisGameUUID).child('/board2').on('value', function(res){
      otherBoard = res.val();
    });
  }
  else{fb.child('/Games').child(thisGameUUID).child('/board1').on('value', function(res){
    otherBoard = res.val();
    });
  }
}

