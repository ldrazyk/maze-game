import Session from "./Session.mjs";
import Subject from "./utils/Subject.mjs";

const Model = function() {
    let subject, session, game;

    const createSubject = function () {
        
        subject = Subject();
    };

    const init = function () {

        createSubject();
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
        
        const spec = { matrixSpec: matrixSpec, pawnsSpec: pawnsSpec, notify: notify }
        session.createGame(spec);
        game = session.getGame();
        notify('createGame');
    };

    const nextTurn = function() {
        game.getCommands().nextTurn();
    };

    const selectNext = function () {
        game.getCommands().selectNext();
    };

    const click = function (fieldId) {
        game.getCommands().click(fieldId);
    };

    const undo = function () {
        game.getCommands().undo();
    };

    const redo = function () {
        game.getCommands().redo();
    };

    const hold = function () {
        game.getCommands().hold();
    };

    const moveUp = function () {
        game.getCommands().moveUp();
    };

    const moveDown = function () {
        game.getCommands().moveDown();
    };

    const moveLeft = function () {
        game.getCommands().moveLeft();
    };

    const moveRight = function () {
        game.getCommands().moveRight();
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

    const getResult = function() {
        return game.getResult();
    };

    return Object.freeze(
        {
            attach: attach,
            detach: detach,

            createSession: createSession,
            createGame: createGame,
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
            getResult: getResult,
        }
    );
};

export default Model;