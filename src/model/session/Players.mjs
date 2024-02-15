import Player from "./Player.mjs";
import ArrayIterator from "../utils/ArrayIterator.mjs";

const Players = function (playersSpec) {
    const players = [];
    let activePosition;
    let passivePosition;

    const createPlayers = function () {
        for (const spec of playersSpec) {
            players.push(Player(spec));
        };
    };

    const initActivePosition = function () {
    
        passivePosition = 0;
        activePosition = 1;
    };

    const init = function () {

        createPlayers();
        initActivePosition();
    }();

    const changeActive = function () {
        if (activePosition == 0) {
            activePosition = 1;
            passivePosition = 0;
        } else {
            activePosition = 0;
            passivePosition = 1;
        }
        console.log('Active players number: ' + players[activePosition].getNumber());  // test
    };

    const getActive = function (active=true) {

        if (active) {
            return players[activePosition];
        } else {
            return players[passivePosition];
        }
    };

    const getActiveNumber = function (active=true) {
    
        return getActive(active).getNumber();
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
            changeActive,
            
            getActive,
            getActiveNumber,
            getPlayer,
            getPlayersIterator,
            getAmount,
        }
    );
};

export default Players;