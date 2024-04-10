const BoardSelector = function ({ iterator }) {

    const names = {};
    const ids = { array: [], index: 0 };
    const sizes = { array: [], index: 0 };
    const idsBySize = {};

    let hasSize = false;
    let hasId = false;


    const __getItem = function (object) {
    
        return object.array[object.index];
    };

    const getSize = function () {

        if (hasSize) {
            return __getItem(sizes);
        } else {
            return false;
        }
    };

    const getId = function () {
    
        if (hasId) {
            if (hasSize) {
                return __getItem( idsBySize[getSize()] );
            } else {
                return __getItem(ids);
            }
        } else {
            return false;
        }
    };
    
    const setListObjects = function () {
    
        while (iterator.hasNext()) {

            const boardDummyComponent = iterator.next();

            const id = boardDummyComponent.getId();
            const size = boardDummyComponent.getSize();
            const name = boardDummyComponent.getName();
            
            const addSize = function () {
            
                if (!sizes.array.includes(size)) {
                    
                    sizes.array.push(size);
                    idsBySize[size] = { array: [], index: 0 };
                }
            }();

            const addId = function () {
            
                ids.array.push(id);
                idsBySize[size].array.push(id);
            }();

            const addName = function () {
            
                names[id] = name;
            }();
        };
    };

    const init = function () {
    
        setListObjects();
    }();

    
    const setHasSize = function (newHasSize) {
    
        hasSize = newHasSize;
    };
    
    const setHasId = function (newHasId) {
        
        hasId = newHasId;
    };

    const toggleHasSize = function () {

        hasSize = !hasSize;
    };

    const toggleHasId = function () {
    
        hasId = !hasId;
    };

    const __changeIndex = function ({ object, direction }) {
    
        let index = object.index + direction;
        let array = object.array;

        if (index < 0) {
            index = array.length - 1;
        } else if (index >= array.length) {
            index = 0;
        }

        object.index = index;
    };

    const changeSize = function (direction) {

        if (!hasSize) {
            toggleHasSize();
        }
    
        __changeIndex({ object: sizes, direction })
    };

    const changeId = function (direction) {

        if (!hasId) {
            toggleHasId();
        }
    
        let idsObject;

        if (hasSize) {
            idsObject = idsBySize[getSize()];
        } else {
            idsObject = ids;
        }

        __changeIndex({ object: idsObject, direction });
    };

    const getState = function () {

        const getName = function (id) {
    
            if (id) {
                return names[id];
            } else {
                return false;
            }
        };
    
        const size = getSize();
        const id = getId();
        const name = getName(id);

        return { size, id, name, hasSize, hasId };
    };
    
    return Object.freeze(
        {
            setHasSize,
            setHasId,
            toggleHasSize,
            toggleHasId,
            changeSize,
            changeId,
            getSize,
            getId,
            getState,
        }
    );
};

export default BoardSelector;