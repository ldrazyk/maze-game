import Player from "./Player.mjs";
import ArrayIterator from "../utils/ArrayIterator.mjs";

const Players = function ({ playersSpec }) {
    const players = [];
    let activePosition = 0;
    let pasivePosition = 1;

    const createPlayers = function () {
        for (const spec of playersSpec) {
            players.push(Player(spec));
        };
    };

    const init = function () {
        createPlayers();
    }();

    const changeActive = function () {
        if (activePosition == 0) {
            activePosition = 1;
            pasivePosition = 0;
        } else {
            activePosition = 0;
            pasivePosition = 1;
        }
        console.log('Active players number: ' + players[activePosition].getNumber());  // test
    };

    const getActive = function (active=true) {
        if (active) {
            return players[activePosition];
        } else {
            return players[pasivePosition];
        }
    };

    const getPlayer = function (number) {
        return players[number - 1];
    };

    const getPlayersIterator = function () {
        return ArrayIterator(players);
    };

    const getAmount = function () {
        return players.length;
    };

    return Object.freeze(
        {
            changeActive: changeActive,
            
            getActive: getActive,
            getPlayer: getPlayer,
            getPlayersIterator: getPlayersIterator,
            getAmount: getAmount,
        }
    );
};

export default Players;