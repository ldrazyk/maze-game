
const DisactivateCommand = function({ game, pawn, type }) {
    // type = 'move' or 'hold'

    const execute = function() {
        game.cleanAfterMove({pawn, type, undo: false});
    };

    const unexecute = function() {
        game.cleanAfterMove({pawn, type, undo: true});
    };

    return Object.freeze(
        {
            execute: execute,
            unexecute: unexecute,
        }
    );
};

export default DisactivateCommand;