import FieldComponent from './FieldComponent.mjs';

const BoardComponent = function({ initGameState, onFieldClick }) {
    let mainElement;
    let name, rows, columns;
    const rowElements = [];
    const pathComponents = {};

    const setProps = function () {

        name = initGameState.getBoardName();
        rows = initGameState.getBoardRows();
        columns = initGameState.getBoardColumns();
    };

    const createElements = function () {

        const createMainElement = function () {

            mainElement = document.createElement('div');
            mainElement.classList.add('board');
            
            mainElement.dataset.name = name;
            mainElement.dataset.rows = rows;
            mainElement.dataset.columns = columns;
        };

        const createRowElements = function () {

            const createRow = function (number) {

                const rowElement = document.createElement('div');
                rowElement.classList.add('row');
                rowElement.id = 'row_' + number;
                rowElement.style.order = number;
                rowElements.push(rowElement);
                mainElement.appendChild(rowElement);
            };

            for (let n = 0; n < rows; n += 1) {
                
                createRow(n + 1);
            }
        };

        const createFieldComponents = function () {

            const iterator = initGameState.getBoardIterator();
            while (iterator.hasNext()) {

                const field = iterator.next();

                const component = FieldComponent({field: field, onClick: onFieldClick });
                
                if (component.getType() != 'wall') {
                    pathComponents[component.getId()] = component;
                }

                component.appendTo(rowElements[component.getRow() - 1]);
            }
        };

        createMainElement();
        createRowElements();
        createFieldComponents();
    };

    const init = function() {

        setProps();
        createElements();
    }();

    const appendTo = function (container) {
        
        container.appendChild(mainElement);
    };

    const update = function ({ code, object }) {

        const updatePawns = function () {

            Object.values(pathComponents).forEach(component => {
                component.updatePawn();
            });
        };

        const updateHighlights = function () {

            const gameState = object;
            const selected = gameState.getSelected();

            Object.values(pathComponents).forEach(component => {
                component.updateHighlight(selected);
            });
        };
        

        if (['createGame', 'move'].includes(code)) {
            updatePawns();
        }
        if ( ['select', 'move', 'hold', 'nextTurn', 'endGame'].includes(code) ) {
            updateHighlights();
        }
    };

    return Object.freeze(
        {
            appendTo: appendTo,
            update: update,
        }
    );
};

export default BoardComponent;