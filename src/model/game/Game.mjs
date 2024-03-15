const Game = function () {
    let notify, gameNumber;
    let gameState, gameOperator, emptyGameOperator;
    let players, board, pawns;
    let turnCounter, movesCounter, scores;
    let commands;

    const placePawns = function (startZoneSize=1) {

        for (let n = 0; n < players.getAmount(); n += 1) {

            const playerNumber = n + 1;
            const pawnsIterator = pawns.getIterator({ playerNumber });
            board.placePawns({ playerNumber, pawnsIterator, startZoneSize });
        }
    };

    const init = function() {

        console.log('Game nr ' + gameNumber + ' created.');
        placePawns(2);
    };

    // PRIVATE & PUBLIC

    const canStartTurn = function() {
        
        return !movesCounter.canMove();
    };

    // PRIVATE

    const endGame = function(code) {
        
        scores.add(code);
        pawns.reset();
        gameOperator = emptyGameOperator;
        notify('endGame');
    };

    const updateReaches = function() {
        pawns.updateReaches();
    };

    const select = function (id) {
        const isSelected = pawns.select(id);
        if (isSelected) {
            notify('select');
        }
    };

    const moveToPosition = function (position) {

        commands.move(position)
    };

    // PUBLIC

    // for operator

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

        const resetMovesCounter = function() {
            movesCounter.reset(pawns.getActiveAmount());
        };

        const resetCommandsHistory = function() {
            commands.resetHistory();
        };

        const selectNextOrEndGame = function () {
            
            if (pawns.hasNext()) {
                pawns.selectNext();
                notify('nextTurn');
            } else {
                endGame('no_pawns');
            }
        };


        if (canStartTurn()) {

            changeTurnNumber();
            changeActivePlayer();
            changeActivePawns();
            updateReaches();
            resetMovesCounter();
            resetCommandsHistory();  
            selectNextOrEndGame();
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
    
    const getSelected = function() {
        return pawns.getSelected();
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

    const setGameState = function (colleague) {
        gameState = colleague;
    };

    const setGameOperator = function (colleague) {
        gameOperator = colleague;
    };

    const setEmptyGameOperator = function (colleague) {
        emptyGameOperator = colleague;
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

    return Object.freeze(
        {
            init: init,

            // used in GameOperator
            nextTurn: nextTurn,
            selectNext: selectNext,
            hold: hold,
            moveInDirection: moveInDirection,
            click: click,
            undo: undo,
            redo: redo,

            // mediator interface
            canStartTurn: canStartTurn, // used privately and in GameState
            movePawn: movePawn, // used in Board, MoveCommand
            cleanAfterMove: cleanAfterMove, // used in DisactivateCommand
            isMoveLegal: isMoveLegal,   // used in Pawn
            getPlayer: getPlayer, // used in Board, Pawns
            getActivePlayer: getActivePlayer,   // used in Scores
            getSelected: getSelected,   // used in Commands
            getNumber: getNumber,   // used in Scores
            
            // getters for model
            getGameState: getGameState, // used in Model
            getGameOperator: getGameOperator,   // used in Model

            // mediator setters
            setNotify: setNotify,
            setNumber: setNumber,
            setGameState: setGameState,
            setGameOperator: setGameOperator,
            setEmptyGameOperator: setEmptyGameOperator,
            setPlayers: setPlayers,
            setBoard: setBoard,
            setPawns: setPawns,
            setTurnCounter: setTurnCounter,
            setMovesCounter: setMovesCounter,
            setScores: setScores,
            setCommands: setCommands,
        }
    );
};

export default Game;