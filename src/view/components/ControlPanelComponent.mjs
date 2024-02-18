import ButtonComponent from "./ButtonComponent.mjs"

const ControlPanelComponent = function({  }) {
    
    let mainElement;
    const buttonComponents = {};
    const state = {};
    const id = 'control_panel';

    let mediator;

    const initState = function () {
    
        state.color == false;
    };

    const createElements = function () {

        const createMainElement = function () {

            mainElement = document.createElement('section');
            mainElement.classList.add('control_panel');
            mainElement.id = 'control_panel';
        };

        const createButtonElements = function () {

            const buttonsSpec = [
                { id: 'select', onClick: () => mediator.selectNext(), order: 1 },
                { id: 'up', onClick: () => mediator.moveUp(), order: 2 },
                { id: 'turn', onClick: () => mediator.nextTurn(), order: 3 },
                { id: 'left', onClick: () => mediator.moveLeft(), order: 4 },
                { id: 'hold', onClick: () => mediator.hold(), order: 5 },
                { id: 'right', onClick: () => mediator.moveRight(), order: 6 },
                { id: 'undo', onClick: () => mediator.undo(), order: 7 },
                { id: 'down', onClick: () => mediator.moveDown(), order: 8 },
                { id: 'redo', onClick: () => mediator.redo(), order: 9 },
            ];

            buttonsSpec.forEach(spec => {
                
                const button = ButtonComponent(spec);
                buttonComponents[spec.id] = button;
                mainElement.appendChild(button.getMain());
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

        const disactivateAllButtons = function () {
        
            Object.values(buttonComponents).forEach(button => {
                button.setActive(false);
            });
        };

        const updateColor = function () {
        
            mainElement.classList = 'control_panel ' + state.color;
        };

        const updateButton = function (name) {
        
            buttonComponents[name].setActive(state[name]);
        };

        const stateUpdateFunctions = {

            color: {
                getter: gameState.getActiveColor,
                updater: updateColor
            },
            turn: {
                getter: gameState.canStartTurn,
            },
            select: {
                getter: gameState.canSelectNext,
            },
            hold: {
                getter: gameState.canHold,
            },
            undo: {
                getter: gameState.canUndo,
            },
            redo: {
                getter: gameState.canRedo,
            },
        };

        const updateState = function (name) {
        
            const getter = stateUpdateFunctions[name].getter;
            const updater = stateUpdateFunctions[name].updater;

            const newState = getter();

            if (state[name] != newState) {
                state[name] = newState;
                updater();
            }
        };
        
        const updateButtonState = function (name) {
        
            const getter = stateUpdateFunctions[name].getter;
            const updater = () => updateButton(name);

            const newState = getter();

            if (state[name] != newState) {
                state[name] = newState;
                updater();
            }
        };
        
        const updateMoveButtonState = function (name) {

            const getter = () => gameState.canMove(name);
            const updater = () => updateButton(name);

            const newState = getter();

            if (state[name] != newState) {
                state[name] = newState;
                updater();
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
            
            if (gameState.getSelected()) { // move to model
                checkEachDirection();
            } else {
                disactivateButtons(directionIds);
            }
        };

    

        const moveButtonNames = ['up', 'down', 'left', 'right'];
        const otherButtonNames = ['select', 'turn', 'hold', 'undo', 'redo'];

        if ( !['createGame', 'endGame'].includes(code) ) {
            
            moveButtonNames.forEach(name => {
                updateMoveButtonState(name);
            });

            otherButtonNames.forEach(name => {
                updateButtonState(name);
            });
            
            if (code == 'nextTurn') {
                updateState('color');
            }

        } else if (code == 'createGame') {

            buttonComponents['turn'].setActive(true);
        } else {

            disactivateAllButtons();
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