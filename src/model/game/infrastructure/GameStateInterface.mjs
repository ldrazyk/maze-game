const GameStateInterface = function () {
    
    let game;


    const setComponents = function (components) {
    
        game = components.gameMediator;
    };

    // board

    const getBoardIterator = function() {

        return game.getBoardIterator();
    };

    const getBoardName = function() {

        return game.getBoardName();
    };

    const getBoardRows = function() {

        return game.getBoardRows();
    };

    const getBoardColumns = function() {

        return game.getBoardColumns();
    };

    // gameInfo

    const getGameNumber = function() {

        return game.getGameNumber();
    };

    // movesCounter

    const canStartTurn = function () {

        return game.canEndTurn();
    };

    const canSelectNext = function () {

        return game.canSelectNext();
    };

    const canHold = function () {

        return game.canHold();
    };

    const getMoves = function() { // getMovesMade

        return game.getMovesMade();
    };

    const getMovesAmount = function() {

        return game.getMovesAmount();
    };

    const getHolds = function() { // getHoldsDone / getHoldsLeft

        return game.getHolds();
    };

    const getMaxHolds = function() {

        return game.getMaxHolds();
    };
    
    // pawns

    const canMove = function (direction) { // canMoveInDirection

        return game.canMove(direction);
    };

    const isInReach = function (field) { // isFieldInReach

        return game.isInReach(field);
    };

    const getSelected = function() {

        return game.getSelected();
    };

    // turnCounter

    const getTurnNumber = function () {

        return game.getTurnNumber();
    };

    // commands

    const canUndo = function () {

        return game.canUndo();
    };

    const canRedo = function () {

        return game.canRedo();
    };

    // players

    const getPlayer = function (number) {

        return game.getPlayer(number);
    };

    const getActiveNumber = function (active=true) { // getActivePlayerNumber

        return game.getActivePlayerNumber(active);
    };

    const getActiveColor = function (active=true) { // getActivePlayerColor

        return game.getActiveColor(active);
    };

    const getPlayerName = function (number) {
    
        return game.getPlayerName(number);
    };

    // scores

    const isPlaying = function () { // isGameRunning

        return game.isPlaying();
    };
     
    const getLastScoreString = function() {

        return game.getLastScoreString();
    };
     
    const getLastScoreType = function() {

        return game.getLastScoreType();
    };
     
    const getLastScoreWinnerName = function() {
        
        return game.getLastScoreWinnerName();
    };

    
    return Object.freeze(
        {
            setComponents,

            // board
            getBoardIterator,       // BoardComponent
            getBoardName,           // BoardComponent
            getBoardRows,           // BoardComponent
            getBoardColumns,        // BoardComponent
            // gameInfo
            getGameNumber,
            // movesCounter
            canStartTurn,
            canSelectNext,
            canHold,
            getMoves,
            getMovesAmount,
            getHolds,
            getMaxHolds,
            // pawns
            canMove,
            isInReach,
            getSelected,            // BoardComponent
            // turnCounter
            getTurnNumber,
            // commands
            canUndo,
            canRedo,
            // players
            getPlayer,
            getActiveNumber,
            getActiveColor,
            getPlayerName,          // EndGamePanel, ChangeColorsComponent
            // scores
            isPlaying,
            getLastScoreString,     // ViewJs
            getLastScoreType,
            getLastScoreWinnerName,
        }
    );
};

export default GameStateInterface;