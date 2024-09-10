import Game from "../game/GameObject.mjs";
import GameMediator from "../game/GameMediator2.mjs";
import GameOperator from "../game/GameOperator3.mjs";
import GameOperatorEmpty from "../game/GameOperatorEmpty.mjs";
import GameState from "../game/GameState.mjs";
import GameOperationsFacade from "../game/GameOperationsFacade.mjs";
import Pawns from "../game/Pawns.mjs";
import TurnCounter from "../game/TurnCounter.mjs";
import MovesCounter from "../game/MovesCounter.mjs";
import GameInfo from "../game/GameInfo.mjs";
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
    
        const setMediator = function () {
        
            components.gameMediator = GameMediator();
        };
    
        const setOperators = function () {
    
            components.gameOperator = GameOperator();
            components.gameOperatorEmpty = GameOperatorEmpty();
        };
    
        const setFacades = function () {
    
            components.gameState = GameState();
            components.gameOperationsFacade = GameOperationsFacade();
        };
    
        setTurnCounter();
        setMovesCounter();
        setCommands();
        setGameInfo();
        setMediator();
        setOperators();
        setFacades();
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