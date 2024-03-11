import ViewFactory from "./ViewFactory.mjs";
import ViewMediator from "./ViewMediator.mjs";

const ViewBuilder = function () {
    
    let factory;
    let mediator;

    const createFactory = function () {
    
        factory = ViewFactory();
    };

    const init = function () {
    
        createFactory();
    }();

    const reset = function (root) {
        
        mediator = ViewMediator(root);
    };

    const setController = function (controller) {
        
        mediator.setController(controller);
    };

    const setContainer = function (spec) {
        
        const container = factory.createComponent(
            { 
                type: 'container', 
                ...spec,
                factory,
                parent: mediator.getContainer(spec.parentId),
            }
        );

        mediator.addContainer(container);
    };

    const setComponent = function (spec) {
        
        const component = factory.createComponent(
            { 
                ...spec, 
                factory,
                parent: mediator.getContainer(spec.parentId), 
            }
        );

        component.setMediator(mediator);
        mediator.addComponent(component);
    };

    const getResult = function () {
        
        return mediator;
    };
    
    return Object.freeze(
        {
            reset,
            setController,
            setContainer,
            setComponent,
            getResult,
        }
    );
};

export default ViewBuilder;