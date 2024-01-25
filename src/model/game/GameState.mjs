const GameState = function () {
    
    let game;
    let board, pawns;
    let turnCounter, movesCounter, scores;
    let commands;

    // setters

    const setGame = function (mediator) {
        game = mediator;
    };

    const setBoard = function (component) {
        board = component;
    };
    
    const setPawns = function (component) {
        pawns = component;
    };

    const setTurnCounter = function (component) {
        turnCounter = component;
    };
    
    const setMovesCounter = function (component) {
        movesCounter = component;
    };

    const setScores = function (component) {
        scores = component;
    };
    
    const setCommands = function(component) {
        commands = component;
    };

    // game state interface

    const canStartTurn = function () {
        return game.canStartTurn();
    };
    
    const canSelectNext = function () {
        return movesCounter.canSelectNext();
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

    // get game

    const getGameNumber = function() {
        return game.getNumber();
    };

    const getTurnNumber = function () {
        return turnCounter.getTurn();
    };
     
    const getLastScoreString = function() {
        return scores.getLastScoreString();
    };

    // get board

    const getBoardIterator = function() {
        return board.getIterator();
    };

    const getBoardName = function() {
        return board.getName();
    };

    const getBoardRows = function() {
        return board.getRows();
    };

    const getBoardColumns = function() {
        return board.getColumns();
    };

    // get pawns

    const getSelected = function() {
        return pawns.getSelected();
    };
    
    
    return Object.freeze(
        {
            // setters
            setGame: setGame,
            setBoard: setBoard,
            setPawns: setPawns,
            setTurnCounter: setTurnCounter,
            setMovesCounter: setMovesCounter,
            setScores: setScores,
            setCommands: setCommands,
            // game state interface
            canStartTurn: canStartTurn,
            canSelectNext: canSelectNext,
            canMove: canMove,
            canHold: canHold,
            canUndo: canUndo,
            canRedo: canRedo,
            // get game
            getGameNumber: getGameNumber,   // will be used
            getTurnNumber: getTurnNumber,   // will be used
            getLastScoreString: getLastScoreString, // used in ViewJs
            // get board
            getBoardIterator: getBoardIterator, // used in BoardComponent
            getBoardName: getBoardName, // used in BoardComponent
            getBoardRows: getBoardRows, // used in BoardComponent
            getBoardColumns: getBoardColumns,   // used in BoardComponent
            // get pawns
            getSelected: getSelected   // used in BoardComponent
        }
    );
};

export default GameState;