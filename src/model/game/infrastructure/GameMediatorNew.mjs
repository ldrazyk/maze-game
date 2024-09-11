const GameMediatorNew = function () {
    
    let players, scores;
    let board, pawns;
    let turnCounter, movesCounter, commands, gameInfo;


    const setComponents = function (components) {
    
        ({ players, scores, board, pawns, turnCounter, movesCounter, commands, gameInfo } = components);
    };

    // board

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

    // gameInfo

    const getGameNumber = function() {

        return gameInfo.getNumber();
    };

    // movesCounter

    const canStartTurn = function () { // canEndTurn ?
        
        return !movesCounter.canMove();
    };

    const canSelectNext = function () {

        return movesCounter.canSelectNext();
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
    
    // pawns

    const canMove = function (direction) {

        return pawns.canMoveSelected(direction);
    };

    const isInReach = function (field) {
    
        return pawns.isInReach(field);
    };

    const getSelected = function() {

        return pawns.getSelected();
    };

    // turnCounter

    const getTurnNumber = function () {

        return turnCounter.getTurn();
    };

    // commands

    const canUndo = function () {

        return commands.canUndo();
    };

    const canRedo = function () {

        return commands.canRedo();
    };

    // players

    const getPlayer = function (number) {
    
        return players.getPlayer(number);
    };

    const getActiveNumber = function (active=true) {
    
        return players.getActiveNumber(active);
    };

    const getActiveColor = function (active=true) {
    
        return players.getActiveColor(active);
    };

    // scores

    const isPlaying = function () {
    
        return !scores.ended();
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
    
    
    
    return Object.freeze(
        {
            setComponents,

            // board
            getBoardIterator,   // in GameState
            getBoardName,   // in GameState
            getBoardRows,   // in GameState
            getBoardColumns,    // in GameState
            // gameInfo
            getGameNumber,  // in GameState
            // movesCounter
            canStartTurn,   // in GameState
            canSelectNext,  // in GameState
            canHold,    // in GameState
            getMoves,   // in GameState
            getMovesAmount, // in GameState
            getHolds,   // in GameState
            getMaxHolds,    // in GameState
            // pawns
            canMove,    // in GameState
            isInReach,  // in GameState
            getSelected,    // in GameState
            // turnCounter
            getTurnNumber,  // in GameState
            // commands
            canUndo,    // in GameState
            canRedo,    // in GameState
            // players
            getPlayer,  // in GameState
            getActiveNumber,    // in GameState
            getActiveColor, // in GameState
            // scores
            isPlaying,  // in GameState
            getLastScoreString, // in GameState
            getLastScoreType,   // in GameState
            getLastScoreWinnerName, // in GameState
            

        }
    );
};

export default GameMediatorNew;