import Board from "./Board.mjs";
import Pawns from "./Pawns.mjs";
import MovesCounter from "./MovesCounter.mjs";
import TurnCounter from "./TurnCounter.mjs";
import CommandsEmpty from "../commands/CommandsEmpty.mjs";

const Game = function ({ players, gameNumber, matrixSpec, pawnsSpec, notify }) {
    let commands;
    let board, pawns;
    let turnCounter, movesCounter, result;
    //movesCounter: obiekt, sortowanie kolejności pionków i sprawdzanie maxHold

    const createBoard = function(matrixSpec) {
        board = Board({matrixSpec: matrixSpec, players: players});
    };

    const createPawns = function(pawnsSpec) {
        pawns = Pawns({pawnsSpec: pawnsSpec, players: players});
    };

    const placePawns = function (startZoneSize=1) {

        for (let playerNumber = 1; playerNumber <= 2; playerNumber += 1) {

            const pawnsIterator = pawns.getIterator({ playerNumber: playerNumber });
            board.placePawns({ playerNumber, pawnsIterator, startZoneSize });
        }
    };

    const createTurnCounter = function () {
        turnCounter = TurnCounter();
    };

    const init = function() {

        createBoard(matrixSpec);
        createPawns(pawnsSpec);
        placePawns(2);
        createTurnCounter();

        result = {ended: false, winner: false, looser: false, type: false};
    }();

    const setCommands = function(newCommands) {
        commands = newCommands;
    };

    const getCommands = function() {
        return commands;
    };

    const endGame = function(code) {
        
        const setResult = function (code) {

            if (code == 'exit') {
                result = {ended: true, winner: players.getActive(), looser: players.getActive(false), type: code};
            } else if (code = 'no_pawns') {
                result = {ended: true, winner: players.getActive(false), looser: players.getActive(), type: code};
            }
        };

        setResult(code);
        commands = CommandsEmpty();
        notify('endGame');
    };

    const updateReaches = function() {

        const createReachSpec = function({ position, direction, pawn }) {

            let reach = false;
            
            if (position) {
                if (position.getType() == 'path') {
                    const otherPawn = position.getPawn();
                    if (otherPawn == false) {
                        reach = position;
                    }
                    else if (pawn.getPlayer() !== otherPawn.getPlayer() & pawn.getKills() == otherPawn.getType()) {
                        reach = position;
                    }
                } else if (position.getType() == 'exit' & pawn.getPlayer().getNumber() != position.getExitNumber()) {
                    reach = position;
                }
            }

            return {reach: reach, direction: direction};
        };

        const updatePawnReach = function (pawn) {

            const position = pawn.getPosition();
            const x = position.getX();
            const y = position.getY();
            const moveUp = {position: board.getField({x: x - 1, y: y}), direction: 'up', pawn: pawn};
            const moveDown = {position: board.getField({x: x + 1, y: y}), direction: 'down', pawn: pawn};
            const moveLeft = {position: board.getField({x: x, y: y - 1}), direction: 'left', pawn: pawn};
            const moveRight = {position: board.getField({x: x, y: y + 1}), direction: 'right', pawn: pawn};
            const moves = [moveUp, moveDown, moveLeft, moveRight];
            const reaches = moves.map(createReachSpec);
            let reachObject = {};
            for (const r of reaches) {
                reachObject[r.direction] = r.reach;
            }
            pawn.setReach(reachObject);
        };

        const iterator = pawns.getIterator({active: true});
        while (iterator.hasNext()) {
            const pawn = iterator.next();
            updatePawnReach(pawn);
        }
    };

    const nextTurn = function() {

        const changeTurnNumber = function() {
            turnCounter.next();
        };

        const changeActivePlayer = function() {
            players.changeActive();
        };
    
        const changeActivePawns = function () {
            pawns.setActivePawns(players.getActive().getNumber());
            updateReaches();
            if (pawns.hasNext()) {
                pawns.selectNext();
                notify('nextTurn');
            } else {
                endGame('no_pawns');
            }
        };

        const createMovesCounter = function() {
            movesCounter = MovesCounter(pawns.getActiveAmount());
        };

        changeTurnNumber();
        changeActivePlayer();
        changeActivePawns(); // has selectNext() and updateReaches()
        createMovesCounter();
    };

    const movePawn = function({ pawn, position }) {

        const oldPosition = pawn.getPosition();
        pawn.move(position);
        oldPosition.free();
        position.take(pawn);
    };

    const cleanAfterMove = function({ pawn, type, undo }) {

        const updateMovesCounter = function() {
            if (!undo) {
                movesCounter.add(type);
            } else {
                movesCounter.remove(type);
            }
        };

        const updatePawnsOrder = function() {
            pawn.setOrder(movesCounter.getMoves());
        };

        const disactivatePawn = function() {
            pawn.setActive(undo);
        };

        const maybeUpdateReaches = function() {
            if (type == 'move') {
                updateReaches();
            }
        };

        const selectNextAfterMove = function() {
            pawns.selectNext();
        };

        const checkExitWin = function() {
            if (pawn.getPosition().getType() == 'exit') {
                endGame('exit');
            }
        };

        updateMovesCounter();
        updatePawnsOrder();
        disactivatePawn();
        maybeUpdateReaches();
        selectNextAfterMove();
        notify(type);
        checkExitWin();
    };

    const select = function (id) {
        const isSelected = pawns.select(id);
        if (isSelected) {
            notify('select');
        }
    };

    const selectNext = function() {
        const isSelected = pawns.selectNext();
        if (isSelected) {
            notify('select');
        }
    };

    const canHold = function() {
        return movesCounter.canHold();
    };

    const canStartTurn = function() {
        if ( turnCounter.getTurn() == 0 || !movesCounter.canMove() ) {
            return true;
        } else {
            return false;
        }
    };

    // get

    // get pawns

    const getSelected = function() {
        return pawns.getSelected();
    }; 

    const getPawn = function (id) {
        return pawns.getPawn(id);
    };

    const getPawnsIterator = function(spec) {
        return pawns.getIterator(spec);
    };

    // get board

    const getField = function (spec) {
        return board.getField(spec);
    };

    const getBoardIterator = function() {
        return board.getIterator();
    };

    const getBoardName = function() {
        return board.getName();
    };

    const getBoardRows = function() {
        return board.getRows();
    };

    const getBoardColumns = function() {
        return board.getColumns();
    };

    // get game

    const getNumber = function() {
        return gameNumber;
    };

    const getResult = function() {
        return result;
    };

    return Object.freeze(
        {
            setCommands: setCommands,
            getCommands: getCommands,

            updateReaches: updateReaches,
            nextTurn: nextTurn,
            select: select,
            selectNext: selectNext,
            movePawn: movePawn,
            cleanAfterMove: cleanAfterMove,
            canHold: canHold,
            canStartTurn: canStartTurn,

            getSelected: getSelected,
            getPawn: getPawn,
            getPawnsIterator: getPawnsIterator,
            getField: getField,
            getBoardIterator: getBoardIterator,
            getBoardName: getBoardName,
            getBoardRows: getBoardRows,
            getBoardColumns: getBoardColumns,
            getNumber: getNumber,
            getResult: getResult,
            
        }
    );
};

export default Game;