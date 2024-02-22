const ViewMediator = function (root) {

    let controller;
    let svgRepository;
    const containers = {};
    const components = {};


    const setController = function (newController) {
        
        controller = newController;
    };

    const setSvgRepository = function (component) {
    
        svgRepository = component;
    };

    const append = function ({ component, parentId }) {

        if (parentId == 'root') {

            root.appendChild(component.getMain());
        } else {

            containers[parentId].add(component);
        }
    };

    const addContainer = function ({ container, parentId }) {
    
        containers[container.getId()] = container;

        append({ component: container, parentId: parentId });
    };
    
    
    const addComponent = function ({ component, parentId }) {
        
        components[component.getId()] = component;
        
        append({ component: component, parentId: parentId });
        
    };

    const update = function (spec) {
        
        for (let component of Object.values(components)) {
            component.update(spec);
        }
    };

    // mediator

    const getSvgCopy = function (name) {
    
        return svgRepository.getSvgCopy(name);
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
            setSvgRepository,
            addContainer,
            addComponent,
            update,
            // mediator
            getSvgCopy,
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