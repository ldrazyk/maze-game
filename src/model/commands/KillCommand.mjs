const KillCommand = function(position) {
    let pawn;

    const init = function() {
        pawn = position.getPawn();
    }();

    const execute = function() {
        if (pawn) {
            pawn.move(false);
            pawn.setAlive(false);
            position.free();
        }
    };

    const unexecute = function() {
        if (pawn) {
            pawn.move(position);
            pawn.setAlive(true);
            position.take(pawn);
        }
    };

    return Object.freeze(
        {
            execute,
            unexecute,
        }
    );
};

export default KillCommand;