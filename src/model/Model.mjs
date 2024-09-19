import Subject from "./utils/Subject.mjs";
import SessionBuilder from "./build/SessionBuilder.mjs";
import GameBuilder from "./build/GameBuilder.mjs";

const Model = function() {
    let subject, gameBuilder, sessionBuilder;
    let session, game;

    const getGameState = function () {

        if (game) {
            return game.getGameState();
        } else if (session) {
            return session.getState();
        }
    };

    const createSubject = function () {
        
        subject = Subject();
    };

    const createSessionBuilder = function () {

        sessionBuilder = SessionBuilder();
    };

    const createGameBuilder = function () {

        gameBuilder = GameBuilder();
    };

    const init = function () {

        createSubject();
        createSessionBuilder();
        createGameBuilder();
    }();

    const notify = function (code, object=false) {

        if (!object) {
            
            object = getGameState();
        }
        
        subject.notify(code, object);
    };

    const attach = function (observer) {
        
        subject.attach(observer);
    };

    const detach = function (observer) {
        
        subject.detach(observer);
    };

    const createSession = function({ playersSpec }) {
        
        const builder = sessionBuilder;

        const make = function () {
            builder.reset();
            builder.setState();
            builder.setBoardFactory();
            builder.setBoardDummyRepository();
            builder.setPlayers(playersSpec);
            builder.setScores();
        };

        make();
        session = builder.getResult();

        notify('createSession');
    };

    const nextTurn = function() {
        game.nextTurn();
    };

    const createGame = function({ boardSpec, pawnsSpec }) {
        
        const builder = gameBuilder;

        const make = function () {
            builder.reset();
            builder.setPlayers(session.getPlayers());
            builder.setScores(session.getScores());
            builder.setBoard(session.createBoard(boardSpec));
            builder.setPawns(pawnsSpec);
            builder.setOtherComponents();
            builder.setNotify(notify);
            builder.setNumber(session.getIncreasedGameNumber());
        };

        make();
        game = builder.getResult();

        notify('createGame');

        nextTurn();
    };

    const setPlayerName = function (spec) {
    
        session.setPlayerName(spec);
        notify('changePlayerName');
    };

    // game operations

    const selectNext = function () {
        game.selectNext();
    };
    
    const hold = function () {
        game.hold();
    };
    
    const moveUp = function () {
        game.moveUp();
    };
    
    const moveDown = function () {
        game.moveDown();
    };
    
    const moveLeft = function () {
        game.moveLeft();
    };
    
    const moveRight = function () {
        game.moveRight();
    };
    
    const click = function (fieldId) {
        game.click(fieldId);
    };

    const undo = function () {
        game.undo();
    };

    const redo = function () {
        game.redo();
    };

    const endGame = function (spec) {
        game.endGame(spec);
    };

    // state
    
    const getPlayer = function (number) {
        return session.getPlayer(number);
    };

    const getPlayersIterator = function() {
        return session.getPlayersIterator();
    };

    return Object.freeze(
        {
            attach,
            detach,

            createSession,
            createGame,
            setPlayerName,

            // game operations
            nextTurn,
            selectNext,
            hold,
            moveUp,
            moveDown,
            moveLeft,
            moveRight,
            click,
            undo,
            redo,
            endGame,

            // model state
            getPlayer,
            getPlayersIterator,
        }
    );
};

export default Model;