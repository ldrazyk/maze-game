import Subject from "./utils/Subject.mjs";
import GameBuilder from "./game/GameBuilder.mjs";
import Session from "./session/Session.mjs";

const Model = function() {
    let subject, gameBuilder;
    let session, game;

    const createSubject = function () {
        
        subject = Subject();
    };

    const createGameBuilder = function () {

        gameBuilder = GameBuilder();
    };

    const init = function () {

        createSubject();
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
        
        session = Session({ playersSpec: playersSpec });
        notify('createSession');
    };

    const createGame = function({ matrixSpec, pawnsSpec }) {
        
        const builder = gameBuilder;

        const make = function () {
            builder.reset();
            builder.setState();
            builder.setOperator();
            builder.setEmptyOperator();
            builder.setNotify(notify);
            builder.setNumber(session.getGameNumber());
            builder.setPlayers(session.getPlayers());
            builder.setBoard(matrixSpec);
            builder.setPawns(pawnsSpec);
            builder.setTurnCounter();
            builder.setMovesCounter();
            builder.setScores();
            builder.setCommands();
        };

        make();
        game = builder.getResult();

        notify('createGame');
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

    const getGameState = function () {
        return game.getGameState();
    };

    return Object.freeze(
        {
            attach: attach,
            detach: detach,

            createSession: createSession,
            createGame: createGame,

            // game operations
            nextTurn: nextTurn,
            selectNext: selectNext,
            hold: hold,
            moveUp: moveUp,
            moveDown: moveDown,
            moveLeft: moveLeft,
            moveRight: moveRight,
            click: click,
            undo: undo,
            redo: redo,

            // model state
            getPlayer: getPlayer,
            getPlayersIterator: getPlayersIterator,
            getGameState: getGameState,
        }
    );
};

export default Model;