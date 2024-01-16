const Game = function () {
    let notify, gameNumber;
    let players, board, pawns;
    let turnCounter, movesCounter, scores;
    let commands, killCommands;

    const placePawns = function (startZoneSize=1) {

        for (let n = 0; n < players.getAmount(); n += 1) {

            const playerNumber = n + 1;
            const pawnsIterator = pawns.getIterator({ playerNumber });
            board.placePawns({ playerNumber, pawnsIterator, startZoneSize });
        }
    };

    const init = function() {

        placePawns(2);
    };

    // questions

    const canStartTurn = function() {
        if ( !movesCounter.canMove() ) {
            return true;
        } else {
            return false;
        }
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
                if ( otherPawn && ( pawn.getPlayer() == otherPawn.getPlayer() || pawn.getKills() != otherPawn.getType() )) {
                    result = false;
                }

            } else if (field.getType() == 'exit' & pawn.getPlayer().getNumber() != field.getExitNumber()) {
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

    // game events

    const endGame = function(code) {
        
        scores.add(code);
        killCommands();
        pawns.reset();
        notify('endGame');
    };

    const updateReaches = function() {
        pawns.updateReaches();
    };

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

        const checkExitWin = function() {
            if (pawn.getPosition().getType() == 'exit') {
                endGame('exit');
            }
        };

        const maybeUpdateReaches = function() {
            if (type == 'move') {
                updateReaches();
            }
        };

        const selectNextAfterMove = function() {
            pawns.selectNext();
        };

        updateMovesCounter();
        updatePawnsOrder();
        disactivatePawn();
        checkExitWin();
        if (!scores.ended()) {
            maybeUpdateReaches();
            selectNextAfterMove();
        }
        notify(type);
    };

    const select = function (id) {
        const isSelected = pawns.select(id);
        if (isSelected) {
            notify('select');
        }
    };
    
    // UI

    const nextTurn = function() {

        const changeTurnNumber = function() {
            turnCounter.next();
        };

        const changeActivePlayer = function() {
            players.changeActive();
        };
    
        const changeActivePawns = function () {
            pawns.setActivePawns(players.getActive().getNumber());
        };

        const selectNextOrEndGame = function () {
            
            if (pawns.hasNext()) {
                pawns.selectNext();
                notify('nextTurn');
            } else {
                endGame('no_pawns');
            }
        };

        const resetMovesCounter = function() {
            movesCounter.reset(pawns.getActiveAmount());
        };

        const resetCommandsHistory = function() {
            commands.resetHistory();
        };

        if (canStartTurn()) {

            changeTurnNumber();
            changeActivePlayer();
            changeActivePawns();
            updateReaches();
            selectNextOrEndGame();
            resetMovesCounter();
            resetCommandsHistory();  
        } else {
            console.log("Can't end turn! You still have active pawns!");
        }
    };

    const selectNext = function() {
        const isSelected = pawns.selectNext();
        if (isSelected) {
            notify('select');
        }
    };

    const hold = function () {
        
        if (movesCounter.canHold()) {
            commands.hold();
        } else {
            console.log("Can't hold this many pawns!");
        }
    };

    const moveToPosition = function (position) {

        commands.move(position)
    };

    const moveInDirection = function (direction) {

        const position = pawns.getSelected().getReach(direction);
        if (position) {
            commands.move(position);
        }
    };

    const click = function (fieldId) {
        
        const clickedField = board.getField({id: fieldId});
        const clickedPawn = clickedField.getPawn();
        const selectedPawn = pawns.getSelected();
        
        const tryMove = function() {
            
            if (selectedPawn.isInReach(clickedField)) {
                moveToPosition(clickedField);
            }
        };

        const trySelect = function() {

            if (clickedPawn && clickedPawn.isActive()) {
                select(clickedPawn.getId());
            } else {
                tryMove();
            }
        };

        const tryHold = function () {

            if (clickedPawn === selectedPawn) {
                hold();
            } else {
                trySelect();
            }
        };

        if (selectedPawn) tryHold();
    };

    const undo = function () {
        commands.undo();
    };

    const redo = function () {
        commands.redo();
    };

    const moveUp = function () {
        moveInDirection('up');
    };

    const moveDown = function () {
        moveInDirection('down');
    };

    const moveLeft = function () {
        moveInDirection('left');
    };

    const moveRight = function () {
        moveInDirection('right');
    };

    // setters

    const setNotify = function (notifyFunction) {
        notify = notifyFunction;
    };

    const setNumber = function (newNumber) {
        gameNumber = newNumber;
    };

    const setPlayers = function (colleague) {
        players = colleague;
    };

    const setBoard = function (colleague) {
        board = colleague;
    };

    const setPawns = function (colleague) {
        pawns = colleague;
    };

    const setTurnCounter = function (colleague) {
        turnCounter = colleague;
    };

    const setMovesCounter = function (colleague) {
        movesCounter = colleague;
    };

    const setScores = function (colleague) {
        scores = colleague;
    };

    const setCommands = function(colleague) {
        commands = colleague;
    };

    const setKillCommands = function(killCommandsFunction) {
        killCommands = killCommandsFunction;
    };

    // get

    const getPlayer = function(number) {
        return players.getPlayer(number);
    };

    const getActivePlayer = function(active=true) {
        return players.getActive(active);
    };

    // get pawns

    const getSelected = function() {
        return pawns.getSelected();
    };

    const getPawn = function (id) {
        return pawns.getPawn(id);
    };

    const getPawnsIterator = function(spec) {
        return pawns.getIterator(spec);
    };

    // get board

    const getField = function (spec) {
        return board.getField(spec);
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

    // get game

    const getNumber = function() {
        return gameNumber;
    };

    const getTurnNumber = function () {
        return turnCounter.getTurn();
    };
     
    const getScore = function() {
        return scores.getLast();
    };
    

    return Object.freeze(
        {
            init: init,

            isMoveLegal: isMoveLegal,
            movePawn: movePawn,
            cleanAfterMove: cleanAfterMove,

            // UI
            nextTurn: nextTurn,
            selectNext: selectNext,
            click: click,
            undo: undo,
            redo: redo,
            hold: hold,
            moveUp: moveUp,
            moveDown: moveDown,
            moveLeft: moveLeft,
            moveRight: moveRight,

            setNotify: setNotify,
            setNumber: setNumber,
            setPlayers: setPlayers,
            setBoard: setBoard,
            setPawns: setPawns,
            setTurnCounter: setTurnCounter,
            setMovesCounter: setMovesCounter,
            setScores: setScores,
            setCommands: setCommands,
            setKillCommands: setKillCommands,
            
            getPlayer: getPlayer,
            getActivePlayer: getActivePlayer, 
            getSelected: getSelected,
            getPawn: getPawn,
            getPawnsIterator: getPawnsIterator,
            getField: getField,
            getBoardIterator: getBoardIterator,
            getBoardName: getBoardName,
            getBoardRows: getBoardRows,
            getBoardColumns: getBoardColumns,
            getNumber: getNumber,
            getTurnNumber: getTurnNumber,
            getScore: getScore,
        }
    );
};

export default Game;