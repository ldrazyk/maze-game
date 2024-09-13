import CommandsHistory from "./CommandsHistory.mjs";
import MoveCommand from "./MoveCommand.mjs";
import HoldCommand from "./HoldCommand.mjs";

const Commands = function() {
    let commandsHistory;
    let game;

    const createHistory = function () {

        commandsHistory = CommandsHistory();
    };

    const init = function() {

        createHistory();
    }();

    const setComponents = function (components) {

        game = components.gameMediator;
    };

    
    const resetHistory = function() {

        commandsHistory.reset();
    };

    const execute = function (command) {

        commandsHistory.execute(command);
    };

    const undo = function () {

        return commandsHistory.undo();
    };

    const redo = function () {
        
        return commandsHistory.redo();
    };

    const hold = function () {

        const command = HoldCommand({ pawn: game.getSelected(), game: game });
        execute(command);
    };

    const move = function (field) {

        const command = MoveCommand({ pawn: game.getSelected(), position: field, game: game });
        execute(command);
    };

    const canUndo = function () {

        return commandsHistory.canUndo();        
    };

    const canRedo = function () {

        return commandsHistory.canRedo();        
    };

    return Object.freeze(
        {
            setComponents,
            resetHistory,
            undo,
            redo,
            hold,
            move,
            canUndo,
            canRedo,
        }
    );
};

export default Commands;
