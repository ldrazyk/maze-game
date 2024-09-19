const SessionState = function () {
    
    let session;
    let players, scores, boardFactory, boardDummyRepository;

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

    const setBoardDummyRepository = function (repository) {
    
        boardDummyRepository = repository;
    };

    // getters

    const getPlayer = function (number) {
    
        return players.getPlayer(number);
    };

    const getPlayerName = function (number) {
    
        return players.getPlayerName(number);
    };

    const getActiveNumber = function (active=true) {
    
        return players.getActiveNumber(active);
    };

    const getBoardDummyIterator = function () {
    
        return boardDummyRepository.getIterator();
    };

    
    return Object.freeze(
        {
            // setters
            setSession,
            setPlayers,
            setScores,
            setBoardFactory,
            setBoardDummyRepository,
            // getters
            getPlayer,
            getPlayerName,
            getActiveNumber,
            getBoardDummyIterator,
        }
    );
};

export default SessionState;