function displayShips() {
  // 1. Input argument will be info from "findShips" function
  // 2. Using classes and/or ids (that match array index), append images or shapes
  //    A. Possible approach = $(cellClass).append(shipImg);
  //    B. May want to use simple shapes for ease of placement
  //       i.  Should the image or shape have text also?
  //       ii. Different shapes for different ships?
  // 3. Will need adaptations for multi-square ships
  //    A. Could reference larger ships with multi-part names?
  //       i.   Cruiser:  cru1, cru2
  //       ii.  Destroyer: dest1, dest2, dest3
  //       iii. Carrier: car1, car2, car3, car4
  //    B. Can set images hidden for display of board to opponent
}


function takeTurn() {
  // 1. Click on square on "opponent's" board  (use the same approach as before)
  // 2. Calls "checkForHit" function (framed)
  //    A. "MISS"
  //       i.  calls "markHitOrMiss" function (framed)
  //       ii. calls "whoseTurn" function (framed -- sortof)
  //
  //    B. "HIT"
  //       i.  calls "markHitOrMiss" function (framed)
  //       ii. calls "trackShips" function (framed)
  //       ii. calls "gameStatus" function (framed)
  //           a. if player has won -- call "displayWin" (framed)
  //           b. if no one has won yet:
  //               1. Calls "updateScoreArray" function (framed)
  //               2. Calls "updateScoreDisplay" functin (framed)
  //               3. Calls "whoseTurn" function (framed -- sortof)
  // 3. if game not over, tell next player to go.
}

function checkForHit() {
  // Should be much the same as the 'findShips' function
  // (once I get that mess sorted out)
  // 1. On click in a board square, looks for a ship (or "h" or "m") in that spot.
  //    ** If we do what I'm imagining & display the opponent's actual board
  //    ** (with the ships hidden) this part should be incredibly easy.
  // 2. Return "hit" or "miss" (or hit === true?) for the next function
  //
}

function markHitOrMiss() {
  // 1. Take input from "checkForHit" function and react to it
  // 2. Update board arrays with "h" or "m" so they can't be chosen again.
  // 3. Update displayed boards to indicate hit or miss
  //    A. How to show hit?
  //       i. reveal picture (toggle hidden)
  //       ii. Add colored and/or textured background
  //       iii. Some kind of animation?
  //    B. Indicate a miss?
  //       i. nothing to unhide (since no ship is there)
  //       ii. use a symbol or color/texture?
}

function updateScoreArray() {
  // 1. Take input from "checkForHit" (and "trackShips") function and react to it
  // 2. Add to the point value in the player's point array in firebase
  // 3. Return score data for the "updateScoreDisplay" function
}

function updateScoreDisplay() {
  // 1. Take input from "updateScoreArray" to display.
  // 2. Append updated score to the display
  // (we need to create a div or container for this in our index.jade file)
}

function trackShips(){
  // 1. Take hit data and deduct hit from the correct ship
  // 2. if ship already has a hit, did this hit sink it? (less than < 1)
  // 3. if it did sink a ship, send bonus points to score array
}

function whoseTurn() {
  // Not sure if this needs to be a separate function, or just an iterator
  // Putting it here as a function to be written until we decide how to proceed.
}

function gameStatus() {
  // 1. check for remaining ships (just in one player's set, or both?)
  // 2. If there are still ships, flip the "whoseTurn" marker (or call the function)
  // 3. If there are no ships left (for either player), 'game over' = true;
  // 4. Calls "displayWinMessage"
}

function displayWinMessage() {
  // 1. append some kind of winning message to both pages
  // (not sure what we want the message to be -- same on both screens, etc?)
}

