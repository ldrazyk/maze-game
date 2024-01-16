const Result = function () {
    let scores = [];
    let game;

    const setGame = function (mediator) {
        game = mediator;
    };

    const add = function (code) {

        let score = { game: game.getNumber(), type: code };
        let places;
        if (code == 'exit') {
            places = { winner: game.getActivePlayer(), looser: game.getActivePlayer(false) };
        } else if (code = 'no_pawns') {
            places = { winner: game.getActivePlayer(false), looser: game.getActivePlayer() };
        }
        places.winner.addWin();
        score = {...score, ...places};
        scores.push(score);
    };

    const getLast = function () {
        return scores[scores.length - 1];
    };

    const getScores = function () {
        return scores;
    };


    return Object.freeze(
        {
            setGame: setGame,

            add: add,
            getLast: getLast,
            getScores: getScores
        }
    )
};

export default Result;