const GameState = function () {
    
    let game, commands, pawns, movesCounter;

    // setters

    const setGame = function (mediator) {
        game = mediator;
    };

    const setCommands = function(module) {
        commands = module;
    };

    const setPawns = function (module) {
        pawns = module;
    };

    const setMovesCounter = function (module) {
        movesCounter = module;
    };

    // game state interface

    const canStartTurn = function () {
        return game.canStartTurn();
    };
    
    const canSelectNext = function () {
        return pawns.canSelectNext();
    };

    const canMove = function (direction) {
        return pawns.canMoveSelected(direction);
    };

    const canHold = function () {
        return movesCounter.canHold();
    };

    const canUndo = function () {
        return commands.canUndo();
    };

    const canRedo = function () {
        return commands.canRedo();
    };
    
    
    return Object.freeze(
        {
            // setters
            setGame: setGame,
            setCommands: setCommands,
            setPawns: setPawns,
            setMovesCounter: setMovesCounter,
            // game state interface
            canStartTurn: canStartTurn,
            canSelectNext: canSelectNext,
            canMove: canMove,
            canHold: canHold,
            canUndo: canUndo,
            canRedo: canRedo,
        }
    );
};

export default GameState;