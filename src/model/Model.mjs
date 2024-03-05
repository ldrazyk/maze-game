import Subject from "./utils/Subject.mjs";
import SessionBuilder from "./session/SessionBuilder.mjs";
import GameBuilder from "./game/GameBuilder.mjs";

const Model = function() {
    let subject, gameBuilder, sessionBuilder;
    let session, game;

    const getGameState = function () {

        if (game) {
            return game.getGameState();
        }
    };

    const createSubject = function () {
        
        subject = Subject(getGameState);
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

    const notify = function (code) {
        
        subject.notify(code);
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
            builder.setBoardRepository();
            builder.setPlayers(playersSpec);
            builder.setScores();
        };

        make();
        session = builder.getResult();

        notify('createSession');
    };

    const createGame = function({ boardSpec, pawnsSpec }) {
        
        const builder = gameBuilder;

        const make = function () {
            builder.reset();
            builder.setState();
            builder.setOperator();
            builder.setEmptyOperator();
            builder.setNotify(notify);
            builder.setNumber(session.getIncreasedGameNumber());
            builder.setPlayers(session.getPlayers());
            builder.setBoard(session.getBoard(boardSpec));
            builder.setPawns(pawnsSpec);
            builder.setTurnCounter();
            builder.setMovesCounter();
            builder.setScores(session.getScores());
            builder.setCommands();
        };

        make();
        game = builder.getResult();

        notify('createGame');
    };

    const setPlayerName = function (spec) {
    
        session.setPlayerName(spec);
    };

    // game operations

    const nextTurn = function() {
        game.getGameOperator().nextTurn();
    };

    const selectNext = function () {
        game.getGameOperator().selectNext();
    };
    
    const hold = function () {
        game.getGameOperator().hold();
    };
    
    const moveUp = function () {
        game.getGameOperator().moveUp();
    };
    
    const moveDown = function () {
        game.getGameOperator().moveDown();
    };
    
    const moveLeft = function () {
        game.getGameOperator().moveLeft();
    };
    
    const moveRight = function () {
        game.getGameOperator().moveRight();
    };
    
    const click = function (fieldId) {
        game.getGameOperator().click(fieldId);
    };

    const undo = function () {
        game.getGameOperator().undo();
    };

    const redo = function () {
        game.getGameOperator().redo();
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

            // model state
            getPlayer,
            getPlayersIterator,
        }
    );
};

export default Model;