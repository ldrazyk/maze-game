
const DisactivateCommand = function(spec) {
    let game, pawn, type;
    // type = 'move' or 'hold'

    const init = function() {
        ({game, pawn, type} = spec);
    }();

    const execute = function() {
        game.cleanAfterMove({pawn: pawn, type: type, undo: false});
    };

    const unexecute = function() {
        game.cleanAfterMove({pawn: pawn, type: type, undo: true});
    };

    return Object.freeze(
        {
            execute: execute,
            unexecute: unexecute,
        }
    );
};

export default DisactivateCommand;