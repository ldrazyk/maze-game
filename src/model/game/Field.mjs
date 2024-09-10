const Field = function ({ id, type, x, y, exitNumber=false, player=false }) {
    let pawn;

    const init = function() {
        
        pawn = false;
    }();


    const isFree = function() {
        if (pawn) return false;
        else return true;
    };

    const take = function(newPawn) {
        pawn = newPawn;

        const log = function () {
            console.log(`>> ${id} took ${newPawn.getId()}`);
        };
        // log();
    };

    const free = function() {
        pawn = false;

        const log = function () {
            console.log(`>> ${id} freed`);
        };
        // log();
    };

    const getPawn = function() {
        return pawn;
    };

    const getPawnId = function () {
        
        if (pawn) {
            return pawn.getId();
        } else {
            return false;
        }
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

    const getFlagColor = function () {

        if (player) {
            return player.getColor();
        } else {
            return false;
        }
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
            isFree,
            take,
            free,
            getPawn,
            getPawnId,
            
            getId,
            getType,
            getX,
            getY,
            getExitNumber,
            getFlagColor,
            toString,
        }
    );
};

export default Field;