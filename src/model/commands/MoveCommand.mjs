import DisactivateCommand from "./DisactivateCommand.mjs";
import KillCommand from "./KillCommand.mjs";

const MoveCommand = function({ pawn, position, game }) {

    const type = 'move';
    let oldPosition, killCommand, disactivateCommand;

    const init = function() {
        
        oldPosition = pawn.getPosition();
        killCommand = KillCommand(position);
        disactivateCommand = DisactivateCommand({game, pawn, type: 'move'});
    }();

    const execute = function() {

        killCommand.execute();  // if no pawn nothing happens
        game.manageMove({pawn, position});
        disactivateCommand.execute();
    };

    const unexecute = function() {

        game.manageMove({pawn, position: oldPosition});
        killCommand.unexecute();
        disactivateCommand.unexecute();
    };

    const toString = function() {
        let string = `MoveCommand ={pawn: ${pawn.toString()}, position: ${position.toString()} }`;
        return string;
    };

    const getType = function () {
    
        return type;
    };

    return Object.freeze(
        {
            execute,
            unexecute,

            toString,
            getType,
        }
    );
};

export default MoveCommand;