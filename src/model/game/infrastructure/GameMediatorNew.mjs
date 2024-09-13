const GameMediatorNew = function () {
    
    let players, scores;
    let board, pawns;
    let turnCounter, movesCounter, commands, gameInfo;
    let gameManager;


    const setComponents = function (components) {
    
        ({ players, scores, board, pawns, turnCounter, movesCounter, commands, gameInfo, gameManager } = components);
    };

    // move to manager

    const fieldHasActive = function (id) {
    
        const pawn = board.getPawnOnField(id);

        if (pawn) {
            return pawn.isActive();
        } else {
            return false;
        }
    };

    const fieldIsInReach = function (id) {
    
        const selected = pawns.getSelected();
        const field = board.getField({id});

        return selected.hasInReach(field);
    };

    const placePawns = function (startZoneSize) {
    
        for (let n = 0; n < players.getAmount(); n += 1) {

            const playerNumber = n + 1;
            const pawnsIterator = pawns.getIterator({ playerNumber });
            board.placePawns({ playerNumber, pawnsIterator, startZoneSize });
        }
    };

    const selectOnField = function (id) {
    
        const pawn = board.getPawnOnField(id);

        pawns.select(pawn.getId());
    };

    const moveInDirection = function (direction) {
    
        const field = pawns.getSelected().getReach(direction);
        commands.move(field);
    };

    const moveToField = function (id) {
    
        const field = board.getField({id});
        commands.move(field);
    };

    const nextTurn = function () {


        const updateTurnNumber = function () {
        
            turnCounter.next()
        };

        const updatePlayers = function () {

            players.changeActive();
        };

        const updatePawns = function () {
        
            pawns.setActivePawns(players.getActive().getNumber());
            pawns.updateReaches();
        };

        const updateMoves = function () {
        
            movesCounter.reset(pawns.getActiveAmount());
            commands.resetHistory();
        };


        updateTurnNumber();
        updatePlayers();
        updatePawns();
        updateMoves();
    };

    const endGame = function(type, winnerNumber=false) {

        scores.add(type, winnerNumber);
        pawns.reset();
    };

    const movePawn = function({ pawn, position }) { // manageMove / executeMove

        const oldPosition = pawn.getPosition();
        if (oldPosition) {
            oldPosition.free();
        }
        pawn.move(position);
        position.take(pawn);
    };

    const cleanAfterMove = function({ pawn, type, undo }) { // part of executeMove

        const updateMovesCounter = function() {
            if (!undo) {
                movesCounter.add(type);
            } else {
                movesCounter.remove(type);
            }
        };

        const updatePawnsOrder = function() {
            pawn.setOrder(movesCounter.getMoves());
        };

        const disactivatePawn = function() {
            pawn.setActive(undo);
        };

        
        const maybeUpdateReaches = function() {
            if (type == 'move') {
                pawns.updateReaches();
            }
        };
        
        const selectNextAfterMove = function() {
            pawns.selectNext();
        };

        updateMovesCounter();
        updatePawnsOrder();
        disactivatePawn();
        
        maybeUpdateReaches();
        selectNextAfterMove();
        
        notify(type); // todo move to OperationsInterface
    };

    const isMoveLegal = function ({ pawnSpec, fieldSpec }) {

        const getPawnFromSpec = function () {
            let { pawn, pawnId } = pawnSpec;

            if (!pawn) {
                pawn = pawns.getPawn(pawnId);
            }
            return pawn;
        };

        const getFieldFromSpec = function () {
            let { id, x, y, field, direction } = fieldSpec;

            let resultField;

            if (id || x || direction) {
                resultField = board.getField(fieldSpec);
            } else {
                resultField = field;
            }

            return resultField;
        };

        const couldPawnMoveToField = function (pawn, field) {
            let result = false;

            if (field.getType() == 'path') {

                result = true;

                const otherPawn = field.getPawn();
                if ( otherPawn && ( pawn.getPlayerNumber() == otherPawn.getPlayerNumber() || pawn.getKills() != otherPawn.getType() )) {
                    result = false;
                }

            } else if (field.getType() == 'exit' & pawn.getPlayerNumber() != field.getExitNumber()) {
                result = true;
            }
            return result;
        };

        let result = false;
        const pawn = getPawnFromSpec();
        const field = getFieldFromSpec();
        if (field && couldPawnMoveToField(pawn, field)) {
            result = field;
        }

        return result;
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

    const canEndTurn = function () {
        
        return !movesCounter.canMove();
    };

    const canSelectNext = function () {

        return movesCounter.canSelectNext();
    };

    const canHold = function () {

        return movesCounter.canHold();
    };

    const getMoves = function() { // getMovesDone
        
        return movesCounter.getMoves();
    };

    const getMovesAmount = function() {
        
        return movesCounter.getMovesAmount();
    };

    const getHolds = function() { // getHoldsDone / getHoldsLeft
        
        return movesCounter.getHolds();
    };

    const getMaxHolds = function() {
        
        return movesCounter.getMaxHolds();
    };
    
    // pawns

    const canMove = function (direction) { // canMoveInDirection

        return pawns.canMoveSelected(direction);
    };

    const isInReach = function (field) { // isFieldInReach
    
        return pawns.isInReach(field);
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

    const hold = function () {
    
        commands.hold();
    };

    const undo = function () {
    
        return commands.undo(); // TODO type
    };

    const redo = function () {
    
        return commands.redo(); // TODO type
    };

    // players

    const getPlayer = function (number) {
    
        return players.getPlayer(number);
    };

    const getActivePlayer = function(active=true) {

        return players.getActive(active);
    };

    const getActiveNumber = function (active=true) { // getActivePlayerNumber
    
        return players.getActiveNumber(active);
    };

    const getActiveColor = function (active=true) { // getActivePlayerColor
    
        return players.getActiveColor(active);
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
    
    
    return Object.freeze(
        {
            setComponents,

            // for manager
            fieldHasActive,     // Operations
            fieldIsInReach,     // Operations
            placePawns,         // Operations
            selectOnField,      // Operations
            moveInDirection,    // Operations
            moveToField,        // Operations
            nextTurn,           // Operations
            endGame,            // Operations
            movePawn,           // (MoveCommand, Board)
            cleanAfterMove,     // (DisactivateCommand)
            isMoveLegal,        // (Pawn)
            // board
            getBoardIterator,   // State
            getBoardName,       // State
            getBoardRows,       // State
            getBoardColumns,    // State
            // gameInfo
            getGameNumber,      // State, (Scores)
            // movesCounter
            canEndTurn,         // State, Operations
            canSelectNext,      // State, Operations
            canHold,            // State, Operations
            getMoves,           // State
            getMovesAmount,     // State
            getHolds,           // State
            getMaxHolds,        // State
            // pawns
            canMove,            // State, Operations
            isInReach,          // State
            getSelected,        // State, (Commands)
            fieldHasSelected,   // Operations
            selectNext,         // Operations
            // turnCounter
            getTurnNumber,      // State
            // commands
            canUndo,            // State, Operations
            canRedo,            // State, Operations
            hold,               // Operations
            undo,               // Operations
            redo,               // Operations
            // players
            getPlayer,          // State, (Board, Pawns, Scores)
            getActivePlayer,    // (Scores)
            getActiveNumber,    // State
            getActiveColor,     // State
            // scores
            isPlaying,          // State
            getLastScoreString, // State
            getLastScoreType,   // State
            getLastScoreWinnerName, // State
            

        }
    );
};

export default GameMediatorNew;