const Result = function (players) {
    let result;

    const init = function () {
        result = {ended: false, winner: false, looser: false, type: false};
    }();

    const set = function (code) {

        if (code == 'exit') {
            result = {ended: true, winner: players.getActive(), looser: players.getActive(false), type: code};
        } else if (code = 'no_pawns') {
            result = {ended: true, winner: players.getActive(false), looser: players.getActive(), type: code};
        }
    };

    const getResult = function () {
        return result;
    };

    return Object.freeze(
        {
            set: set,
            getResult: getResult,
        }
    )
};

export default Result;