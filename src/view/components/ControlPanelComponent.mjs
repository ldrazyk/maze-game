import ButtonComponent from "./ButtonComponent.mjs"

const ControlPanelComponent = function({ controler, model }) {
    let mainElement;
    const buttonComponents = {};

    const createElements = function () {

        const createMainElement = function () {

            mainElement = document.createElement('section');
            mainElement.classList.add('control_panel');
            mainElement.id = 'control_panel';
        };

        const createButtonElements = function () {

            const buttonsSpec = [
                { id: 'select_next', text: 'Select', onClick: controler.selectNext, order: 1 },
                { id: 'up', text: '^', onClick: controler.moveUp, order: 2 },
                { id: 'next_turn', text: 'Next Turn', onClick: controler.nextTurn, order: 3 },
                { id: 'left', text: '<-', onClick: controler.moveLeft, order: 4 },
                { id: 'hold', text: 'x', onClick: controler.hold, order: 5 },
                { id: 'right', text: '->', onClick: controler.moveRight, order: 6 },
                { id: 'undo', text: 'Undo', onClick: controler.undo, order: 7 },
                { id: 'down', text: 'v', onClick: controler.moveDown, order: 8 },
                { id: 'redo', text: 'Redo', onClick: controler.redo, order: 9 },
            ];

            buttonsSpec.forEach(spec => {
                
                const button = ButtonComponent(spec);
                button.appendTo(mainElement);
                buttonComponents[spec.id] = button;
            });
        };

        createMainElement();
        createButtonElements();
    };

    const init = function () {
        
        createElements();
    }();

    const executeOnButtons = function (ids, methodeName) {

        ids.forEach(id => {
            buttonComponents[id][methodeName]();
        });
    };

    const activateButtons = function (ids) {

        executeOnButtons(ids, 'activate');
    };

    const disactivateButtons = function (ids) {

        executeOnButtons(ids, 'disactivate');
    };
    
    const appendTo = function (container) {
        
        container.appendChild(mainElement);
    };

    const update = function (code) {

        const gameState = model.getGameState();
        
        const directionIds = ['up', 'down', 'left', 'right'];
        const allIds = [...directionIds, 'select_next', 'next_turn', 'hold', 'undo', 'redo'];
        
        const checkNextTurn = function () {

            if (gameState.canStartTurn()) {
                activateButtons(['next_turn']);
            } else {
                disactivateButtons(['next_turn']);
            }
        };

        const checkSelectNext = function () {
            
            if (gameState.canSelectNext()) {
                activateButtons(['select_next']);
            } else {
                disactivateButtons(['select_next']);
            }
        };

        const checkHold = function () {
            
            if (gameState.canHold()) {
                activateButtons(['hold']);
            } else {
                disactivateButtons(['hold']);
            }
        };

        const checkMove = function () {
            
            if (gameState.getSelected()) {
                activateButtons(directionIds);
            } else {
                disactivateButtons(directionIds);
            }
        };

        const checkUndo = function () {
            
            if (gameState.canUndo()) {
                activateButtons(['undo']);
            } else {
                disactivateButtons(['undo']);
            }
        };

        const checkRedo = function () {
            
            if (gameState.canRedo()) {
                activateButtons(['redo']);
            } else {
                disactivateButtons(['redo']);
            }
        };

        if (!['createGame', 'endGame'].includes(code)) {
            checkNextTurn();
            checkSelectNext();
            checkHold();
            checkMove();
            checkUndo();
            checkRedo();
        } else if (code == 'createGame') {
            activateButtons(['next_turn']);
        } else {
            disactivateButtons(allIds);
        }
    };

    return Object.freeze(
        {
            appendTo: appendTo,
            update: update,
        }
    );
};

export default ControlPanelComponent;