import Players from './Players.mjs';

const Session = function ({ playersSpec }) {
    let players;
    let gameNumber;

    const createPlayers = function() {
        players = Players({ playersSpec: playersSpec });
    };

    const init = function () {
        
        createPlayers();
        gameNumber = 0;
    }();

    const getPlayers = function () {
        return players;
    };

    const getPlayer = function(number) {
        return players.getPlayer(number);
    };

    const getPlayersIterator = function() {
        return players.getPlayersIterator();
    };

    const getGameNumber = function() {
        gameNumber += 1;
        return gameNumber;
    };

    return Object.freeze(
        {
            getPlayers: getPlayers,
            getPlayer: getPlayer,
            getPlayersIterator: getPlayersIterator,
            getGameNumber: getGameNumber,
        }
    );
};

export default Session;