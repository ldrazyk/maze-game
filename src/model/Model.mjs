import Subject from "./utils/Subject.mjs";
import GameBuilder from "./game/GameBuilder.mjs";
import Session from "./session/Session.mjs";
import EndedGameAdapter from "./game/EndedGameAdapter.mjs";

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

    const killCommands = function () {
        
        game = EndedGameAdapter(game);
    };


    const createSession = function({ playersSpec }) {
        
        session = Session({ playersSpec: playersSpec });
        notify('createSession');
    };

    const createGame = function({ matrixSpec, pawnsSpec }) {
        
        const builder = gameBuilder;

        const make = function () {
            builder.reset();
            builder.setNotify(notify);
            builder.setNumber(session.getGameNumber());
            builder.setPlayers(session.getPlayers());
            builder.setBoard(matrixSpec);
            builder.setPawns(pawnsSpec);
            builder.setTurnCounter();
            builder.setMovesCounter();
            builder.setScores();
            builder.setCommands();
            builder.setKillCommands(killCommands);
        };

        make();
        game = builder.getResult();

        notify('createGame');
    };

    const nextTurn = function() {
        game.nextTurn();
    };

    const selectNext = function () {
        game.selectNext();
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


    const getPlayer = function (number) {
        return session.getPlayer(number);
    };

    const getPlayersIterator = function() {
        return session.getPlayersIterator();
    };

    const getBoardIterator = function() {
        return game.getBoardIterator();
    };

    const getBoardName = function() {
        return game.getBoardName();
    };

    const getBoardRows = function() {
        return game.getBoardRows();
    };

    const getBoardColumns = function() {
        return game.getBoardColumns();
    };

    const getPawnsIterator = function(spec) {
        return game.getPawnsIterator(spec);
    };

    const getSelected = function() {
        return game.getSelected();
    };

    const getGameNumber = function() {
        return game.getNumber();
    };

    const getTurnNumber = function() {
        return game.getTurnNumber();
    };

    const getScore = function() {
        return game.getScore();
    };

    return Object.freeze(
        {
            attach: attach,
            detach: detach,

            createSession: createSession,
            createGame: createGame,

            // UI
            nextTurn: nextTurn,
            selectNext: selectNext,
            click: click,
            undo: undo,
            redo: redo,
            hold: hold,
            moveUp: moveUp,
            moveDown: moveDown,
            moveLeft: moveLeft,
            moveRight: moveRight,

            getPlayer: getPlayer,
            getPlayersIterator: getPlayersIterator,
            getBoardIterator: getBoardIterator,
            getBoardName: getBoardName,
            getBoardRows: getBoardRows,
            getBoardColumns: getBoardColumns,
            getPawnsIterator: getPawnsIterator,
            getSelected: getSelected,
            getGameNumber: getGameNumber,
            getTurnNumber: getTurnNumber,
            getScore: getScore,
        }
    );
};

export default Model;