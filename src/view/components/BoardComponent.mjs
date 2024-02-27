import FieldComponent from './FieldComponent.mjs';
import createElement from '../utils/createElement.mjs';

const BoardComponent = function({ gameState }) {
    
    let mainElement;
    const id = 'board';
    const rowElements = [];
    const pathComponents = {};
    let name, rows, columns;
    
    let mediator;

    const setProps = function () {

        name = gameState.getBoardName();
        rows = gameState.getBoardRows();
        columns = gameState.getBoardColumns();
    };

    const createElements = function () {

        const createMainElement = function () {

            const getFieldSizeClass = function () {
            
                let size;

                if (rows < 8) {
                    size = 'large';
                } else if (rows < 10) {
                    size = 'medium';
                } else {
                    size = 'small';
                }

                return size + '-fields';
            };

            mainElement = createElement(
                { 
                    type: 'div',
                    classList: 'board ' + getFieldSizeClass(),
                    datasets: { name, rows, columns },
                }
            );
        };

        const createRowElements = function () {

            const createRow = function (number) {

                const rowElement = createElement(
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

            for (let n = 0; n < rows; n += 1) {
                
                createRow(n + 1);
            }
        };

        const createFieldComponents = function () {

            const getSvgCopy = function (name) {
            
                return mediator.getSvgCopy(name);
            };

            const iterator = gameState.getBoardIterator();

            while (iterator.hasNext()) {

                const field = iterator.next();

                const component = FieldComponent(
                    {
                        field: field, 
                        onClick: (id) => mediator.click(id),
                        getSvgCopy: getSvgCopy,
                    }
                );
                
                if (component.getType() != 'wall') {
                    pathComponents[component.getId()] = component;
                }

                rowElements[component.getRow() - 1].appendChild(component.getMain());
            }
        };

        createMainElement();
        createRowElements();
        createFieldComponents();
    };

    const init = function() {

        setProps();
        createElements();
    };

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