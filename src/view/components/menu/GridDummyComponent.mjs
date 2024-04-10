const GridDummyComponent = function ({ factory, size }) {
    
    const elements = {};
    const props = {
        id: 'grid' + size,
        name: 'Grid of size ' + size,
    }

    const createElements = function () {
    
        elements.main = factory.createElement({
            type: 'div',
            classList: 'board-dummy',
            id: props.id + '-dummy',
            datasets: {
                name: props.name,
                size,
            },
        });

        const createRow = function (row) {

            const id = 'row-' + row;
        
            elements[id] = factory.createElement(
                {
                    type: 'div',
                    classList: 'row',
                    order: row,
                    parent: elements.main,
                }
            );
        };

        const createField = function (row, column) {
        
            const id = 'field-' + row + '-' + column;

            elements[id] = factory.createElement(
                {
                    type: 'div',
                    classList: 'field path',
                    order: column,
                    parent: elements['row-' + row],
                }
            );
        };

        for (let row = 0; row < size; row += 1) {

            createRow(row);

            for (let column = 0; column < size; column += 1) {

                createField(row, column);
            }
        }
    };

    const show = function (show=true) {
    
        if (show) {
            elements.main.classList.remove('hidden');
        } else {
            elements.main.classList.add('hidden');
        }
    };

    const init = function () {
    
        createElements();
        show(false);
    }();
        
    const getMain = function () {
        
        return elements.main;
    };
    
    return Object.freeze(
        {
            show,
            getMain,
        }
    );
};

export default GridDummyComponent;