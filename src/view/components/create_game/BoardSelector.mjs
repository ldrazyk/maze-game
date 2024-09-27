import ArraySelector from "../../utils/ArraySelector.mjs";

const BoardSelector = function ({ iterator, hasId=false, hasSize=false }) {

    let idSelector, sizeSelector;
    const idBySizeSelectors = {};
    const names = {};

    const createArraySelectors = function () {

        const getArrays = function () {

            const idArray = []; 
            const sizeArray = [];
            const idBySizeArrays = {};

            const addSize = function (size) {
            
                if (!sizeArray.includes(size)) {
                    
                    sizeArray.push(size);
                    idBySizeArrays[size] = [];
                }
            };

            const addId = function ({ id, size }) {
            
                idArray.push(id);
                idBySizeArrays[size].push(id);
            };

            const addName = function ({ id, name }) {
            
                names[id] = name;
            };


            while (iterator.hasNext()) {

                const board = iterator.next();
                const id = board.getId();
                const size = board.getSize();
                const name = board.getName();

                addSize(size);
                addId({ id, size });
                addName({ id, name });
            }

            return { idArray, sizeArray, idBySizeArrays };
        };
    
        const createSelectors = function ({ idArray, sizeArray, idBySizeArrays }) {
        
            idSelector = ArraySelector(idArray);
            sizeSelector = ArraySelector(sizeArray);

            for (let [size, array] of Object.entries(idBySizeArrays)) {

                idBySizeSelectors[size] = ArraySelector(array);
            }
        };

        createSelectors(getArrays());
    };

    const init = function () {
    
        createArraySelectors();
    }();

    const getSize = function () {
    
        if (hasSize) {
            return sizeSelector.getSelected();
        } else {
            return false;
        }
    };

    const getId = function () {
    
        if (hasId) {
            if (hasSize) {

                return idBySizeSelectors[getSize()].getSelected();
            } else {

                return idSelector.getSelected();
            }
        } else {
            return false;
        }
    };

    const getName = function () {
    
        return names[getId()];
    };
    
    const nextSize = function (direction) {

        sizeSelector.selectNext(direction);
    };
    
    const nextId = function (direction) {

        let selector;

        if (hasSize) {
            selector = idBySizeSelectors[getSize()]
        } else {
            selector = idSelector;
        }
    
        selector.selectNext(direction);
    };

    const toggleSize = function () {

        hasSize = !hasSize;
    };

    const toggleId = function () {
    
        hasId = !hasId;
    };

    const activateSize = function (active) {
    
        hasSize = active;
    };

    const activateId = function (active) {
    
        hasId = active;
    };

    return Object.freeze(
        {
            getSize,
            getId,
            getName,
            nextSize,
            nextId,
            toggleSize,
            toggleId,
            activateSize,
            activateId,
        }
    );
};

export default BoardSelector;