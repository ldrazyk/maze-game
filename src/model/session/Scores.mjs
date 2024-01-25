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

    const add = function (code) {

        ended = true;

        const score = Score(
            {
                type: code, 
                gameNumber: game.getNumber(), 
                activePlayer: game.getActivePlayer(), 
                passivePlayer: game.getActivePlayer(false)
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

    const getScoresIterator = function () {
        return ArrayIterator(scores);
    };


    return Object.freeze(
        {
            setGame: setGame,

            reset: reset,
            add: add,
            ended: gameEnded,
            getLastScoreString: getLastScoreString,
            getScoresIterator: getScoresIterator
        }
    )
};

export default Scores;