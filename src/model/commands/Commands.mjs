import MoveCommand from "./MoveCommand.mjs";
import HoldCommand from "./HoldCommand.mjs";

const Commands = function(game) {
    let position, history;

    const resetHistory = function() {
        history = [];
        position = 0;
    };

    const init = function() {
        resetHistory();
    }();

    // history

    const execute = function (command) {
        command.execute()
        if (position < history.length) {
            history = history.slice(0, position);
        }
        history.push(command);
        position += 1;
    };

    const undo = function () {
        console.log(`>>>commands.undo() history[${position}->${position - 1}]`);
        if (position > 0) {
            history[position - 1].unexecute();
            position -= 1;
        }
    };

    const redo = function () {
        console.log(`>>>commands.redo() history[${position}->${position + 1}]`);
        if (position < history.length) {
            history[position].execute();
            position += 1;
        }
    };

    // commnads factory

    const createMoveCommand = function (spec) {
        let selected, reach, positionId, direction, position, command;
        ({positionId, direction} = spec);
        command = false;
        selected = game.getSelected();
        if (selected) {
            reach = selected.getReach();
            if (direction) {
                position = reach[direction];
            } else if (positionId) {
                const unchecked = game.getField({id: positionId});
                for (const field of Object.values(reach)) {
                    if (field == unchecked) {
                        position = unchecked;
                        break;
                    }
                }
            }
        }
        
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

    const placePawns = function() {
        game.placePawns();      
    };

    const nextTurn = function() {
        if (game.canStartTurn()) {
            resetHistory();
            game.nextTurn();
        } else {
            console.log("Can't end turn! You still have active pawns!");
        }
    };

    const select = function (id) {
        game.select(id);
    };

    const selectNext = function() {
        game.selectNext();
    };

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

    const click = function (fieldId) {
        
        const selected = game.getSelected();

        const maybeMove = function() {
            const iterator = selected.getReachIterator();
            while (iterator.hasNext()) {
                const field = iterator.next();
                if (field && field.getId() == fieldId) {
                    move(fieldId);
                    break;
                }
            }
        };

        const maybeSelect = function() {
            const pawn = game.getField({id: fieldId}).getPawn();
            if (pawn && pawn.isActive()) {
                select(pawn.getId());
            } else {
                maybeMove();
            }
        };

        const maybeHold = function() {
            if (fieldId == selected.getPosition().getId()) {
                hold();
            } else {
                maybeSelect();
            }
        };

        if (selected) maybeHold();
    };

    return Object.freeze(
        {
            undo: undo,
            redo: redo,

            placePawns: placePawns,
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

export default Commands;
