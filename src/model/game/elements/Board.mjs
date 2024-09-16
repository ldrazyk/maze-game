import Field from "./Field.mjs";
import ArrayIterator from "../../utils/ArrayIterator.mjs";
import shuffle from "../../utils/shuffle.mjs";

const Board = function ({ name, matrix }) {

    const size = { rows: 0, columns: 0};

    const fieldsArray = [];
    const fieldsMatrix = [];
    const fieldsDictionary = {};
    const paths = [];
    const exits = [];
    const walls = [];

    let game;

    const setComponents = function (components) {

        game = components.gameMediator;
    };
    
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

                exitNumber = typeCode - 1;

                player = game.getPlayer(exitNumber);
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
    };

    const getIterator = function (type=false) {

        if (type == 'paths') {
            return ArrayIterator(paths);
        } else if (type == 'exits') {
            return ArrayIterator(exits);
        } else {
            return ArrayIterator(fieldsArray);    
        }
    };

    const getField = function({ id=false, x=false, y=false, field=false, direction=false }) {

        const getFieldById = function (id) {
        
            return fieldsDictionary[id];
        };

        const getFieldByCoordinates = function (x, y) {
            try {
                return fieldsMatrix[x-1][y-1];
            } catch {
                return false;
            }
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

        if (id) {

            field = getFieldById(id);

        } else if (x) {

            field = getFieldByCoordinates(x, y);
        }
        
        if (direction) {
            
            field = getFieldInDirection(field, direction);
        }

        return field;
    };

    const getPawnOnField = function (id) {
    
        const field = getField({id});

        if (field) {
            return field.getPawn();
        } else {
            return false;
        }
    };

    const fieldHasActive = function (id) {
    
        const pawn = getPawnOnField(id);

        if (pawn) {
            return pawn.isActive();
        } else {
            return false;
        }
    };

    const placePawns = function ({ playerNumber, pawnsIterator }) {

        const getStartZone = function () {

            const findStartAreaExtremes = function () {

                const getStartAreaSize = function () {
        
                    return ( size.columns - 3 ) / 2;
                };

                const getExitX = function () {

                    for (let exit of exits) {
                        if (playerNumber == exit.getExitNumber()) {

                            return(exit.getX());
                        }
                    }
                };

                const getDirection = function (exitX) {
            
                    if (exitX == 1) {
                        return 1;
                    } else {
                        return -1;
                    }
                };

                const findExtremes = function () {
                
                    const startAreaSize = getStartAreaSize();
                    const exitX = getExitX();
                    const direction = getDirection(exitX);
    
                    let x, y;
    
                    x = [exitX + direction * 1, exitX + direction * startAreaSize];
                    y = [2, size.columns - 1];
    
                    if (direction == -1) {
                        x = [x[1], x[0]];
                    }
                
                    return [x, y];
                };

                return findExtremes();
            };

            const findStartZone = function ([[xMin, xMax], [yMin, yMax]]) {

                const startZone = [];
            
                for (let x = xMin; x <= xMax; x += 1) {
                    for (let y = yMin; y <= yMax; y += 1) {

                        const field = getField({ x, y });

                        if (field && field.getType() == 'path') {
                            startZone.push(field);
                        }
                    }
                }
                return startZone;
            };

            return findStartZone( findStartAreaExtremes() );
        };

        const place = function ({ pawnsIterator, startZone }) {

            shuffle(startZone);

            let n = 0;
            while (pawnsIterator.hasNext()) {

                const field = startZone[n];
                const pawn = pawnsIterator.next();
                game.managePlace({pawn, position: field});
                n += 1;
            }
        };

        place({ pawnsIterator, startZone: getStartZone() });
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
            setComponents,
            init,

            placePawns,
            getIterator,
            getField,
            getPawnOnField,
            fieldHasActive,
            getName,
            getRows,
            getColumns,
        }
    );
};

export default Board;