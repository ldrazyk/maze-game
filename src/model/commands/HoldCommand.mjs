import DisactivateCommand from "./DisactivateCommand.mjs";

const HoldCommand = function(spec) {
    let game, pawn, disactivateCommand;

    const init = function() {
        ({pawn, game} = spec);
        disactivateCommand = DisactivateCommand({game: game, pawn: pawn, type: 'hold'});
    }();

    const execute = function() {
        disactivateCommand.execute();
    };

    const unexecute = function() {
        disactivateCommand.unexecute();
    };

    const toString = function() {
        let string = `HoldCommand ={pawn: ${pawn.toString()}, position: ${pawn.getPosition().toString()} }`;
        return string;
    };

    return Object.freeze(
        {
            execute: execute,
            unexecute: unexecute,

            toString: toString,
        }
    );
};

export default HoldCommand;