import ViewFactory from "./ViewFactory.mjs";
import ViewMediator from "./ViewMediator.mjs";
import WindowAspectRatioTracker from "../utils/WindowAspectRatioTracker.mjs";
import ColorsManager from "../components/ColorsManager.mjs";

const ViewBuilder = function () {
    
    let factory;
    let mediator;
    let objectsToInit;

    const createFactory = function () {
    
        factory = ViewFactory();
    };

    const init = function () {
    
        createFactory();
        objectsToInit = [];
    }();

    const reset = function (root) {
        
        mediator = ViewMediator({ root, factory });
    };

    const setMediator = function (mediatorObject) {
        
        mediator = mediatorObject;
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

    const setColleague = function ({ id, colleague, init=false }) {
    
        colleague.setMediator(mediator);
        mediator.addColleague({ id, colleague });
        if (init) {
            objectsToInit.push(colleague);
        }
    };

    const setAspectRatioTracker = function ({ test }) {
    
        const tracker = WindowAspectRatioTracker({ factory, test });

        setColleague({
            id: 'aspectRatioTracker',
            colleague: tracker,
            init: true,
        });
    };

    const setColorsManager = function () {
    
        const colorsManager = ColorsManager();

        setColleague({
            id: 'colorsManager',
            colleague: colorsManager,
            init: false,
        });
    };


    const getResult = function () {
        
        const initObjects = function () {
        
            objectsToInit.forEach(object => {
                object.init();
            });
        };

        initObjects();
        return mediator;
    };
    
    return Object.freeze(
        {
            reset,
            setMediator,
            setController,
            setContainer,
            setComponent,
            setAspectRatioTracker,
            setColorsManager,
            getResult,
        }
    );
};

export default ViewBuilder;