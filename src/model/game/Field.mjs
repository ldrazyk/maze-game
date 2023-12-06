const Field = function ({ id, type, x, y, exitNumber=false, player=false }) {
    let pawn, reach;

    const init = function() {
        
        pawn = false;
        reach = false;
    }();


    const isFree = function() {
        if (pawn) return false;
        else return true;
    };

    const take = function(newPawn) {
        pawn = newPawn;
        console.log(`>> ${id} took ${newPawn.getId()}`);
    };

    const free = function() {
        pawn = false;
        console.log(`>> ${id} freed`);
    };

    // const setReach = function(newReach) {
    //     reach = newReach;
    //     // reach =('up', 'down', 'left'... false)
    // };
    

    // const getReach = function() {
    //     return reach;
    // };

    const getPawn = function() {
        return pawn;
    };

    const getId = function() {
        return id;
    };

    const getType = function() {
        return type;
    };

    const getX = function() {
        return x;
    };

    const getY = function() {
        return y;
    };

    const getExitNumber = function() {
        return exitNumber;
    };

    const getPlayer = function() {
        return player;
    };

    const toString = function() {
        let string = '';
        
        let pawnString = '-';
        if (pawn) pawnString = pawn.getId();

        let exitNumberString = '-';
        if (exitNumber) exitNumberString = exitNumber;

        string += `Field ={ id: ${id}, type: ${type}, x: ${x}, y: ${y}, exitNumber: ${exitNumberString}, pawn.id: ${pawnString} }`;
        
        return string;
    };


    return Object.freeze(
        {
            isFree: isFree,
            take: take,
            free: free,
            // setReach: setReach,
            // getReach: getReach,
            getPawn: getPawn,
            
            getId: getId,
            getType: getType,
            getX: getX,
            getY: getY,
            getExitNumber: getExitNumber,
            getPlayer: getPlayer,
            toString: toString,
        }
    );
};

export default Field;