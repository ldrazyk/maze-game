const Score = function ({ gameNumber, type, activePlayer, passivePlayer }) {
    let winner, looser, tied;

    const init = function () {

        if (type == 'exit') {
            winner = activePlayer;
            looser = passivePlayer;
        } else if (['no_pawns', 'give_up'].includes(type)) {
            winner = passivePlayer;
            looser = activePlayer;
        } else if (type == 'draw') {
            tied = [activePlayer, passivePlayer];
        }
        
        if (winner) {
            winner.addWin();
        } else {
            tied.forEach(player => player.addDraw());
        }
    }();

    const getGameNumber = function () {
        return gameNumber;
    };

    const getType = function () {
        return type;
    };

    const getWinner = function () {
        return winner;
    };

    const getLooser = function () {
        return looser;
    };

    const toString = function () {
        
        const scoreString = `Game over!\nWinner: ${winner.getName()}\nType: ${type}`;
        return scoreString;
    };

    return Object.freeze(
        {
            getGameNumber: getGameNumber,
            getType: getType,
            getWinner: getWinner,
            getLooser: getLooser,
            toString: toString
        }
    );
};

export default Score;