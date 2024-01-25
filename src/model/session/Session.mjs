const Session = function () {
    let players, scores;
    let gameNumber;

    const init = function () {
        
        gameNumber = 0;
    }();

    const setPlayers = function (newPlayers) {
        players = newPlayers;
    };

    const setScores = function (newScores) {
        scores = newScores;
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
            setPlayers: setPlayers,
            setScores: setScores,

            getPlayers: getPlayers,
            getPlayer: getPlayer,
            getPlayersIterator: getPlayersIterator,
            getScores: getScores,
            getIncreasedGameNumber: getIncreasedGameNumber,
        }
    );
};

export default Session;