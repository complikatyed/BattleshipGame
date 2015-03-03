
/////////////////////////////////////////////////////
//                                                 //
//  THE CODE BELOW HAS BEEN DEPRECATED BY REWORKS  //
//                                                 //
/////////////////////////////////////////////////////

// Replaced by 'setShips'
function setBoard(){
  $('td').one('click', function(e){
  var coords = findIndex(e.target);
    shipNumber+=1;
    if (shipNumber <= 3) {
    updateBoardArray(coords, board);
    }
  });
}

// Replaced by 'updateP1Board'
function updateBoardArray(coords, board) {
    board[coords.row][coords.col] = sub;
    fb.child('/Games').child('/uuid').set(board);
}

// Replaced by 'setShipIndex'
function findIndex(element) {
  var row = $(element).closest('tr').index(),
      col = $(element).index();
  console.log(row, col);
  return { row: row, col: col };
}

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


