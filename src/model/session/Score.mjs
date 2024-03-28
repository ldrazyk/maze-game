const Score = function ({ gameNumber, type, activePlayer, passivePlayer, winningPlayer=false }) {
    let winner, looser, tied;

    const init = function () {

        const findResults = function () {
        
            if (type == 'exit') {

                winner = activePlayer;
                looser = passivePlayer;

            } else if (['no_pawns'].includes(type)) {

                winner = passivePlayer;
                looser = activePlayer;

            } else if (type == 'draw') {

                tied = [activePlayer, passivePlayer];

            } else if (type == 'give_up') {

                winner = winningPlayer;
                
                if (activePlayer == winningPlayer) {
                    looser = passivePlayer;
                } else {
                    looser = activePlayer;
                }
            }
        }();

        const addScoreToPlayers = function () {
        
            if (winner) {
                winner.addWin();
            } else {
                tied.forEach(player => player.addDraw());
            }
        }();
        
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
        
        let scoreString = `Game over!\nType: ${type}`;
        if (winner) {
            scoreString += `\nWinner: ${winner.getName()}`;
        }
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