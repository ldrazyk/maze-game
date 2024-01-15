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

    const setGame = function (mediator) {
        game = mediator;
    };

    // history

    const resetHistory = function() {
        commandsHistory.reset();
    };

    const execute = function (command) {
        commandsHistory.execute(command);
    };

    const undo = function () {
        commandsHistory.undo();
    };

    const redo = function () {
        commandsHistory.redo();
    };

    const createMoveCommand = function ({ positionId=false, direction=false }) {
        // if positionId: checks if field is in reach
        // if direction: reach[direction] can be Field or false
        let command = false;
        
        const selected = game.getSelected();

        const getPosition = function () {
            
            let position = false;

            if (selected) {
                const reach = selected.getReach();

                if (direction) {
                    position = reach[direction]; // reach should be object ?
                } else if (positionId) {
                    const field = game.getField({id: positionId});
                    if (Object.values(reach).includes(field)) { // game should have method inReach({ id, field? })
                        position = field;
                    }
                }
            }

            return position;
        };

        const position = getPosition();

        if (position) {
            command = MoveCommand({pawn: selected, position: position, game: game});
        }

        return command;
    };

    const createHoldCommand = function() {
        let command = false;
        
        if (game.canHold()) {
            command = HoldCommand({game: game, pawn: game.getSelected()});
        } else {
            console.log("Can't hold this many pawns!");
        }
        return command;
    };

    // game interface

    const hold = function () {
        const command = createHoldCommand();
        if (command) {
            execute(command);
        }
    };

    const move = function (id) {
        const command = createMoveCommand({positionId: id});
        if (command) {
            execute(command);
        }
    };

    const moveUp = function () {
        const command = createMoveCommand({direction: 'up'});
        if (command) {
            execute(command);
        }
    };

    const moveDown = function () {
        const command = createMoveCommand({direction: 'down'});
        if (command) {
            execute(command);
        }
    };

    const moveLeft = function () {
        const command = createMoveCommand({direction: 'left'});
        if (command) {
            execute(command);
        }
    };

    const moveRight = function () {
        const command = createMoveCommand({direction: 'right'});
        if (command) {
            execute(command);
        }
    };

    return Object.freeze(
        {
            setGame: setGame,

            resetHistory: resetHistory,
            undo: undo,
            redo: redo,

            hold: hold,
            move: move,
            moveUp: moveUp,
            moveDown: moveDown,
            moveLeft: moveLeft,
            moveRight: moveRight,
        }
    );
};

export default Commands;
