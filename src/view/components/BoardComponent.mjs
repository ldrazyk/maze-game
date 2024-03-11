const BoardComponent = function({ gameState, factory }) {
    
    let mainElement;
    const rowElements = [];
    const pathComponents = {};
    const id = 'board';
    const props = {
        name: gameState.getBoardName(),
        rows: gameState.getBoardRows(),
        columns: gameState.getBoardColumns(),
    }
    let mediator;

    const createElements = function () {

        const createMainElement = function () {

            const getFieldSizeClass = function () {
            
                let size;

                if (props.rows < 8) {
                    size = 'large';
                } else if (props.rows < 10) {
                    size = 'medium';
                } else {
                    size = 'small';
                }

                return size + '-fields';
            };

            mainElement = factory.createElement(
                { 
                    type: 'div',
                    classList: 'board ' + getFieldSizeClass(),
                    datasets: { name: props.name, rows: props.rows, columns: props.columns },
                }
            );
        };

        const createRowElements = function () {

            const createRow = function (number) {

                const rowElement = factory.createElement(
                    {
                        type: 'div',
                        classList: 'row',
                        id: 'row_' + number,
                        order: number,
                        parent: mainElement,
                    }
                );
                
                rowElements.push(rowElement);
            };

            for (let n = 0; n < props.rows; n += 1) {
                
                createRow(n + 1);
            }
        };

        const createFieldComponents = function () {

            const iterator = gameState.getBoardIterator();

            while (iterator.hasNext()) {

                const field = iterator.next();

                const component = factory.createComponent(
                    {
                        type: 'field',
                        field: field, 
                        onClick: (id) => mediator.click(id),
                        factory,
                    }
                );

                factory.append(
                    {
                        parent: rowElements[component.getRow() - 1],
                        child: component
                    }
                );
                
                if (component.getType() != 'wall') {
                    pathComponents[component.getId()] = component;
                }

            }
        };

        createMainElement();
        createRowElements();
        createFieldComponents();
    };

    const init = function() {

        createElements();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const update = function ({ code, object }) {

        const updatePawns = function () {

            Object.values(pathComponents).forEach(component => {
                component.updatePawn();
            });
        };

        const updateHighlights = function () {

            Object.values(pathComponents).forEach(component => {
                component.updateHighlight(object);
            });
        };
        

        if (['createGame', 'move'].includes(code)) {
            updatePawns();
        }
        if ( ['select', 'move', 'hold', 'nextTurn', 'endGame'].includes(code) ) {
            updateHighlights();
        }
    };

    const getId = function () {
        
        return id;
    };

    const getMain = function () {
    
        return mainElement;
    };

    return Object.freeze(
        {
            setMediator,
            init,
            update,
            getId,
            getMain,
        }
    );
};

export default BoardComponent;