const GameInfo = function () {

    let gameNumber;

    const setNumber = function (newNumber) {

        gameNumber = newNumber;
    };
    
    const getNumber = function () {
    
        return gameNumber;
    };
    
    return Object.freeze(
        {
            setNumber,

            getNumber,
        }
    );
};

export default GameInfo;