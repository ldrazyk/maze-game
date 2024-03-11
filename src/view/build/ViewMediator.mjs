const ViewMediator = function (root) {

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
        
        components[component.getId()] = component;
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

    
    return Object.freeze(
        {
            setController,
            addContainer,
            addComponent,
            getContainer,
            update,
            // controller
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
        }
    );
};

export default ViewMediator;