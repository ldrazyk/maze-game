import Field from "./Field.mjs";
import ArrayIterator from "../utils/ArrayIterator.mjs";

const Board = function ({ matrixSpec, players }) {

    const { name, matrix } = matrixSpec;
    const params = { name: name, rows: 0, columns: 0};

    const fieldsArray = [];
    const fieldsMatrix = [];
    const fieldsDictionary = {};
    const paths = [];
    const exits = [];
    const walls = [];
    
    const setParams = function () {

        params.rows = matrix.length;
        params.columns = matrix[0].length;
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

                player = players[exitNumber - 1];
            }

            const id = `f_${row + 1}_${column + 1}`;

            const field = Field({x: row + 1, y: column + 1, id: id, type: type, exitNumber: exitNumber, player: player});

            fieldsArray.push(field);
            fieldsMatrix[row].push(field);
            fieldsDictionary[id] = field;
            specificArray.push(field);
        };
       
        for (let row = 0; row < params.rows; row += 1) {

            fieldsMatrix.push([]);
            
            for (let column = 0; column < params.columns; column += 1) {

                createField(row, column);
            }
        }
    };

    const init = function() {
        
        setParams();
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

    const getField = function({id=false, x=false, y=false}) {

        let field = false;

        if (id) {
            try {field = fieldsDictionary[id];}
            catch {}
        }
        else if (x) {
            try {field = fieldsMatrix[x-1][y-1];}
            catch {}
        }
        return field;
    };

    const getName = function() {
        return params.name;
    };

    const getRows = function() {
        return params.rows;
    };

    const getColumns = function() {
        return params.columns;
    };
    

    return Object.freeze(
        {
            getIterator: getIterator,
            getField: getField,
            getName: getName,
            getRows: getRows,
            getColumns: getColumns,            
        }
    );
};

export default Board;