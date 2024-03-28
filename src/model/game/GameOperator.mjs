const GameOperator = function () {
    
    let game;

    const setGame = function (mediator) {
        game = mediator;
    };

    const nextTurn = function() {
        game.nextTurn();
    };

    const selectNext = function() {
        game.selectNext();
    };

    const hold = function () {
        game.hold();
    };
    
    const moveUp = function () {
        game.moveInDirection('up');
    };
    
    const moveDown = function () {
        game.moveInDirection('down');
    };
    
    const moveLeft = function () {
        game.moveInDirection('left');
    };
    
    const moveRight = function () {
        game.moveInDirection('right');
    };
    
    const click = function (fieldId) {
        game.click(fieldId);
    };

    const undo = function () {
        game.undo();
    };

    const redo = function () {
        game.redo();
    };

    const endGame = function (spec) {
    
        game.endGame(spec.type, spec.winnerNumber);
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

export default GameOperator;