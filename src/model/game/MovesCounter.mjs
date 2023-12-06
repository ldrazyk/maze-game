const MovesCounter = function(movesAmount) {
    let moves, holds, maxHolds;

    const init = function() {
        moves = 0;
        holds = 0;
        maxHolds = parseInt(movesAmount / 2);
    }();

    const canHold = function() {
        if (holds < maxHolds) {
            return true;
        }
        else {
            return false;
        }
    };

    const canMove = function() {
        if (moves < movesAmount) {
            return true;
        } else {
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
            canHold: canHold,
            canMove: canMove,
            add: add,
            remove: remove,
            getMoves: getMoves,
        }
    );
};

export default MovesCounter;