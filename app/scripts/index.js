'use strict';

var fb = new Firebase('https://xogame.firebaseio.com/');
var boardfb = [['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b'],['b','b','b','b','b']];
//var board2 = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
var subImg = '<img src="http://www.clipartlord.com/wp-content/uploads/2013/03/submarine.png" height="100px" width="100px">';
var sub = "sub";
var bShip = "bShip"
var shipNumber = 0;
var coords;


$('button').on('click', function(){
  createBoard(boardfb);
})


// Creates initial board array in FB and on page
function createBoard (tableData) {
  var $table = $('<table></table>');
  tableData.forEach(function (row) {
    var $tr = $('<tr></tr>');
    row.forEach(function (cell){
      $tr.append($('<td></td>'));
      $table.append($tr);
    });
  });
  //$('.board').append($table);
  // Currently sets up to 3 submarines on board, updates board
  // and appends an image of  a submarine in the clicked td
  findCoords();
}

//  Called as part of 'findCoords' updates the firebase array
//  with the ship's coordinates (as each ship is added).
//   !!  currently only allows placement of submarines !!
function updateBoardArray(coords, board) {
	if(shipNumber <= 3){
      board[coords.row][coords.col] = sub;
      fb.child('/Game').child('/board').set(board);
	}
	//$('table').replaceWith(createBoard(board));
}

// Identifies where ships have been added to the board
function findCoords(){
	// on click of a square
  $('td').one('click', function(e){
  	
  	//finds the square's coordinates so a ship can go there
  	var coords = findIndex(e.target);
  	console.log(coords);
  	
  	//iterates (and should limit) the number of ships added to boad
    limitShips(coords);
    
    // updates the board array data in firebase
    updateBoardArray(coords, boardfb);

    // updates player1's board so ships are visible
    // !! currently roates through and double/triple appends
    // !! sub images to the previously labeled (and already 'subbed')
    // !! cells -- need to do a 'forEach' possibly?
    updatePlayingBoard(boardfb);
  });
}

// iterates number of ships that have been added to the board
// Needs to have limit feature added back to the function
function limitShips() {
	shipNumber += 1;
	//if (shipNumber <= 3) {attachShip($(this));}
}


// Takes data from the current firebase board
//and makes placed ships visible on player1's board

// !! see notes above about double/triple appending issue !!
function updatePlayingBoard(board) {
    for(var row=0; row < 5; row++) {
        for(var col=0; col < 5; col++) {
            var cell = board[row][col];
            var  cellClass = '.cell-' + row + '-' + col;

            if (cell === 'sub') {
              $(cellClass).append(subImg);
            }
        }
    }
}

// not sure this is still needed (or being called anywhere)
function findIndex(element) {
  var row = $(element).closest('tr').index(),
      col = $(element).index();
  return { row: row, col: col }
}

// Deprecated by 'updatePlayingBoard' function
///////////////////////////////////////////////
// function attachShip(td) {
//   td.append(ship);
// }