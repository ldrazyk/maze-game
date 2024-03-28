const Session = function () {

    let state;
    let players, scores, boardFactory, boardDummyRepository;
    let gameNumber;

    const init = function () {
        
        gameNumber = 0;
    }();

    const setState = function (stateObject) {
    
        state = stateObject;
    };

    const setBoardFactory = function (factory) {
    
        boardFactory = factory;
    };
    
    const setBoardDummyRepository = function (repository) {
    
        boardDummyRepository = repository;
    };

    const setPlayers = function (newPlayers) {
        players = newPlayers;
    };

    const setScores = function (newScores) {
        scores = newScores;
    };

    // model interface

    const setPlayerName = function (spec) {
    
        players.setPlayerName(spec);
    };

    const createBoard = function (spec) {
    
        return boardFactory.createBoard(spec);
    };

    // mediator

    const createAllBoardDummies = function () {
    
        return boardFactory.createAllBoardDummies();
    };

    // getters

    const getState = function () {
    
        return state;
    };

    const getPlayers = function () {
        return players;
    };

    const getPlayer = function(number) {
        return players.getPlayer(number);
    };

    const getPlayersIterator = function() {
        return players.getPlayersIterator();
    };
    
    const getScores = function () {
        return scores;
    };

    const getIncreasedGameNumber = function() {
        gameNumber += 1;
        return gameNumber;
    };

    return Object.freeze(
        {
            setState,
            setBoardFactory,
            setBoardDummyRepository,
            setPlayers,
            setScores,
            // model interface
            setPlayerName,
            createBoard,
            // mediator 
            createAllBoardDummies,
            // getters
            getState,
            getPlayers,
            getPlayer,
            getPlayersIterator,
            getScores,
            getIncreasedGameNumber,
        }
    );
};

export default Session;