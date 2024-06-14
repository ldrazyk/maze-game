import Score from "./Score.mjs";
import ArrayIterator from "../utils/ArrayIterator.mjs";

const Scores = function () {
    let game;
    let ended;
    const scores = [];

    const setGame = function (mediator) {
        game = mediator;
    };

    const reset = function () {
        ended = false;
    };

    const add = function (type, winnerNumber=false) {

        ended = true;

        const getWinner = function () {
        
            let winner = false;

            if (winnerNumber) {
                winner = game.getPlayer(winnerNumber);
            }

            return winner;
        };

        const score = Score(
            {
                type: type, 
                gameNumber: game.getNumber(), 
                activePlayer: game.getActivePlayer(), 
                passivePlayer: game.getActivePlayer(false),
                winningPlayer: getWinner(),
            }
        );

        scores.push(score);
    };

    const gameEnded = function () {
        return ended;
    };

    const getLastScoreString = function () {
        return scores[scores.length - 1].toString();
    };

    const getLastScoreType = function () {
        return scores[scores.length - 1].getType();
    };

    const getLastScoreWinnerName = function () {
        return scores[scores.length - 1].getWinnerName();
    };

    const getScoresIterator = function () {
        return ArrayIterator(scores);
    };


    return Object.freeze(
        {
            setGame,

            reset,
            add,
            ended: gameEnded,
            getLastScoreString,
            getLastScoreType,
            getLastScoreWinnerName,
            getScoresIterator,
        }
    )
};

export default Scores;