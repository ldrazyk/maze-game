const CommandsHistory = function () {
    let position, history;

    const resetHistory = function() {
        history = [];
        position = 0;
    };

    const init = function() {
        resetHistory();
    }();


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

    return Object.freeze(
        {
            reset: resetHistory,
            execute: execute,
            undo: undo,
            redo: redo,
        }
    );

};

export default CommandsHistory;