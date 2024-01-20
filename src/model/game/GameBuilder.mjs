import Game from "./Game.mjs";
import Board from "./Board.mjs";
import Pawns from "./Pawns.mjs";
import TurnCounter from "./TurnCounter.mjs";
import MovesCounter from "./MovesCounter.mjs";
import Scores from "./Scores.mjs";
import Commands from "../commands/Commands.mjs";
import GameState from "./GameState.mjs";
import GameOperator from "./GameOperator.mjs";
import GameOperatorEmpty from "./GameOperatorEmpty.mjs";

const GameBuilder = function () {
    let game, gameState;
    let mediators;

    const reset = function () {

        game = Game();
        mediators = [game];
    };

    const setState = function () {

        gameState = GameState();
        mediators.push(gameState);

        game.setGameState(gameState);
        gameState.setGame(game);
    };

    const setOperator = function () {

        const gameOperator = GameOperator();

        game.setGameOperator(gameOperator);
        gameOperator.setGame(game);
    };

    const setEmptyOperator = function () {

        const gameOperatorEmpty = GameOperatorEmpty();

        game.setEmptyGameOperator(gameOperatorEmpty);
        gameOperatorEmpty.setGame(game);
    };

    const setNotify = function (notifyFunction) {

        game.setNotify(notifyFunction);
    };

    const setNumber = function (newNumber) {

        game.setNumber(newNumber);
    };

    const setPlayers = function (players) {

        game.setPlayers(players);
    };

    const setBoard = function (matrixSpec) {

        const board = Board(matrixSpec);
        
        mediators.forEach(mediator => mediator.setBoard(board));
        board.setGame(game);

        board.init();
    };

    const setPawns = function (pawnsSpec) {
        
        const pawns = Pawns(pawnsSpec);

        mediators.forEach(mediator => mediator.setPawns(pawns));
        pawns.setGame(game);

        pawns.init();
    };

    const setTurnCounter = function () {

        const turnCounter = TurnCounter();

        mediators.forEach(mediator => mediator.setTurnCounter(turnCounter));
    };
    
    const setMovesCounter = function () {

        const movesCounter = MovesCounter();

        mediators.forEach(mediator => mediator.setMovesCounter(movesCounter));
    };

    const setScores = function () {

        const scores = Scores();

        mediators.forEach(mediator => mediator.setScores(scores));
        scores.setGame(game);
    };

    const setCommands = function () {

        const commands = Commands();
        
        mediators.forEach(mediator => mediator.setCommands(commands));
        commands.setGame(game);
    };

    const getResult = function () {

        game.init();

        return game;
    };

    return Object.freeze(
        {
            reset: reset,
            setState: setState,
            setOperator: setOperator,
            setEmptyOperator: setEmptyOperator,
            setNotify: setNotify,
            setNumber: setNumber,
            setPlayers: setPlayers,
            setBoard: setBoard,
            setPawns: setPawns,
            setTurnCounter: setTurnCounter,
            setMovesCounter: setMovesCounter,
            setScores: setScores,
            setCommands: setCommands,
            getResult: getResult
        }
    );
};

export default GameBuilder;