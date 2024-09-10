const GameOperationsFacade = function () {

    let players, scores;
    let board, pawns;
    let turnCounter, movesCounter, commands;


    const setComponents = function (components) {
    
        ({ players, scores, board, pawns, turnCounter, movesCounter, commands } = components);
    };

    
    // State Interface

    const canSelectNext = function () {
    
        return movesCounter.canSelectNext();
    };

    const canMoveInDirection = function (direction) {
    
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

    const canEndTurn = function () {
    
        return !movesCounter.canMove();
    };

    const fieldHasSelected = function (fieldId) {
    
        return pawns.getSelectedPositionId() == fieldId;
    };

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

    // Operations Interface

    const placePawns = function (startZoneSize) {
    
        for (let n = 0; n < players.getAmount(); n += 1) {

            const playerNumber = n + 1;
            const pawnsIterator = pawns.getIterator({ playerNumber });
            board.placePawns({ playerNumber, pawnsIterator, startZoneSize });
        }
    };

    const selectNext = function () {
    
        pawns.selectNext();
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

    const hold = function () {
    
        commands.hold();
    };

    const undo = function () {
    
        return commands.undo(); // TODO type
    };

    const redo = function () {
    
        return commands.redo(); // TODO type
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

    
    return Object.freeze(
        {
            setComponents,

            // State Interface

            canSelectNext,
            canMoveInDirection,
            canHold,
            canUndo,
            canRedo,
            canEndTurn,
            fieldHasSelected,
            fieldHasActive,
            fieldIsInReach,

            // Operations Interface

            placePawns,
            selectNext,
            selectOnField,
            moveInDirection,
            moveToField,
            hold,
            undo,
            redo,
            nextTurn,
            endGame,

        }
    );
};

export default GameOperationsFacade;