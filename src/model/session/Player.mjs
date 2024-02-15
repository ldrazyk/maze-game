const Player = function ({ name, color, number }) {
    let score;

    const init = function() {
        
        score = 0;
    }();

    const addWin = function() {
        score += 1;
    };

    const getName = function() {
        return name;
    };

    const getColor = function() {
        return color;
    };

    const getNumber = function() {
        return number;
    };

    const getScore = function () {
    
        return score;
    };

    const toString = function() {
        let string = '';
        string += `Player ={ number: ${number}, name: ${name}, color: ${color}, score: ${score} }`;
        return string;
    };

    return Object.freeze(
        {
            addWin,
            
            getName,
            getColor,
            getNumber,
            getScore,
            toString,
        }
    );
};

export default Player;