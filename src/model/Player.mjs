const Player = function (spec) {
    let name, color, number, active, score;

    const init = function() {
        ({name, color, number} = spec);
        active = false;
        score = 0;
    }();

    // game interface

    const isActive = function() {
        return active;
    };

    const activate = function() {
        active = true;
    };

    const disactivate = function() {
        active = false;
    };

    const addWin = function() {
        score += 1;
    };

    // get

    const getName = function() {
        return name;
    };

    const getColor = function() {
        return color;
    };

    const getNumber = function() {
        return number;
    };

    const toString = function() {
        let string = '';
        string += `Player ={ number: ${number}, name: ${name}, color: ${color} }`;
        return string;
    };

    return Object.freeze(
        {
            // isActive: isActive,
            // activate: activate,
            // disactivate: disactivate,
            addWin: addWin,
            
            getName: getName,
            getColor: getColor,
            getNumber: getNumber,
            toString: toString,
        }
    );
};

export default Player;