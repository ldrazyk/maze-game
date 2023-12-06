function ArrayIterator(array) {
    let position = 0;
    
    const hasNext = function() {
        if (position < array.length) {
            return true;
        } else return false;
    };

    const next = function() {
        let element = array[position];
        position += 1;
        return element;
    };

    const getItems = function() {
        return array.length;
    };

    return Object.freeze(
        {
            hasNext: hasNext,
            next: next,
            getItems: getItems,
        }
    );
};

export default ArrayIterator;