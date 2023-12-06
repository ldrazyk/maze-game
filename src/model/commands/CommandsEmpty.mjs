const CommandsEmpty = function() {

    const emptyCommand = function() {
        console.log('>>> commands: Game is over!');
    };

    const undo = function() {
        emptyCommand();
    };

    const redo = function() {
        emptyCommand();
    };

    const nextTurn = function() {
        emptyCommand();
    };

    const select = function() {
        emptyCommand();
    };

    const selectNext = function() {
        emptyCommand();
    };

    const hold = function() {
        emptyCommand();
    };

    const move = function() {
        emptyCommand();
    };

    const moveUp = function() {
        emptyCommand();
    };

    const moveDown = function() {
        emptyCommand();
    };

    const moveLeft = function() {
        emptyCommand();
    };

    const moveRight = function() {
        emptyCommand();
    };

    const click = function() {
        emptyCommand();
    };

    return Object.freeze(
        {
            undo: undo,
            redo: redo,

            nextTurn: nextTurn,
            select: select,
            selectNext: selectNext,
            hold: hold,
            move: move,
            moveUp: moveUp,
            moveDown: moveDown,
            moveLeft: moveLeft,
            moveRight: moveRight,
            click: click,
        }
    );
};

export default CommandsEmpty;