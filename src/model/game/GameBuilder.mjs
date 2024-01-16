import Game from "./Game.mjs";
import Board from "./Board.mjs";
import Pawns from "./Pawns.mjs";
import TurnCounter from "./TurnCounter.mjs";
import MovesCounter from "./MovesCounter.mjs";
import Scores from "./Scores.mjs";
import Commands from "../commands/Commands.mjs";

const GameBuilder = function () {
    let game;

    const reset = function () {

        game = Game();
    };

    const setNotify = function (notifyFunction) {

        game.setNotify(notifyFunction);
    };

    const setNumber = function (newNumber) {

        game.setNumber(newNumber);
    };

    const setPlayers = function (colleague) {

        game.setPlayers(colleague);
    };

    const setBoard = function (matrixSpec) {

        const board = Board(matrixSpec);
        
        game.setBoard(board);
        board.setGame(game);

        board.init();
    };

    const setPawns = function (pawnsSpec) {
        
        const pawns = Pawns(pawnsSpec);

        game.setPawns(pawns);
        pawns.setGame(game);

        pawns.init();
    };

    const setTurnCounter = function () {

        const turnCounter = TurnCounter();

        game.setTurnCounter(turnCounter);
    };
    
    const setMovesCounter = function () {

        const movesCounter = MovesCounter();

        game.setMovesCounter(movesCounter);
    };

    const setScores = function () {

        const scores = Scores();

        game.setScores(scores);
        scores.setGame(game);
    };

    const setCommands = function () {

        const commands = Commands();
        
        game.setCommands(commands);
        commands.setGame(game);
    };

    const setKillCommands = function (killCommands) {
        
        game.setKillCommands(killCommands);
    };

    const getResult = function () {

        game.init();

        return game;
    };

    return Object.freeze(
        {
            reset: reset,
            setNotify: setNotify,
            setNumber: setNumber,
            setPlayers: setPlayers,
            setBoard: setBoard,
            setPawns: setPawns,
            setTurnCounter: setTurnCounter,
            setMovesCounter: setMovesCounter,
            setScores: setScores,
            setCommands: setCommands,
            setKillCommands: setKillCommands,
            getResult: getResult
        }
    );
};

export default GameBuilder;