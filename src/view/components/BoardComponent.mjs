import FieldComponent from './FieldComponent.mjs';

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

            const iterator = gameState.getBoardIterator();
            while (iterator.hasNext()) {

                const field = iterator.next();

                const component = FieldComponent({field: field, onClick: (id) => mediator.click(id) });
                
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

    const getId = function () {
        
        return id;
    };

    const getMain = function () {
    
        return mainElement;
    };

    return Object.freeze(
        {
            setMediator,
            update,
            getId,
            getMain,
        }
    );
};

export default BoardComponent;