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
    
    const moveUp = function () {
        emptyOperation();
    };
    
    const moveDown = function () {
        emptyOperation();
    };
    
    const moveLeft = function () {
        emptyOperation();
    };
    
    const moveRight = function () {
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
            moveUp,
            moveDown,
            moveLeft,
            moveRight,
            click,
            undo,
            redo,
            endGame,
        }
    );
};

export default GameOperatorEmpty;