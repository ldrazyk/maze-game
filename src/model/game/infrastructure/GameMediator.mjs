const GameMediator = function () {
    
    let players, scores;
    let board, pawns;
    let turnCounter, movesCounter, commands, gameInfo;
    let gameManager;


    const setComponents = function (components) {
    
        ({ players, scores, board, pawns, turnCounter, movesCounter, commands, gameInfo, gameManager } = components);
    };

    // gameManager

    const fieldIsInSelectedReach = function (id) {
    
        return gameManager.fieldIsInSelectedReach(id);
    };

    const placePawns = function (startZoneSize) {
    
        gameManager.managePlacePawns(startZoneSize);
    };

    const selectOnField = function (id) {
    
        gameManager.selectOnField(id);
    };

    const moveInDirection = function (direction) {
    
        gameManager.moveInDirection(direction);
    };

    const moveToField = function (id) {
    
        gameManager.moveToField(id);
    };

    const nextTurn = function () {

        gameManager.nextTurn();
    };

    const endGame = function(type, winnerNumber=false) {

        gameManager.endGame(type, winnerNumber);
    };

    const managePlace = function({ pawn, position }) {

        gameManager.managePlace({ pawn, position });
    };

    const manageMove = function({ pawn, position }) {

        gameManager.manageMove({ pawn, position });
    };

    const cleanAfterMove = function({ pawn, type, undo }) {

        gameManager.cleanAfterMove({ pawn, type, undo });
    };

    const isMoveLegal = function ({ pawnSpec, fieldSpec }) {

        return gameManager.isMoveLegal({ pawnSpec, fieldSpec });
    };

    // board

    const getField = function (spec) {
    
        return board.getField(spec);
    };

    const getPawnOnField = function (id) {
    
        return board.getPawnOnField(id);
    };

    const fieldHasActive = function (id) {
    
        return board.fieldHasActive(id);
    };

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

    const placePawnsOnBoard = function (spec) {
    
        board.placePawns(spec);
    };

    // gameInfo

    const getGameNumber = function() {

        return gameInfo.getNumber();
    };

    const isFlagCaptured = function () {
    
        return gameInfo.isFlagCaptured();
    };

    const setFlagCaptured = function () {
    
        gameInfo.setFlagCaptured();
    };

    // movesCounter

    const canEndTurn = function () {
        
        return !movesCounter.canMove();
    };

    const canSelectNext = function () {

        return movesCounter.canSelectNext();
    };

    const canHold = function () {

        return movesCounter.canHold();
    };

    const getMovesMade = function() { // getMovesMade
        
        return movesCounter.getMovesMade();
    };

    const getMovesAmount = function() {
        
        return movesCounter.getMovesAmount();
    };

    const hasMoves = function () {
    
        return movesCounter.getMovesAmount() > 0;
    };

    const getHolds = function() { // getHoldsDone / getHoldsLeft
        
        return movesCounter.getHolds();
    };

    const getMaxHolds = function() {
        
        return movesCounter.getMaxHolds();
    };

    const resetMovesAmount = function (activePawnsAmount) {
    
        movesCounter.reset(activePawnsAmount);;
    };

    const addMoveToCounter = function (type) {
    
        movesCounter.add(type);
    };

    const removeMoveFromCounter = function (type) {
    
        movesCounter.remove(type);
    };
    
    // pawns

    const canMove = function (direction) { // canMoveInDirection

        return pawns.canMoveSelected(direction);
    };

    const isInReach = function (field) { // isFieldInReach
    
        return pawns.isInReach(field);
    };

    const getPawn = function (id) {
    
        return pawns.getPawn(id);
    };

    const getSelected = function() {

        return pawns.getSelected();
    };

    const fieldHasSelected = function (fieldId) {
    
        return pawns.getSelectedPositionId() == fieldId;
    };

    const selectNext = function () {
    
        pawns.selectNext();
    };

    const selectPawn = function (id) {
    
        pawns.select(id);
    };

    const getPawnsIterator = function (spec) {
    
        return pawns.getIterator(spec);
    };

    const setActivePawns = function (playerNumber) {
    
        pawns.setActivePawns(playerNumber);
    };

    const updateReaches = function () {
    
        pawns.updateReaches();;
    };

    const getActivePawnsAmount = function () {
    
        return pawns.getActiveAmount();
    };

    const resetPawns = function () {
    
        pawns.reset();;
    };

    // turnCounter

    const getTurnNumber = function () {

        return turnCounter.getTurn();
    };

    const updateTurnNumber = function () {
    
        return turnCounter.next();
    };

    // commands

    const canUndo = function () {

        return commands.canUndo();
    };

    const canRedo = function () {

        return commands.canRedo();
    };

    const hold = function () {
    
        commands.hold();
    };

    const move = function (field) {
    
        commands.move(field);;
    };

    const undo = function () {
    
        return commands.undo();
    };

    const redo = function () {
    
        return commands.redo();
    };

    const resetCommandsHistory = function () {
    
        commands.resetHistory();
    };

    // players

    const getPlayer = function (number) {
    
        return players.getPlayer(number);
    };

    const getActivePlayer = function(active=true) {

        return players.getActive(active);
    };

    const getActivePlayerNumber = function (active=true) {
    
        return players.getActiveNumber(active);
    };

    const getActiveColor = function (active=true) { // getActivePlayerColor
    
        return players.getActiveColor(active);
    };

    const getPlayersAmount = function () {
    
        return players.getAmount();
    };

    const changeActivePlayer = function () {
    
        players.changeActive();
    };

    // scores

    const isPlaying = function () { // isGameRunning
    
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

    const addScore = function (type, winnerNumber) {
    
        scores.add(type, winnerNumber);
    };
    
    
    return Object.freeze(
        {
            setComponents,

            // for manager
            fieldIsInSelectedReach, // Operations
            placePawns,             // Operations
            selectOnField,          // Operations
            moveInDirection,        // Operations
            moveToField,            // Operations
            nextTurn,               // Operations
            endGame,                // Operations
            managePlace,            // (Board)
            manageMove,             // (MoveCommand)
            cleanAfterMove,         // (DisactivateCommand)
            isMoveLegal,            // (Pawn)
            // board
            getField,               // Manager
            getPawnOnField,         // Manager
            fieldHasActive,         // Operations
            getBoardIterator,       // State
            getBoardName,           // State
            getBoardRows,           // State
            getBoardColumns,        // State
            placePawnsOnBoard,      // Manager
            // gameInfo
            getGameNumber,          // State, (Scores)
            isFlagCaptured,         // Operations
            setFlagCaptured,        // Manager
            // movesCounter
            canEndTurn,             // State, Operations
            canSelectNext,          // State, Operations
            canHold,                // State, Operations
            getMovesMade,           // State
            getMovesAmount,         // State
            hasMoves,               // Operations
            getHolds,               // State
            getMaxHolds,            // State
            resetMovesAmount,       // Manager
            addMoveToCounter,       // Manager
            removeMoveFromCounter,  // Manager
            // pawns
            canMove,                // State, Operations
            isInReach,              // State
            getPawn,                // Manager
            getSelected,            // State, (Commands), Manager
            fieldHasSelected,       // Operations
            selectNext,             // Operations, Manager
            selectPawn,             // Manager
            getPawnsIterator,       // Manager
            setActivePawns,         // Manager
            updateReaches,          // Manager
            getActivePawnsAmount,   // Manager
            resetPawns,             // Manager
            // turnCounter
            getTurnNumber,          // State
            updateTurnNumber,       // Manager
            // commands
            canUndo,                // State, Operations
            canRedo,                // State, Operations
            hold,                   // Operations
            move,                   // Manager
            undo,                   // Operations
            redo,                   // Operations
            resetCommandsHistory,   // Manager
            // players
            getPlayer,              // State, (Board, Pawns, Scores)
            getActivePlayer,        // (Scores)
            getActivePlayerNumber,  // State, Manager
            getActiveColor,         // State
            getPlayersAmount,       // Manager
            changeActivePlayer,     // Manager
            // scores
            isPlaying,              // State
            getLastScoreString,     // State
            getLastScoreType,       // State
            getLastScoreWinnerName, // State
            addScore,               // Manager

        }
    );
};

export default GameMediator;