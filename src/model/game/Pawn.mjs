import ArrayIterator from "../utils/ArrayIterator.mjs";

const Pawn = function ({ id, type, player }) {
    let kills;
    let position, reach, alive, active, order;
    let game;

    const setKills = function () {

        if (type == 'lion') kills = 'rooster';
        else if (type == 'rooster') kills = 'snake';
        else if (type == 'snake') kills = 'lion';
    };

    const init = function() {

        setKills();
        
        position = false;
        reach = { up: false, down: false, left: false, right: false };
        alive = true;
        active = false;
        order = false;

    }();

    const setGame = function (mediator) {
        game = mediator;
    };

    const isAlive = function() {
        return alive;
    };

    const isActive = function() {
        return active;
    };

    const move = function (newPosition) {
        
        position = newPosition;

        const log = function () {
            let positionId;
            if (newPosition) {
                positionId = newPosition.getId();
            } else {
                positionId = 'false';
            }
            console.log(`>> ${id} moved to ${positionId}`);
        };

        // log();
    };

    const updateReach = function () {

        Object.keys(reach).forEach(direction => {

            reach[direction] = game.isMoveLegal(
                {
                    pawnSpec: { pawnId: id },
                    fieldSpec: { field: position, direction: direction }
                }
            );
        });
    };

    const isInReach = function (field) {

        if (Object.values(reach).includes(field)) {
            return true;
        } else {
            return false;
        }
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

    const getReach = function(direction=false) {

        if (direction) {
            return reach[direction];
        } else {
            return reach;
        }
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

    const getPlayerNumber = function() {
        return player.getNumber();
    };

    const getColor = function() {
        return player.getColor();
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
            setGame: setGame,

            isAlive: isAlive,
            isActive: isActive,
            move: move,
            setAlive: setAlive,
            setActive: setActive,
            setOrder: setOrder,
            updateReach: updateReach,
            isInReach: isInReach,

            getPosition: getPosition,
            getReach: getReach,
            getReachIterator: getReachIterator,
            getOrder: getOrder,
            getId: getId,
            getType: getType,
            getKills: getKills,
            getPlayerNumber: getPlayerNumber,
            getColor: getColor,
            toString: toString,
        }
    );
};


export default Pawn;