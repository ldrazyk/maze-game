const ArraySelector = function (array) {

    let index = 0;

    const selectIndex = function (newIndex) {

        const checkMin = function () {
        
            if (index < 0) {
                index = array.length - 1;
                return true
            } else {
                return false;
            }
        };

        const checkMax = function () {
        
            if (index >= array.length) {
                index = 0;
            }
        };

        index = newIndex;

        if (!checkMin()) {
            checkMax();
        }
    };

    const selectNext = function (direction=1) {

        selectIndex(index + direction);
    };
    
    const selectItem = function (item) {
    
        if (array.includes(item)) {

            index = array.indexOf(item);
        }
    };

    const getSelected = function () {
    
        return array[index];
    };

    const getIndex = function () {
    
        return index;
    };
    
    return Object.freeze(
        {
            selectIndex,
            selectNext,
            selectItem,
            getSelected,
            getIndex,
        }
    );
};

export default ArraySelector;