const GameOperator = function () {

    // makes decisions and notifies

    let game, notify, disableInput;

    const setComponents = function (components) {
    
        game = components.gameOperationsInterface;
    };

    const setNotify = function (notifyFunction) {

        notify = notifyFunction;
    };

    const setDisableInput = function (command) {
    
        disableInput = command;
    };

    const placePawns = function (startZoneSize=1) {

        game.placePawns(startZoneSize);

    };

    const endGame = function (type, winnerNumber=false) {
    
        game.endGame(type, winnerNumber);
        disableInput();
        notify('endGame');
    };

    const checkCapturedFlag = function () {
    
        if (game.isFlagCaptured()) {

            endGame('flag');
        }
    };

    const selectNext = function () {

        if (game.canSelectNext()) {

            game.selectNext();
            notify('select');
            return true;

        } else {
            console.log("Can't select next pawn.");
            return false;
        }
    };
    

    const moveInDirection = function (direction) {
        
        if (game.canMoveInDirection(direction)) {

            game.moveInDirection(direction);
            notify('move');

            checkCapturedFlag();

        } else {
            console.log(`Can't move selected pawn in ${direction} direction.`);
        }
    };

    const hold = function () {

        if (game.canHold()) {

            game.hold();
            notify('hold');

        } else {
            console.log(`Can't hold selected pawn.`);
        }
    };

    const undo = function () {
    
        if (game.canUndo()) {

            const type = game.undo();
            notify(type);

        } else {
            console.log("Can't undo move.");
        }
    };

    const redo = function () {
    
        if (game.canRedo()) {

            const type = game.redo();
            notify(type);

        } else {
            console.log("Can't redo move.");
        }
    };

    const nextTurn = function () {

        if (game.canEndTurn()) {

            game.nextTurn();
            notify('nextTurn'); // todo - in view no selection update

            if (!game.hasMoves()) {

                endGame('no_pawns');
            } else {

                game.selectNext();
                notify('select');
            }

        } else {
            console.log("Can't end turn.")
        }
    };

    const click = function (id) {

        if (game.fieldHasSelected(id)) {
            
            hold();

        } else if (game.fieldHasActive(id)) {

            game.selectOnField(id);
            notify('select');

        } else if (game.fieldIsInReach(id)) {

            game.moveToField(id);
            notify('move');

            checkCapturedFlag();
        }
    };
    
    
    return Object.freeze(
        {
            setComponents,
            setNotify,
            setDisableInput,
            // game init
            placePawns,
            // UI
            endGame,
            selectNext,
            moveInDirection,
            hold,
            undo,
            redo,
            nextTurn,
            click,
        }
    );
};

export default GameOperator;