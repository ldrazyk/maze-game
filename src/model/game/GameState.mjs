const GameState = function () {
    
    let game;
    let players;
    let board, pawns;
    let turnCounter, movesCounter, scores;
    let commands;

    // setters

    
    const setGame = function (mediator) {
        game = mediator;
    };

    const setPlayers = function (component) {
        players = component;
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
            setGame,
            setPlayers,
            setBoard,
            setPawns,
            setTurnCounter,
            setMovesCounter,
            setScores,
            setCommands,
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