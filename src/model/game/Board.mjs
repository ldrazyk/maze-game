import Field from "./Field.mjs";
import ArrayIterator from "../utils/ArrayIterator.mjs";
import shuffle from "../utils/shuffle.mjs";

const Board = function ({ matrixSpec, players }) {

    const { name, matrix } = matrixSpec;
    const size = { rows: 0, columns: 0};

    const fieldsArray = [];
    const fieldsMatrix = [];
    const fieldsDictionary = {};
    const paths = [];
    const exits = [];
    const walls = [];
    
    const setSize = function () {

        size.rows = matrix.length;
        size.columns = matrix[0].length;
    };

    const createFields = function () {

        const createField = function (row, column) {

            let type, specificArray;
            let exitNumber = false;
            let player = false;

            const typeCode = matrix[row][column];

            if (typeCode == 0) {
                type = 'path';
                specificArray = paths;
            }
            else if (typeCode == 1) {
                type = 'wall';
                specificArray = walls;
            }
            else {
                type = 'exit';
                specificArray = exits;

                if (typeCode == 2) exitNumber = 1;
                else exitNumber = 2;

                player = players.getPlayer(exitNumber);
            }

            const id = `f_${row + 1}_${column + 1}`;

            const field = Field({x: row + 1, y: column + 1, id: id, type: type, exitNumber: exitNumber, player: player});

            fieldsArray.push(field);
            fieldsMatrix[row].push(field);
            fieldsDictionary[id] = field;
            specificArray.push(field);
        };
       
        for (let row = 0; row < size.rows; row += 1) {

            fieldsMatrix.push([]);
            
            for (let column = 0; column < size.columns; column += 1) {

                createField(row, column);
            }
        }
    };

    const init = function() {
        
        setSize();
        createFields();
    }();
    

    const getIterator = function (type=false) {

        if (type == 'paths') {
            return ArrayIterator(paths);
        } else if (type == 'exits') {
            return ArrayIterator(exits);
        } else {
            return ArrayIterator(fieldsArray);    
        }
    };

    const getField = function({ id=false, x=false, y=false, direction=false }) {

        const getFieldByCoordinates = function (x, y) {
            return fieldsMatrix[x-1][y-1];
        };

        const getFieldInDirection = function (field, direction) {
            let x = field.getX();
            let y = field.getY();
            if (direction == 'up') x = x - 1;
            else if (direction == 'down') x = x + 1;
            else if (direction == 'left') y = y - 1;
            else if (direction == 'right') y = y + 1;

            return getFieldByCoordinates(x, y);
        };

        let field = false;

        if (id) {
            field = fieldsDictionary[id];
        } else if (x) {
            field = getFieldByCoordinates(x, y);
        }
        
        if (direction) {
            field = getFieldInDirection(field, direction);
        }

        return field;
    };

    const placePawns = function ({ playerNumber, pawnsIterator, startZoneSize }) {

        const getExit = function (playerNumber) {
            let exit;
    
            for (let n = 0; n < exits.length; n += 1) {
                exit = exits[n];
                if (playerNumber == exit.getExitNumber()) {
                    break;
                }
            }
            return exit;
        };

        const findStartZone = function (exit) {
            const startZone = [];

            const exitsX = exit.getX();
            const exitsY = exit.getY();
            
            let direction = -1;
            if (exitsX == 1) direction = 1;
            for (let xDistance = 1; xDistance <= startZoneSize; xDistance += 1) {
                for (let yDistance = -startZoneSize; yDistance <= startZoneSize; yDistance += 1) {
                    const field = getField({x: exitsX + direction * xDistance, y: exitsY + yDistance});
                    if (field && field.getType() == 'path') {
                        startZone.push(field);
                    }
                }
            }
            return startZone;
        };

        const place = function ({ pawnsIterator, startZone }) {

            shuffle(startZone);

            let n = 0;
            while (pawnsIterator.hasNext()) {
                const field = startZone[n];
                const pawn = pawnsIterator.next();
                pawn.move(field);
                field.take(pawn);
                n += 1;
            }
        };

        const exit = getExit(playerNumber);
        const startZone = findStartZone(exit);
        place({ pawnsIterator, startZone })
    };

    const getName = function() {
        return name;
    };

    const getRows = function() {
        return size.rows;
    };

    const getColumns = function() {
        return size.columns;
    };
    

    return Object.freeze(
        {
            placePawns: placePawns,
            getIterator: getIterator,
            getField: getField,
            getName: getName,
            getRows: getRows,
            getColumns: getColumns,            
        }
    );
};

export default Board;