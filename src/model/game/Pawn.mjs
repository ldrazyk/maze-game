import ArrayIterator from "../utils/ArrayIterator.mjs";

const Pawn = function ({ id, type, player }) {
    let kills;
    let position, reach, alive, active, order;

    const init = function() {
        
        position = false;
        reach = false;  // {up: Field, down: Field, ...}
        alive = true;
        active = false;
        order = false;

        if (type == 'lion') kills = 'rooster';
        else if (type == 'rooster') kills = 'snake';
        else if (type == 'snake') kills = 'lion';

    }();

    // game interface

    const isAlive = function() {
        return alive;
    };

    const isActive = function() {
        return active;
    }

    const move = function (newPosition) {
        position = newPosition;
        let positionId;
        if (newPosition) {
            positionId = newPosition.getId();
        } else {
            positionId = 'false';
        }
        console.log(`>> ${id} moved to ${positionId}`);
    };

    const setReach = function(newReach) {
        reach = newReach;
    };

    const setAlive = function(bool) {
        alive = bool;
    };

    const setActive = function(bool) {
        active = bool;
    };

    const setOrder = function(newOrder) {
        order = newOrder; // number 0+
    };

    // get

    const getPosition = function() {
        return position;
    };

    const getReach = function() {
        return reach;
    };

    const getReachIterator = function() {
        return ArrayIterator(Object.values(reach));
    };

    const getOrder = function() {
        return order;
    };

    const getId = function() {
        return id;
    };

    const getType = function() {
        return type;
    };

    const getKills = function() {
        return kills;
    };

    const getPlayer = function() {
        return player;
    };

    const toString = function() {
        let string = '';

        let playerString = '-';
        if (player) playerString = player.getName();
        
        let positionString = '-';
        if (position) positionString = position.getId();

        string += `Pawn ={ id: ${id}, type: ${type}, player: ${playerString}, position.id: ${positionString} }`;
        
        return string;
    };

    return Object.freeze(
        {
            isAlive: isAlive,
            isActive: isActive,
            move: move,
            setReach: setReach,
            setAlive: setAlive,
            setActive: setActive,
            setOrder: setOrder,

            getPosition: getPosition,
            getReach: getReach,
            getReachIterator: getReachIterator,
            getOrder: getOrder,
            getId: getId,
            getType: getType,
            getKills: getKills,
            getPlayer: getPlayer,
            toString: toString,
        }
    );
};


export default Pawn;