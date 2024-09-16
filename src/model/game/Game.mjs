const Game = function () {

    let gameOperator, gameOperatorEmpty, gameState;
    
    const setComponents = function (components) {
    
        ({ gameOperator, gameOperatorEmpty, gameState } = components);
    };

    const init = function () {
    
        gameOperator.placePawns() ;
    };

    const getGameState = function () {
    
        return gameState;
    };

    const disableInput = function () {
    
        gameOperator = gameOperatorEmpty;
        console.log('Games input disabled');
    };

    // UI

    const nextTurn = function() {

        gameOperator.nextTurn();
    };

    const selectNext = function() {

        gameOperator.selectNext();
    };

    const hold = function () {

        gameOperator.hold();
    };
    
    const moveUp = function () {

        gameOperator.moveInDirection('up');
    };
    
    const moveDown = function () {

        gameOperator.moveInDirection('down');
    };
    
    const moveLeft = function () {

        gameOperator.moveInDirection('left');
    };
    
    const moveRight = function () {

        gameOperator.moveInDirection('right');
    };
    
    const click = function (fieldId) {

        gameOperator.click(fieldId);
    };

    const undo = function () {

        gameOperator.undo();
    };

    const redo = function () {

        gameOperator.redo();
    };

    const endGame = function (spec) {
    
        gameOperator.endGame(spec.type, spec.winnerNumber);
    };
    
    return Object.freeze(
        {
            // init
            setComponents,
            init,

            // other
            getGameState,
            disableInput,
            
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

export default Game;