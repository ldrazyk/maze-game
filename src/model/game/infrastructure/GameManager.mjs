const GameManager = function () {
    
    let game;

    const setComponents = function (components) {

        game = components.gameMediator;
    };

    const fieldIsInSelectedReach = function (id) {
    
        const selected = game.getSelected();
        const field = game.getField({id});

        return selected.hasInReach(field);
    };

    const managePlace = function ({ pawn, position }) {
    
        pawn.move(position);
        position.take(pawn);
    };

    const manageMove = function({ pawn, position }) {

        pawn.getPosition().free();

        managePlace({ pawn, position });
    };

    const managePlacePawns = function () {
    
        for (let n = 0; n < game.getPlayersAmount(); n += 1) {

            const playerNumber = n + 1;
            const pawnsIterator = game.getPawnsIterator({ playerNumber });
            game.placePawnsOnBoard({ playerNumber, pawnsIterator });
        }
    };

    const selectOnField = function (id) {
    
        const pawn = game.getPawnOnField(id);
        game.selectPawn(pawn.getId());
    };

    const moveInDirection = function (direction) {
    
        const field = game.getSelected().getReach(direction);
        game.move(field);
    };

    const moveToField = function (id) {
    
        const field = game.getField({id});
        game.move(field);
    };

    const nextTurn = function () {

        const updatePawns = function () {
        
            game.setActivePawns(game.getActivePlayerNumber());
            game.updateReaches();
        };

        const updateMoves = function () {
        
            game.resetMovesAmount(game.getActivePawnsAmount());
            game.resetCommandsHistory();
        };

        game.updateTurnNumber();
        game.changeActivePlayer();
        updatePawns();
        updateMoves();
    };

    const endGame = function(type, winnerNumber=false) {

        game.addScore(type, winnerNumber);
        game.resetPawns();
    };

    const cleanAfterMove = function({ pawn, type, undo }) {

        const updateMovesCounter = function() {

            if (!undo) {
                game.addMoveToCounter(type);
            } else {
                game.removeMoveFromCounter(type);
            }
        };

        const updatePawnOrder = function() {

            pawn.setOrder(game.getMovesMade());
        };

        const disactivatePawn = function() {

            pawn.setActive(undo);
        };

        const setFlagCaptured = function () {
        
            if (pawn.getPosition().getType() == 'exit') {

                game.setFlagCaptured();
            }
        };
        
        const updateReaches = function() {

            if (type == 'move') {

                game.updateReaches();
            }
        };

        updateMovesCounter();
        updatePawnOrder();
        disactivatePawn();
        setFlagCaptured();
        updateReaches();
        game.selectNext();
    };

    const isMoveLegal = function ({ pawnSpec, fieldSpec }) {

        const getPawnFromSpec = function () {

            let { pawn, pawnId } = pawnSpec;

            if (!pawn) {
                pawn = game.getPawn(pawnId);
            }
            return pawn;
        };

        const getFieldFromSpec = function () {

            let { id, x, y, field, direction } = fieldSpec;

            let resultField;

            if (id || x || direction) {
                resultField = game.getField(fieldSpec);
            } else {
                resultField = field;
            }

            return resultField;
        };

        const couldPawnMoveToField = function (pawn, field) {

            const fieldIsPath = function () {
            
                return field.getType() == 'path';
            };

            const fieldHasUnkillablePawn = function () {

                const cantKillOtherPawn = function (otherPawn) {
            
                    return pawn.getPlayerNumber() == otherPawn.getPlayerNumber() || pawn.getKills() != otherPawn.getType();
                };

                const otherPawn = field.getPawn();

                if (otherPawn && cantKillOtherPawn(otherPawn)) {
                    return true;
                } else {
                    return false;
                }
            };

            const fieldIsOpponentsFlag = function () {
            
                return field.getType() == 'exit' & pawn.getPlayerNumber() != field.getExitNumber();
            };

            if (fieldIsPath()) {

                if (fieldHasUnkillablePawn()) {
                    return false;
                } else {
                    return true;
                }
            } else if (fieldIsOpponentsFlag()) {
                return true;
            } else {
                return false;
            }
        };
        
        const pawn = getPawnFromSpec();
        const field = getFieldFromSpec();

        if (field && couldPawnMoveToField(pawn, field)) {
            return field;
        } else { 
            return false; 
        }
    };
    
    return Object.freeze(
        {
            setComponents,

            fieldIsInSelectedReach,
            managePlace,
            manageMove,
            managePlacePawns,
            selectOnField,
            moveInDirection,
            moveToField,
            nextTurn,
            endGame,
            cleanAfterMove,
            isMoveLegal,
        }
    );
};

export default GameManager;