import DisactivateCommand from "./DisactivateCommand.mjs";
import KillCommand from "./KillCommand.mjs";

const MoveCommand = function({ pawn, position, game }) {
    let oldPosition, killCommand, disactivateCommand;

    const init = function() {
        
        oldPosition = pawn.getPosition();
        killCommand = KillCommand(position);
        disactivateCommand = DisactivateCommand({game: game, pawn: pawn, type: 'move'});
    }();

    const execute = function() {
        killCommand.execute();  // if no pawn nothing happens
        game.movePawn({pawn: pawn, position: position});
        disactivateCommand.execute();
    };

    const unexecute = function() {
        game.movePawn({pawn: pawn, position: oldPosition});
        killCommand.unexecute();
        disactivateCommand.unexecute();
    };

    const toString = function() {
        let string = `MoveCommand ={pawn: ${pawn.toString()}, position: ${position.toString()} }`;
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

export default MoveCommand;