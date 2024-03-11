const ControlPanelComponent = function({ factory }) {
    
    let elements;
    const buttonComponents = {};
    const state = {};
    const id = 'control-panel';

    let mediator;

    const createElements = function () {

        const spec = {
            main: {
                type: 'div',
                classList: 'panel control-panel',
                id: 'control-panel',
            },
            wrapper: {
                type: 'div',
                classList: 'wrapper',
                parentKey: 'main',
            },
            dummy1: {
                type: 'div',
                classList: 'dummy dummy-1',
                parentKey: 'wrapper',
            },
            dummy2: {
                type: 'div',
                classList: 'dummy dummy-2',
                parentKey: 'wrapper',
            },
        };

        elements = factory.createElements(spec);
    };

    const createButtons = function () {

        const buttonsSpec = [
            { id: 'select', svgName: 'select', onClick: () => mediator.selectNext() },
            { id: 'up', svgName: 'move', onClick: () => mediator.moveUp() },
            { id: 'turn', svgName: 'turn', onClick: () => mediator.nextTurn() },
            { id: 'left', svgName: 'move', onClick: () => mediator.moveLeft() },
            { id: 'hold', svgName: 'hold', onClick: () => mediator.hold() },
            { id: 'right', svgName: 'move', onClick: () => mediator.moveRight() },
            { id: 'undo', svgName: 'undo', onClick: () => mediator.undo() },
            { id: 'down', svgName: 'move', onClick: () => mediator.moveDown() },
            { id: 'redo', svgName: 'undo', onClick: () => mediator.redo() },
        ];

        buttonsSpec.forEach(spec => {
            
            const button = factory.createComponent(
                { 
                    type: 'button', 
                    ...spec, 
                    factory, 
                    parent: elements.wrapper,
                }
            );
            buttonComponents[spec.id] = button;
        });
    };

    const init = function () {
        
        createElements();
        createButtons();
    }();

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
        
            elements.main.classList = 'control-panel player-' + state['activeNumber'];
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
        
        return elements.main;
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