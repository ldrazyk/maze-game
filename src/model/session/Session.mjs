const Session = function () {

    let players, scores, boardRepository;
    let gameNumber;

    const init = function () {
        
        gameNumber = 0;
    }();

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

    const getBoard = function (spec) {
    
        return boardRepository.getBoard(spec);
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
            setBoardRepository,
            setPlayers,
            setScores,

            setPlayerName,

            getBoard,

            getPlayers,
            getPlayer,
            getPlayersIterator,
            getScores,
            getIncreasedGameNumber,
        }
    );
};

export default Session;