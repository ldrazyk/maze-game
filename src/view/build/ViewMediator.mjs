const ViewMediator = function ({ root, factory }) {

    let controller;
    const containers = { root };
    const components = {};
    const colleagues = {};


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

    const addColleague = function ({ id, colleague }) {
    
        colleagues[id] = colleague;
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

    const endGame = function (spec) {
    
        controller.endGame(spec);
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

    const updateRootClass = function (classList) {
    
        containers.root.classList = classList;
    };

    // mediator

    const changeColor = function (spec) {
    
        colleagues.colorsManager.changeColor(spec);
    };

    const logObject = function ({id, objectName, object}) {

        const logObjectKeys = function (object) {
            
            let n = 1

            for (let key of Object.keys(object)) {

                console.log(`${n}. ${key}`);
                n += 1;
            }
        };
    
        console.log(`${objectName} of '${id}':`);
        logObjectKeys(object);
    };

    const test = function () {
    
        const testSelf = function () {
        
            const id = 'mediator'
            logObject({ id, objectName: 'Containers', object: containers });
            logObject({ id, objectName: 'Components', object: components });
            logObject({ id, objectName: 'Colleagues', object: colleagues });
        };

        const testComponents = function () {
        
            for (let [name, component] of Object.entries(components)) {

                try {
                    component.test();
                } catch {
                    console.log(`${name} component dosen't have test()`);
                }
            }
        };

        testSelf();
        testComponents();
    };

    
    return Object.freeze(
        {
            setController,
            addContainer,
            addComponent,
            addColleague,
            getContainer,
            update,
            test,
            // controller
            createGame,
            endGame,
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
            updateRootClass,
            // mediator
            changeColor,        // ColorsPanel
            logObject,
        }
    );
};

export default ViewMediator;