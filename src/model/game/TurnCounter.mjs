const TurnCounter = function () {
    let turnCounter = 0;
    let turnNumber = 0;

    const next = function() {

        turnCounter += 1;

        if (turnCounter % 2 == 1) {
            turnNumber += 1;
        }

        console.log('Turn number: ' + turnNumber);  // test
    };

    const getTurn = function () {
        return turnNumber;
    };

    return Object.freeze(
        {
            next: next,
            getTurn: getTurn,
        }
    );
};

export default TurnCounter;