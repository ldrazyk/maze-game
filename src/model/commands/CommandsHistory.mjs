const CommandsHistory = function () {
    let position, history;

    const resetHistory = function() {
        history = [];
        position = 0;
    };

    const init = function() {
        resetHistory();
    }();

    const logPosition = function (log=true) {
        if (log) {
            console.log(`>>>CommandsHistory.position : ${position}`);
        }
    };

    const execute = function (command) {
        
        if (position < history.length) {
            history = history.slice(0, position);
        }
        history.push(command);
        position += 1;

        command.execute();

        logPosition(false);
    };

    const undo = function () {
        
        if (position > 0) {
            position -= 1;
            history[position].unexecute();
        }
        logPosition(false);
    };

    const redo = function () {
        
        if (position < history.length) {
            position += 1;
            history[position - 1].execute();
        }
        logPosition(false);
    };

    const canUndo = function () {

        if (position > 0) {
            return true;
        } else {
            return false;
        }
    };

    const canRedo = function () {

        if (position < history.length) {
            return true;
        } else {
            return false;
        }     
    };

    return Object.freeze(
        {
            reset: resetHistory,
            execute: execute,
            undo: undo,
            redo: redo,

            canUndo: canUndo,
            canRedo: canRedo,
        }
    );

};

export default CommandsHistory;