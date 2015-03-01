'use strict';

var fb = new Firebase('https://battleshippractice.firebaseio.com/');
var board = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
//var board2 = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
var ship = '<img src="http://www.clipartlord.com/wp-content/uploads/2013/03/submarine.png" height="100px" width="100px">';
var shipNumber = 0;
var player1 = true;
var rowObj;

//this code is turning the board array into an object. Just got to figure out where to fire this (after the board is made)
function boardArraytoObj(){
	rowObj = _.zipObject(['row1', 'row2', 'row3', 'row4', 'row5'], board);


	rowObj.row1 = _.zipObject(['1', '2', '3', '4', '5'], rowObj.row1);
	rowObj.row2 = _.zipObject(['1', '2', '3', '4', '5'], rowObj.row2);
	rowObj.row3 = _.zipObject(['1', '2', '3', '4', '5'], rowObj.row3);
	rowObj.row4 = _.zipObject(['1', '2', '3', '4', '5'], rowObj.row4);
	rowObj.row5 = _.zipObject(['1', '2', '3', '4', '5'], rowObj.row5);
}

// _.forEach(rowObj, function(n, key) {
//   cellObj = _.zipObject(['1', '2', '3', '4', '5'], n);

// });

//on click creates board and creates players in firebase 

$('.start').on('click', function(){
  createBoard(board);
  fb.child('/Games').limitToLast(1).once('value', function(snapshot) {
	  var data = snapshot.val();
	  var key = data && Object.keys(data)[0] || null;
	  var game = data && data[key] || null;
	  if (!data || game.p1 && game.p2) {
	    fb.child('/Games').push({p1: 'player1'});    
	  } else {
	    fb.child('/Games').child(key).set({p1: game.p1, p2: 'player2'});
	    player1 = false;
	  }
	  //console.log(key);
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
	fb.limitToLast(1).on('child_added', function(res){
      	var data = res.val();
      	var gameUid = Object.keys(data).pop();
        fb.child('/Games').child(gameUid).push(rowObj);
    });
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


