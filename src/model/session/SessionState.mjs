const SessionState = function () {
    
    let session;
    let players, scores, boardRepository;

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

    const setBoardRepository = function (repository) {
    
        boardRepository = repository;
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
            setBoardRepository,
            // get players
            getPlayer,
            getActiveNumber,
        }
    );
};

export default SessionState;