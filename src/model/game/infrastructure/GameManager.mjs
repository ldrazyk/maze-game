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

    const managePlacePawns = function (startZoneSize) {
    
        for (let n = 0; n < game.getPlayersAmount(); n += 1) {

            const playerNumber = n + 1;
            const pawnsIterator = game.getPawnsIterator({ playerNumber });
            game.placePawnsOnBoard({ playerNumber, pawnsIterator, startZoneSize });
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
        }
    );
};

export default GameManager;