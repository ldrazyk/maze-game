import Players from './Players.mjs';
import Game from '../game/Game.mjs';
import Commands from '../commands/Commands.mjs';

const Session = function ({ playersSpec }) {
    let players;
    let gameNumber = 0;
    let game;

    const createPlayers = function() {
        players = Players({ playersSpec: playersSpec });
    };

    const init = function () {
        
        createPlayers();
    }();


    const createGame = function ({ matrixSpec, pawnsSpec, notify }) {

        gameNumber += 1;

        const spec = {
            matrixSpec: matrixSpec, 
            pawnsSpec: pawnsSpec, 
            notify: notify, 
            players: players,
            gameNumber: gameNumber,
        };
        game = Game(spec);

        const commands = Commands(game);
        game.setCommands(commands);
    };


    const getPlayer = function(number) {
        return players.getPlayer(number);
    };

    const getPlayersIterator = function() {
        return players.getPlayersIterator();
    };

    const getGameNumber = function() {
        return gameNumber;
    };

    const getGame = function() {
        return game;
    };

    return Object.freeze(
        {
            createGame: createGame,

            getPlayer: getPlayer,
            getPlayersIterator: getPlayersIterator,
            getGameNumber: getGameNumber,
            getGame: getGame,
        }
    );

};

export default Session;