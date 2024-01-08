import Board from "./Board.mjs";
import Pawns from "./Pawns.mjs";
import MovesCounter from "./MovesCounter.mjs";
import TurnCounter from "./TurnCounter.mjs";
import Result from "./Result.mjs";
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

        for (let n = 0; n < players.getAmount(); n += 1) {

            const pawnsIterator = pawns.getIterator({ playerNumber: n + 1 });
            board.placePawns({ playerNumber, pawnsIterator, startZoneSize });
        }
    };

    const createTurnCounter = function () {
        turnCounter = TurnCounter();
    };

    const createResult = function () {
        result = Result(players);
    };

    const init = function() {

        createBoard(matrixSpec);
        createPawns(pawnsSpec);
        placePawns(2);
        createTurnCounter();
        createResult();

    }();

    const setCommands = function(newCommands) {
        commands = newCommands;
    };

    const getCommands = function() {
        return commands;
    };

    const endGame = function(code) {
        
        result.set(code);
        commands = CommandsEmpty();
        notify('endGame');
    };

    const updateReaches = function() {

        const iterator = pawns.getIterator({active: true});
        while (iterator.hasNext()) {
            const pawn = iterator.next();
            pawn.updateReach();
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
        if (oldPosition) {
            oldPosition.free();
        }
        pawn.move(position);
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

    const canPawnMoveToField = function ({ pawnSpec, fieldSpec }) {

        const getPawnFromSpec = function () {
            let { pawn, pawnId } = pawnSpec;

            if (!pawn) {
                pawn = pawns.getPawn(pawnId);
            }
            return pawn;
        };

        const getFieldFromSpec = function () {
            let { field } = fieldSpec;

            if (!field) {
                field = board.getField(fieldSpec);
            }
            return field;
        };

        const isMoveLegal = function (pawn, field) {
            let result = false;

            if (field.getType() == 'path') {

                result = true;

                const otherPawn = field.getPawn();
                if ( otherPawn && ( pawn.getPlayer() == otherPawn.getPlayer() || pawn.getKills() != otherPawn.getType() )) {
                    result = false;
                }

            } else if (position.getType() == 'exit' & pawn.getPlayer().getNumber() != position.getExitNumber()) {
                result = true;
            }
            return result;
        };

        let result = false;
        const pawn = getPawnFromSpec();
        const field = getFieldFromSpec();
        if (field && isMoveLegal(pawn, field)) {
            result = field;
        }

        return result;
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
        return result.getResult();
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
            canPawnMoveToField: canPawnMoveToField,

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