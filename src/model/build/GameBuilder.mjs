import Game from "../game/Game.mjs";
import GameMediator from "../game/infrastructure/GameMediator.mjs";
import GameOperator from "../game/infrastructure/GameOperator.mjs";
import GameOperatorEmpty from "../game/infrastructure/GameOperatorEmpty.mjs";
import GameState from "../game/infrastructure/GameStateInterface.mjs";
import GameOperationsInterface from "../game/infrastructure/GameOperationsInterface.mjs";
import GameManager from "../game/infrastructure/GameManager.mjs";
import Pawns from "../game/elements/Pawns.mjs";
import TurnCounter from "../game/elements/TurnCounter.mjs";
import MovesCounter from "../game/elements/MovesCounter.mjs";
import GameInfo from "../game/elements/GameInfo.mjs";
import Commands from "../commands/Commands.mjs";

const GameBuilder = function () {

    let game;
    const components = {};

    const reset = function () {

        game = components.game = Game();
    };

    const setPlayers = function (players) {

        components.players = players;
    };

    const setScores = function (scores) {

        scores.reset();
        components.scores = scores;
    };

    const setBoard = function (board) {

        components.board = board;
    };

    const setPawns = function (pawnsSpec) {
        
        components.pawns = Pawns(pawnsSpec);
    };
    
    const setOtherComponents = function () {

        const setTurnCounter = function () {
    
            components.turnCounter = TurnCounter();
        };
        
        const setMovesCounter = function () {
    
            components.movesCounter = MovesCounter();
        };
    
        const setCommands = function () {
    
            components.commands = Commands();
        };
    
        const setGameInfo = function () {
        
            components.gameInfo = GameInfo();
        };

        const setManager = function () {

            components.gameManager = GameManager();
        };
    
        const setMediator = function () {
        
            components.gameMediator = GameMediator();
        };
    
        const setOperators = function () {
    
            components.gameOperator = GameOperator();
            components.gameOperatorEmpty = GameOperatorEmpty();
        };
    
        const setInterfaces = function () {
    
            components.gameState = GameState();
            components.gameOperationsInterface = GameOperationsInterface();
        };
    
        setTurnCounter();
        setMovesCounter();
        setCommands();
        setGameInfo();
        setManager();
        setMediator();
        setOperators();
        setInterfaces();
    };

    const setNotify = function (notifyFunction) {

        components.gameOperator.setNotify(notifyFunction);
    };

    const setNumber = function (newNumber) {

        components.gameInfo.setNumber(newNumber);
    };

    const getResult = function () {

        const joinComponents = function () {

            for (const [name, component] of Object.entries(components)) {

                try {
                    component.setComponents(components);
                } catch {
                    console.log(`Component ${name} doesn't have setComponents() methode...`);
                }
            };
        };

        const setFunctions = function () {
        
            components.gameOperator.setDisableInput(components.game.disableInput)
        };

        const initComponents = function () {
        
            components.board.init();
            components.pawns.init();
            game.init();
        };

        joinComponents();
        setFunctions();
        initComponents();

        return game;
    };

    return Object.freeze(
        {
            reset,
            setPlayers,
            setScores,
            setBoard,
            setPawns,
            setOtherComponents,
            setNotify,
            setNumber,
            getResult,
        }
    );
};

export default GameBuilder;