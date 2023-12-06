import Board from "./Board.mjs";
import Pawns from "./Pawns.mjs";
import MovesCounter from "./MovesCounter.mjs";
import CommandsEmpty from "../commands/CommandsEmpty.mjs";
import shuffle from "../utils/shuffle.mjs";

const Game = function ({ players, gameNumber, matrixSpec, pawnsSpec, notify }) {
    let commands;
    let board, pawns;
    let turnCounter, turnNumber, activePlayer, passivePlayer, movesCounter, result;
    //movesCounter: obiekt, sortowanie kolejności pionków i sprawdzanie maxHold

    const createBoard = function(matrixSpec) {
        board = Board({matrixSpec: matrixSpec, players: players});
    };

    const createPawns = function(pawnsSpec) {
        pawns = Pawns({pawnsSpec: pawnsSpec, players: players});
    };

    const placePawns = function (startZoneSize=1) {

        const findExit = function (playerNumber) {
            let exit;
            const exitsIterator = board.getIterator('exits');
            while (exitsIterator.hasNext()) {
                exit = exitsIterator.next();
                if (playerNumber == exit.getExitNumber()) {
                    break;
                }
            }
            return exit;
        };

        const findStartZone = function (exit) {
            const startZone = [];

            const x = exit.getX();
            const y = exit.getY();
            
            let direction = -1;
            if (x == 1) direction = 1;
            for (let xDistance = 1; xDistance <= startZoneSize; xDistance += 1) {
                for (let yDistance = -startZoneSize; yDistance <= startZoneSize; yDistance += 1) {
                    const field = board.getField({x: x + direction * xDistance, y: y + yDistance});
                    if (field && field.getType() == 'path') {
                        startZone.push(field);
                    }
                }
            }
            return startZone;
        };

        const placePlayersPawns = function ({ playerNumber, startZone }) {

            shuffle(startZone);

            const pawnsIterator = pawns.getIterator({playerNumber: playerNumber});

            let n = 0;
            while (pawnsIterator.hasNext()) {
                const field = startZone[n];
                const pawn = pawnsIterator.next();
                pawn.move(field);
                field.take(pawn);
                n += 1;
            }
        };

        for (let playerNumber = 1; playerNumber <= players.length; playerNumber += 1) {
            const exit = findExit(playerNumber);
            const startZone = findStartZone(exit);
            placePlayersPawns({ playerNumber, startZone });
        }
    };

    const init = function() {

        createBoard(matrixSpec);
        createPawns(pawnsSpec);
        placePawns(2);
        
        turnCounter = 0;
        turnNumber = 0;

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
                result = {ended: true, winner: activePlayer, looser: passivePlayer, type: code};
            } else if (code = 'no_pawns') {
                result = {ended: true, winner: passivePlayer, looser: activePlayer, type: code};
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
            turnCounter += 1;
            if (turnCounter % 2 == 1) {
                turnNumber += 1;
            }
            console.log('Turn number: ' + turnNumber);  // test
        };

        const changeActivePlayer = function() {
            if ((gameNumber + turnCounter) % 2 == 0) {
                activePlayer = players[0];
                passivePlayer = players[1];
            } else {
                activePlayer = players[1];
                passivePlayer = players[0];
            }
            console.log('Active players number: ' + activePlayer.getNumber());  // test
        };
    
        const changeActivePawns = function () {
            pawns.setActivePawns(activePlayer.getNumber());
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
        if (turnCounter == 0 || !movesCounter.canMove()) {
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
            getResult: getResult,
            
        }
    );
};

export default Game;