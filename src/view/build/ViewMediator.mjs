const ViewMediator = function ({ root, factory }) {

    let controller;
    const containers = { root };
    const components = {};


    const setController = function (newController) {
        
        controller = newController;
    };

    const addContainer = function (container) {
    
        containers[container.getId()] = container;
    };
    
    const addComponent = function (component) {
        
        const id = component.getId();

        if (components[id]) {
            factory.remove(components[id]);
        }

        components[id] = component;
    };

    const getContainer = function (id) {
    
        return containers[id];
    };
    
    const update = function (spec) {
        
        for (let component of Object.values(components)) {
            component.update(spec);
        }
    };

    // controller

    const createGame = function (spec) {
    
        controller.createGame(spec);
    };

    const click = function (id) {
    
        controller.click(id);
    };
    
    const nextTurn = function () {
    
        controller.nextTurn() ;
    };

    const selectNext = function () {
    
        controller.selectNext() ;
    };

    const moveUp = function () {
    
        controller.moveUp() ;
    };

    const moveDown = function () {
    
        controller.moveDown() ;
    };

    const moveLeft = function () {
    
        controller.moveLeft() ;
    };

    const moveRight = function () {
    
        controller.moveRight() ;
    };

    const hold = function () {
    
        controller.hold() ;
    };

    const undo = function () {
    
        controller.undo() ;
    };

    const redo = function () {
    
        controller.redo() ;
    };

    const setPlayerName = function (spec) {
    
        controller.setPlayerName(spec);
    };

    const setKeydown = function (on) {
    
        controller.setKeydown(on);
    };

    
    return Object.freeze(
        {
            setController,
            addContainer,
            addComponent,
            getContainer,
            update,
            // controller
            createGame,
            click,
            nextTurn,
            selectNext,
            moveUp,
            moveDown,
            moveLeft,
            moveRight,
            hold,
            undo,
            redo,
            setPlayerName,
            setKeydown,
        }
    );
};

export default ViewMediator;