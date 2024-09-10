const GameOperator2 = function () {
    
    let notify, turnOffGameOperations;
    let game;

    const setMediator = function (mediator) {
    
        game = mediator;
    };

    const placePawns = function (startZoneSize=1) {

        for (let n = 0; n < game.getPlayersAmount(); n += 1) {

            const playerNumber = n + 1;
            const pawnsIterator = game.getPawnsIterator({ playerNumber });

            game.placePawns({ playerNumber, pawnsIterator, startZoneSize });
        }
    };

    const select = function (id) {

        if ( game.select(id) ) {

            notify('select');
        }
    };

    const endGame = function(type, winnerNumber=false) {

        game.addScore(type, winnerNumber);
        game.resetPawns();
        turnOffGameOperations();
        notify('endGame');
    };
    
    const nextTurn = function() {


        const canStartTurn = function() {
        
            return !game.hasMove();
        };
        
        const selectNextOrEndGame = function () {
            
            if (game.hasMove()) {
                game.selectNext();
                notify('nextTurn');
            } else {
                endGame('no_pawns');
            }
        };


        if (canStartTurn()) {

            game.changeTurnNumber();
            game.changeActivePlayer();
            game.setActivePawns(game.getActivePlayerNumber());
            game.updateReaches();
            game.resetMovesCounter(game.getActivePawnsAmount())
            game.resetCommandsHistory();
            selectNextOrEndGame();

        } else {
            console.log("Can't end turn! You still have active pawns!");
        }
    };

    const selectNext = function() {

        if (game.selectNext()) {

            notify('select');
        }
    };

    const hold = function () {
        
        if (game.canHold()) {

            game.hold();

        } else {

            console.log("Can't hold this many pawns!");
        }
    };

    const moveInDirection = function (direction) {
        
        const position = game.getSelectedReach(direction);

        if (position) {

            game.moveToPosition(position);
        }
    };

    const click = function (fieldId) {
        
        const clickedField = game.getField({id: fieldId});
        const clickedPawn = clickedField.getPawn();
        const selectedPawn = game.getSelected();
        
        const tryMove = function() {
            
            if (selectedPawn.hasInReach(clickedField)) {

                game.moveToPosition(clickedField);
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

        game.undo();
    };

    const redo = function () {

        game.redo();
    };

    

    
    return Object.freeze(
        {
            setMediator,
            // operations
            placePawns,
            select,
            endGame,
            nextTurn,
            selectNext,
            hold,
            moveInDirection,
            click,
            undo,
            redo,
        }
    );
};

export default GameOperator2;