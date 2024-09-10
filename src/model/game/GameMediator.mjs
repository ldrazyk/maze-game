const GameMediator = function () {
    
    let gameNumber;
    let gameState, gameOperator, emptyGameOperator;
    let players, board, pawns;
    let turnCounter, movesCounter, scores;
    let commands;


    // Players

    const getPlayersAmount = function () {
    
        return players.getAmount();
    };

    const changeActivePlayer = function() {

        players.changeActive();
    };

    const getActivePlayerNumber = function () {
    
        return players.getActive().getNumber(); // TODO
    };

    // Board

    const placePawns = function (spec) {

        board.placePawns(spec);
    };

    const getField = function (spec) {
    
        return board.getField(spec);
    };


    // Pawns

    const getPawnsIterator = function (spec) {
    
        return pawns.getIterator(spec);
    };

    const updateReaches = function() {

        pawns.updateReaches();
    };

    const select = function (id) {

        return pawns.select(id);
    };

    const resetPawns = function () {
    
        pawns.reset();
    };

    const setActivePawns = function (number) {

        pawns.setActivePawns(number);
    };

    const getActivePawnsAmount = function () {
    
        return pawns.getActiveAmount();
    };

    const selectNext = function () {
    
        pawns.selectNext();
    };

    const getSelectedReach = function (direction) {
    
        return pawns.getSelected().getReach(direction); // TODO
    };

    const getSelected = function () {
    
        return pawns.getSelected();
    };

    // turnCounter

    const changeTurnCounter = function () {
    
        turnCounter.next();
    };

    // movesCounter


    const hasMove = function() {
        
        return movesCounter.canMove();  // TODO
    };

    const resetMovesCounter = function(pawnsAmount) {

        movesCounter.reset(pawnsAmount);
    };

    const canHold = function () {
    
        return movesCounter.canHold();
    };

    // scores

    const addScore = function () {
    
        scores.add(type, winnerNumber);
    };


    // commands


    const moveToPosition = function (position) {

        commands.move(position);
    };

    const resetCommandsHistory = function() {

        commands.resetHistory();
    };

    const hold = function () {
    
        commands.hold();
    };

    const undo = function () {

        commands.undo();
    };

    const redo = function () {

        commands.redo();
    };

    // mediator interface

    const movePawn = function({ pawn, position }) {

        const oldPosition = pawn.getPosition();
        if (oldPosition) {
            oldPosition.free();
        }
        pawn.move(position);
        position.take(pawn);
    };

    const cleanAfterMove = function({ pawn, type, undo }) {

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
                updateReaches();
            }
        };
        
        const selectNextAfterMove = function() {
            pawns.selectNext();
        };

        const checkExitWin = function() {
            if (pawn.getPosition().getType() == 'exit') {
                endGame('exit');
            }
        };

        updateMovesCounter();
        updatePawnsOrder();
        disactivatePawn();
        
        maybeUpdateReaches();
        selectNextAfterMove();
        
        notify(type);
        
        checkExitWin();
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

    const getPlayer = function(number) {
        return players.getPlayer(number);
    };
    
    const getActivePlayer = function(active=true) {
        return players.getActive(active);
    };
    
    const getNumber = function() {
        return gameNumber;
    };
    
    // getters for model
    
    const getGameState = function () {
        return gameState;
    };
    
    const getGameOperator = function () {
        return gameOperator;
    };
    
    // mediator setters

    const setNotify = function (notifyFunction) {
        notify = notifyFunction;
    };

    const setNumber = function (newNumber) {
        gameNumber = newNumber;
    };

    const setGameInterfaces = function (interfaces) {
    
        [
            gameState,
            gameOperator,
            emptyGameOperator
        ] = interfaces;
    };

    const setGameComponents = function (components) {

        [
            players,
            board,
            pawns,
            turnCounter,
            movesCounter,
            scores,
            commands
        ] = components;
    
    };
    
    return Object.freeze(
        {
            
        }
    );
};

export default GameMediator;