const SessionState = function () {
    
    let session;
    let players, scores, boardFactory;

    // setters

    const setSession = function (mediator) {
        session = mediator;
    };

    const setPlayers = function (component) {
        players = component;
    };

    const setScores = function (component) {
        scores = component;
    };

    const setBoardFactory = function (factory) {
    
        boardFactory = factory;
    };

    // get players

    const getPlayer = function (number) {
    
        return players.getPlayer(number);
    };

    const getActiveNumber = function (active=true) {
    
        return players.getActiveNumber(active);
    };

    
    return Object.freeze(
        {
            // setters
            setSession,
            setPlayers,
            setScores,
            setBoardFactory,
            // get players
            getPlayer,
            getActiveNumber,
        }
    );
};

export default SessionState;