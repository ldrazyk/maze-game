const GameInfo = function () {

    let gameNumber;
    let flagCaptured = false;

    const setNumber = function (newNumber) {

        gameNumber = newNumber;
    };

    const setFlagCaptured = function () {
    
        flagCaptured = true;
    };
    
    const getNumber = function () {
    
        return gameNumber;
    };

    const isFlagCaptured = function () {
    
        return flagCaptured;
    };

    
    return Object.freeze(
        {
            setNumber,
            setFlagCaptured,
            getNumber,
            isFlagCaptured,
        }
    );
};

export default GameInfo;