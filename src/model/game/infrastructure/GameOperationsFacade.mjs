const GameOperationsFacade = function () {

    let game;


    const setComponents = function (components) {
    
        game = components.gameMediator;
    };

    
    // State Interface

    const canSelectNext = function () {
    
        return game.canSelectNext();
    };

    const hasMoves = function () {
    
        return game.hasMoves();
    };

    const canMoveInDirection = function (direction) {
    
        return game.canMove(direction);
    };

    const canHold = function () {
    
        return game.canHold();
    };

    const canUndo = function () {
    
        return game.canUndo();
    };

    const canRedo = function () {
    
        return game.canRedo();
    };

    const canEndTurn = function () {
    
        return game.canEndTurn();
    };

    const fieldHasSelected = function (fieldId) {
    
        return game.fieldHasSelected(fieldId);
    };

    const fieldHasActive = function (id) {
    
        return game.fieldHasActive(id);
    };

    const fieldIsInReach = function (id) {
    
        return game.fieldIsInReach(id);
    };

    const isFlagCaptured = function () {
    
        return game.isFlagCaptured();
    };

    // Operations Interface

    const placePawns = function (startZoneSize) {
    
        game.placePawns(startZoneSize);
    };

    const selectNext = function () {
    
        game.selectNext();
    };

    const selectOnField = function (id) {
    
        game.selectOnField(id);
    };

    const moveInDirection = function (direction) {
    
        game.moveInDirection(direction);
    };

    const moveToField = function (id) {
    
        game.moveToField(id);
    };

    const hold = function () {
    
        game.hold();
    };

    const undo = function () {
    
        return game.undo();
    };

    const redo = function () {
    
        return game.redo();
    };
    
    const nextTurn = function () {
    
        game.nextTurn();
    };

    const endGame = function(type, winnerNumber=false) {

        game.endGame(type, winnerNumber);
    };

    
    return Object.freeze(
        {
            setComponents,

            // State Interface

            canSelectNext,
            hasMoves,
            canMoveInDirection,
            canHold,
            canUndo,
            canRedo,
            canEndTurn,
            fieldHasSelected,
            fieldHasActive,
            fieldIsInReach,
            isFlagCaptured,

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