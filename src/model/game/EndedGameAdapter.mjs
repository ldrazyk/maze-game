const EndedGameAdapter = function (game) {

    const getGame = function () {
        return game;
    };


    const logKilledCommand = function () {
        console.log("Can't execute! Game has ended!");
    };

    const nextTurn = function() {
        logKilledCommand();
    };

    const selectNext = function () {
        logKilledCommand();
    };

    const click = function (fieldId) {
        logKilledCommand();
    };

    const undo = function () {
        logKilledCommand();
    };

    const redo = function () {
        logKilledCommand();
    };

    const hold = function () {
        logKilledCommand();
    };

    const moveUp = function () {
        logKilledCommand();
    };

    const moveDown = function () {
        logKilledCommand();
    };

    const moveLeft = function () {
        logKilledCommand();
    };

    const moveRight = function () {
        logKilledCommand();
    };


    const getBoardIterator = function() {
        return game.getBoardIterator();
    };

    const getBoardName = function() {
        return game.getBoardName();
    };

    const getBoardRows = function() {
        return game.getBoardRows();
    };

    const getBoardColumns = function() {
        return game.getBoardColumns();
    };

    const getPawnsIterator = function(spec) {
        return game.getPawnsIterator(spec);
    };

    const getSelected = function() {
        return game.getSelected();
    };

    const getGameNumber = function() {
        return game.getNumber();
    };

    const getTurnNumber = function() {
        return game.getTurnNumber();
    };

    const getScore = function() {
        return game.getScore();
    };

    return Object.freeze(
        {
            getGame: getGame,

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

            getBoardIterator: getBoardIterator,
            getBoardName: getBoardName,
            getBoardRows: getBoardRows,
            getBoardColumns: getBoardColumns,
            getPawnsIterator: getPawnsIterator,
            getSelected: getSelected,
            getGameNumber: getGameNumber,
            getTurnNumber: getTurnNumber,
            getScore: getScore,
        }
    );
};

export default EndedGameAdapter;