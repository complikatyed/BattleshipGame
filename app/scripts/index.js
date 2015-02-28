'use strict';

var fb = new Firebase('https://battleship16.firebaseio.com/');
var board = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
//var board2 = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
var ship = '<img src="http://www.clipartlord.com/wp-content/uploads/2013/03/submarine.png" height="100px" width="100px">';
var shipNumber = 0;

$('button').on('click', function(){
  createBoard(board);
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
}

function updateBoardDisplay(coords, board) {
	if(shipNumber <= 3){
	  console.log();
      board[coords.row][coords.col] = ship;
	}
	//$('table').replaceWith(createBoard(board));
}

function findCoords(){
  $('td').one('click', function(e){
  	var coords = findIndex(e.target)
    //fb.child('/Board').push(board);
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