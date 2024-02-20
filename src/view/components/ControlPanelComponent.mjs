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

            const getSvgCopy = function (name) {
            
                return mediator.getSvgCopy(name);
            };

            const svgMoveNames = ['move', 'move-negative'];
            const svgUndoNames = ['undo', 'undo-negative'];
            
            const buttonsSpec = [
                { id: 'select', svgNames: ['select', 'select-negative'], onClick: () => mediator.selectNext(), order: 1 },
                { id: 'up', svgNames: svgMoveNames, onClick: () => mediator.moveUp(), order: 2 },
                { id: 'turn', svgNames: ['turn', 'turn-negative'], onClick: () => mediator.nextTurn(), order: 3 },
                { id: 'left', svgNames: svgMoveNames, onClick: () => mediator.moveLeft(), order: 4 },
                { id: 'hold', svgNames: ['hold', 'hold-negative'], onClick: () => mediator.hold(), order: 5 },
                { id: 'right', svgNames: svgMoveNames, onClick: () => mediator.moveRight(), order: 6 },
                { id: 'undo', svgNames: svgUndoNames, onClick: () => mediator.undo(), order: 7 },
                { id: 'down', svgNames: svgMoveNames, onClick: () => mediator.moveDown(), order: 8 },
                { id: 'redo', svgNames: svgUndoNames, onClick: () => mediator.redo(), order: 9 },
            ];

            buttonsSpec.forEach(spec => {
                
                const button = ButtonComponent({ ...spec, getSvgCopy });
                buttonComponents[spec.id] = button;
                mainElement.appendChild(button.getMain());
            });
        };

        createMainElement();
        createButtonElements();
    };

    const init = function () {
        
        createElements();
    };

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
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
        
        // const checkMoves = function () {

        //     const checkEachDirection = function () {

        //         const checkDirection = function (direction) {
        //             if (gameState.canMove(direction)) {
        //                 activateButtons([direction]);
        //             } else {
        //                 disactivateButtons([direction]);
        //             }
        //         };

        //         directionIds.forEach(direction => {
        //             checkDirection(direction);
        //         })
        //     };
            
        //     if (gameState.getSelected()) { // move to model
        //         checkEachDirection();
        //     } else {
        //         disactivateButtons(directionIds);
        //     }
        // };

    

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
            setMediator,
            init,
            update,
            getId,
            getMain,
        }
    );
};

export default ControlPanelComponent;