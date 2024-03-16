const Session = function () {

    let state;
    let players, scores, boardFactory;
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

    const setPlayers = function (newPlayers) {
        players = newPlayers;
    };

    const setScores = function (newScores) {
        scores = newScores;
    };

    const setPlayerName = function (spec) {
    
        players.setPlayerName(spec);
    };

    const getState = function () {
    
        return state;
    };

    const createBoard = function (spec) {
    
        return boardFactory.createBoard(spec);
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
            setPlayers,
            setScores,

            setPlayerName,

            getState,
            createBoard,

            getPlayers,
            getPlayer,
            getPlayersIterator,
            getScores,
            getIncreasedGameNumber,
        }
    );
};

export default Session;