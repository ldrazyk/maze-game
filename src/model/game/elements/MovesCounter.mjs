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

    const getMovesMade = function() {
        return moves;
    };
    
    const getMovesAmount = function() {
        return movesAmount;
    };

    const getHolds = function() {
        return holds;
    };

    const getMaxHolds = function() {
        return maxHolds;
    };

    const canSelectNext = function () {
        if (movesAmount - moves > 1) {
            return true;
        } else {
            return false;
        }
    };

    return Object.freeze(
        {
            reset,

            canHold,
            canMove,
            add,
            remove,
            getMovesMade,
            getMovesAmount,
            getHolds,
            getMaxHolds,
            canSelectNext,
        }
    );
};

export default MovesCounter;