const GameOperatorEmpty = function () {
    
    let game;

    const setGame = function (mediator) {
        game = mediator;
    };

    const emptyOperation = function () {
        console.log('Game has ended!');
    };

    const nextTurn = function() {
        emptyOperation();
    };

    const selectNext = function() {
        emptyOperation();
    };

    const hold = function () {
        emptyOperation();
    };
    
    const moveInDirection = function (direction) {
        emptyOperation();
    };
    
    const click = function (fieldId) {
        emptyOperation();
    };

    const undo = function () {
        emptyOperation();
    };

    const redo = function () {
        emptyOperation();
    };

    const endGame = function () {
        emptyOperation();
    };
    
    return Object.freeze(
        {
            setGame,

            // UI
            nextTurn,
            selectNext,
            hold,
            moveInDirection,
            click,
            undo,
            redo,
            endGame,
        }
    );
};

export default GameOperatorEmpty;