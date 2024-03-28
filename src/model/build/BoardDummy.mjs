import ArrayIterator from "../utils/ArrayIterator.mjs";

const BoardDummy = function ({ id, name, matrix, size }) {

    const fields = [];

    const createFields = function () {

        const createField = function (row, column) {
        
            const typeCode = matrix[row][column];

            let type, exitNumber=false;

            if (typeCode == 0) {
                type = 'path';
            } else if (typeCode == 1) {
                type = 'wall';
            } else {
                type = 'exit';
                exitNumber = typeCode - 1;
            }

            const field = {
                row,
                column,
                type,
            }

            if (exitNumber) {
                field.exitNumber = exitNumber;
            }

            return field;
        };
    
        for (let row = 0; row < size; row += 1) {

            for (let column = 0; column < size; column += 1) {

                fields.push(createField(row, column));
            }
        }
    };

    const init = function () {
    
        createFields();
    }();

    const getIterator = function () {

        return ArrayIterator(fields);
    };

    const getId = function () {
    
        return id;
    };

    const getName = function () {
    
        return name;
    };
    
    const getSize = function () {
    
        return size;
    };
    
    return Object.freeze(
        {
            getIterator,
            getId,
            getName,
            getSize,
        }
    );
};

export default BoardDummy;