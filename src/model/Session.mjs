import Player from './Player.mjs';
import Game from './game/Game.mjs';
import Commands from './commands/Commands.mjs';
import ArrayIterator from "./utils/ArrayIterator.mjs";

const Session = function ({ playersSpec }) {
    const players = [];
    let gameNumber = 0;
    let game;

    const createPlayers = function() {
        for (const spec of playersSpec) {
            players.push(Player(spec));
        };
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
        return players[number - 1];
    };

    const getPlayersIterator = function() {
        return ArrayIterator(players);
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