import ButtonComponent from "./ButtonComponent.mjs"

const ControlPanelComponent = function({  }) {
    
    let mainElement;
    const buttonComponents = {};
    const id = 'control_panel';

    let mediator;

    const createElements = function () {

        const createMainElement = function () {

            mainElement = document.createElement('section');
            mainElement.classList.add('control_panel');
            mainElement.id = 'control_panel';
        };

        const createButtonElements = function () {

            const buttonsSpec = [
                { id: 'select_next', text: 'Select', onClick: () => mediator.selectNext(), order: 1 },
                { id: 'up', text: '^', onClick: () => mediator.moveUp(), order: 2 },
                { id: 'next_turn', text: 'Next Turn', onClick: () => mediator.nextTurn(), order: 3 },
                { id: 'left', text: '<-', onClick: () => mediator.moveLeft(), order: 4 },
                { id: 'hold', text: 'x', onClick: () => mediator.hold(), order: 5 },
                { id: 'right', text: '->', onClick: () => mediator.moveRight(), order: 6 },
                { id: 'undo', text: 'Undo', onClick: () => mediator.undo(), order: 7 },
                { id: 'down', text: 'v', onClick: () => mediator.moveDown(), order: 8 },
                { id: 'redo', text: 'Redo', onClick: () => mediator.redo(), order: 9 },
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

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

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
    
    const update = function ({ code, object }) {

        const gameState = object;
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

        const checkMoves = function () {

            const checkEachDirection = function () {

                const checkDirection = function (direction) {
                    if (gameState.canMove(direction)) {
                        activateButtons([direction]);
                    } else {
                        disactivateButtons([direction]);
                    }
                };

                directionIds.forEach(direction => {
                    checkDirection(direction);
                })
            };
            
            if (gameState.getSelected()) {
                checkEachDirection();
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
            checkMoves();
            checkUndo();
            checkRedo();
        } else if (code == 'createGame') {
            activateButtons(['next_turn']);
        } else {
            disactivateButtons(allIds);
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
            setMediator: setMediator,
            update: update,
            getId: getId,
            getMain: getMain,
        }
    );
};

export default ControlPanelComponent;