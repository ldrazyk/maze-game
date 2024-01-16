import FieldComponent from './FieldComponent.mjs';

const BoardComponent = function({ model, controler }) {
    let mainElement;
    let name, rows, columns;
    const rowElements = [];
    const pathComponents = {};

    const setProps = function () {

        name = model.getBoardName();
        rows = model.getBoardRows();
        columns = model.getBoardColumns();
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

            const iterator = model.getBoardIterator();
            while (iterator.hasNext()) {

                const field = iterator.next();

                const component = FieldComponent({field: field, controler: controler});
                
                const type = field.getType();
                if (type != 'wall') {
                    pathComponents[component.getId()] = component;
                }

                const rowNumber = component.getRow();
                component.appendTo(rowElements[rowNumber - 1]);
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

    const update = function (code) {

        const updatePawns = function () {

            Object.values(pathComponents).forEach(component => {
                component.updatePawn();
            });
        };

        const updateHighlights = function () {

            const selected = model.getSelected();

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