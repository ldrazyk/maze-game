import DisactivateCommand from "./DisactivateCommand.mjs";

const HoldCommand = function({ pawn, game }) {

    const type = 'hold';
    let disactivateCommand;

    const init = function() {
        
        disactivateCommand = DisactivateCommand({game, pawn, type: 'hold'});
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

export default HoldCommand;