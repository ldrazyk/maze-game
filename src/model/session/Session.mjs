const Session = function () {

    let state;
    let players, scores, boardRepository;
    let gameNumber;

    const init = function () {
        
        gameNumber = 0;
    }();

    const setState = function (stateObject) {
    
        state = stateObject;
    };

    const setBoardRepository = function (repository) {
    
        boardRepository = repository;
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
    
        return boardRepository.createBoard(spec);
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
            setBoardRepository,
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