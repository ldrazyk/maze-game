const MovesCounter = function() {
    let movesAmount, maxHolds;
    let moves, holds;

    const reset = function (newMovesAmount) {

        movesAmount = newMovesAmount;
        maxHolds = parseInt(movesAmount / 2);
        moves = 0;
        holds = 0;
    };

    const init = function() {
        
        reset(0);
    }();
    
    const canMove = function() {
        if (moves < movesAmount) {
            return true;
        } else {
            return false;
        }
    };
    
    const canHold = function() {
        if (holds < maxHolds && canMove()) {
            return true;
        }
        else {
            return false;
        }
    };

    const add = function(type) {    // type = 'hold' or 'move'
        moves += 1;
        if (type == 'hold') {
            holds += 1;
        }
    };

    const remove = function(type) {
        moves -= 1;
        if (type == 'hold') {
            holds -= 1;
        }
    };

    const getMoves = function() {
        return moves;
    };

    return Object.freeze(
        {
            reset: reset,

            canHold: canHold,
            canMove: canMove,
            add: add,
            remove: remove,
            getMoves: getMoves,
        }
    );
};

export default MovesCounter;