const GameState = function () {
    
    let players, scores;
    let board, pawns;
    let turnCounter, movesCounter, commands, gameInfo;


    const setComponents = function (components) {
    
        ({ players, scores, board, pawns, turnCounter, movesCounter, commands, gameInfo } = components);
    };

    // game state interface

    const isPlaying = function () {
    
        return !scores.ended();
    };

    const canStartTurn = function () { // canEndTurn ?
    
        return !movesCounter.canMove();
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

    const getMoves = function() {
        
        return movesCounter.getMoves();
    };
    
    const getMovesAmount = function() {
        
        return movesCounter.getMovesAmount();
    };

    const getHolds = function() {
        
        return movesCounter.getHolds();
    };

    const getMaxHolds = function() {
        
        return movesCounter.getMaxHolds();
    };

    const canUndo = function () {
        return commands.canUndo();
    };

    const canRedo = function () {
        return commands.canRedo();
    };

    const isInReach = function (field) {
    
        return pawns.isInReach(field);
    };

    // get players

    const getPlayer = function (number) {
    
        return players.getPlayer(number);
    };

    const getActiveNumber = function (active=true) {
    
        return players.getActiveNumber(active);
    };

    const getActiveColor = function (active=true) {
    
        return players.getActiveColor(active);
    };

    // get game

    const getGameNumber = function() {
        return gameInfo.getNumber();
    };

    const getTurnNumber = function () {
        return turnCounter.getTurn();
    };
     
    const getLastScoreString = function() {
        return scores.getLastScoreString();
    };
     
    const getLastScoreType = function() {
        return scores.getLastScoreType();
    };
     
    const getLastScoreWinnerName = function() {
        return scores.getLastScoreWinnerName();
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
            setComponents,

            // game state interface
            canStartTurn,
            canSelectNext,
            canMove,
            canHold,
            getMoves,
            getMovesAmount,
            getHolds,
            getMaxHolds,
            canUndo,
            canRedo,
            isInReach,
            // get players
            getPlayer,
            getActiveNumber,
            getActiveColor,
            // get game
            getGameNumber,   // will be used
            getTurnNumber,   // will be used
            getLastScoreString, // used in ViewJs
            getLastScoreType,
            getLastScoreWinnerName,
            isPlaying,

            // get board
            getBoardIterator, // used in BoardComponent
            getBoardName, // used in BoardComponent
            getBoardRows, // used in BoardComponent
            getBoardColumns,   // used in BoardComponent
            // get pawns
            getSelected,   // used in BoardComponent
        }
    );
};

export default GameState;