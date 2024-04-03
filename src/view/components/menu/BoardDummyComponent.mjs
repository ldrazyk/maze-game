const BoardDummyComponent = function ({ boardDummy, factory }) {
    
    const elements = {};
    const props = {};

    const setProps = function () {
    
        props.id = boardDummy.getId();
        props.name = boardDummy.getName();
        props.size = boardDummy.getSize();
    };

    const createElements = function () {

        const createMain = function () {
        
            elements.main = factory.createElement({
                type: 'div',
                classList: 'board-dummy',
                id: props.id + '-dummy',
                datasets: {
                    name: props.name,
                    size: props.size,
                },
            })
        };

        const createFields = function () {

            const createRow = function (rowNumber, id) {
            
                elements[id] = factory.createElement(
                    {
                        type: 'div',
                        classList: 'row',
                        order: rowNumber,
                        parent: elements.main,
                    }
                );
            };

            const createField = function (field) {

                const rowId = 'row' + field.row;

                if (!elements[rowId]) {
                    createRow(field.row, rowId);
                }

                let playerClass = '';
                if (field.exitNumber) {
                    playerClass = 'player-' + field.exitNumber;
                }
            
                elements[field.id] = factory.createElement(
                    {
                        type: 'div',
                        classList: 'field ' + field.type + ' ' + playerClass,
                        order: field.column,
                        parent: elements[rowId],
                    }
                );
            };
        
            const iterator = boardDummy.getIterator();
    
            while (iterator.hasNext()) {
                createField(iterator.next());
            }
        };

        createMain();
        createFields();
    };

    const show = function (show=true) {
    
        if (show) {
            elements.main.classList.remove('hidden');
        } else {
            elements.main.classList.add('hidden');
        }
    };

    const init = function () {
    
        setProps();
        createElements();
        show(false);
    }();

    const update = function ({ code, gameState }) {

    };

    const getId = function () {
        
        return props.id;
    };

    const getName = function () {
        
        return props.name;
    };

    const getSize = function () {
        
        return props.size;
    };
    
    const getMain = function () {
        
        return elements.main;
    };
    
    return Object.freeze(
        {
            show,
            update,
            getId,
            getName,
            getSize,
            getMain,
        }
    );
};

export default BoardDummyComponent;