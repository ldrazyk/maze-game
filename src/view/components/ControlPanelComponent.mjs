import ButtonComponent from "./ButtonComponent.mjs";
import createElement from "../utils/createElement.mjs";

const ControlPanelComponent = function({  }) {
    
    let mainElement;
    const containers = {};
    const buttonComponents = {};
    const state = {};
    const id = 'control_panel';

    let mediator;

    const createElements = function () {

        const createMainElement = function () {

            mainElement = createElement(
                {
                    type: 'section',
                    classList: 'control_panel',
                    id: 'control_panel'
                }
            );
        };

        const createRows = function () {
        
            [1, 2, 3].forEach(number => {

                const rowContainer = createElement(
                    {
                        type: 'div',
                        classList: 'container row',
                        order: number,
                        parent: mainElement
                    }
                );

                containers[number] = rowContainer;
                mainElement.appendChild(rowContainer);
            });
        };

        const createButtons = function () {

            const getSvgCopy = function (name) {
            
                return mediator.getSvgCopy(name);
            };

            const svgMoveNames = ['move', 'move-negative'];
            const svgUndoNames = ['undo', 'undo-negative'];
            
            const buttonsSpec = [
                { id: 'select', svgNames: ['select', 'select-negative'], onClick: () => mediator.selectNext(), order: 1, row: 1 },
                { id: 'up', svgNames: svgMoveNames, onClick: () => mediator.moveUp(), order: 2, row: 1 },
                { id: 'turn', svgNames: ['turn', 'turn-negative'], onClick: () => mediator.nextTurn(), order: 3, row: 1 },
                { id: 'left', svgNames: svgMoveNames, onClick: () => mediator.moveLeft(), order: 4, row: 2 },
                { id: 'hold', svgNames: ['hold', 'hold-negative'], onClick: () => mediator.hold(), order: 5, row: 2 },
                { id: 'right', svgNames: svgMoveNames, onClick: () => mediator.moveRight(), order: 6, row: 2 },
                { id: 'undo', svgNames: svgUndoNames, onClick: () => mediator.undo(), order: 7, row: 3 },
                { id: 'down', svgNames: svgMoveNames, onClick: () => mediator.moveDown(), order: 8, row: 3 },
                { id: 'redo', svgNames: svgUndoNames, onClick: () => mediator.redo(), order: 9, row: 3 },
            ];

            buttonsSpec.forEach(spec => {
                
                const button = ButtonComponent({ ...spec, getSvgCopy });
                buttonComponents[spec.id] = button;
                containers[spec.row].appendChild(button.getMain());
            });
        };

        createMainElement();
        createRows();
        createButtons();
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

        const updateActiveNumber = function () {
        
            mainElement.classList = 'control_panel player-' + state['activeNumber'];
        };

        const updateButton = function (name) {
        
            buttonComponents[name].setActive(state[name]);
        };

        const stateUpdateFunctions = {

            activeNumber: {
                getter: gameState.getActiveNumber,
                updater: updateActiveNumber
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
                updateState('activeNumber');
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