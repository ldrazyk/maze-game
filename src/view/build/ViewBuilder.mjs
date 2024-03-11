import ViewFactory from "./ViewFactory.mjs";
import ViewMediator from "./ViewMediator.mjs";
import ContainerComponent from "./ContainerComponent.mjs";
import BoardComponent from "./BoardComponent.mjs";
import ControlPanelComponent from "./ControlPanelComponent.mjs";
import PlayerPanel from "./PlayerPanel.mjs";
import InfoPanel from "./InfoPanel.mjs";
import MenuComponent from "./MenuComponent.mjs";

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
        
        const container = ContainerComponent(spec);

        mediator.addContainer({ ...spec, container });
    };

    const addComponent = function ({ constructor, spec, init=false }) {
        
        const component = constructor({ ...spec, factory });

        component.setMediator(mediator);
        if (init) {
            component.init();
        }
        mediator.addComponent({ ...spec, component });
    };

    const setMenu = function (spec) {
    
        addComponent({ constructor: MenuComponent, spec: spec});
    };

    const setBoard = function (spec) {
        
        addComponent({ constructor: BoardComponent, spec: spec, init: true });
    };

    const setControlPanel = function (spec) {
        
        addComponent({ constructor: ControlPanelComponent, spec: spec, init: true });
    };

    const setPlayerPanel = function (spec) {
        
        addComponent({ constructor: PlayerPanel, spec: spec});
    };

    const setInfoPanel = function (spec) {
        
        addComponent({ constructor: InfoPanel, spec: spec });
    };
    

    const getResult = function () {
        
        return mediator;
    };
    
    return Object.freeze(
        {
            reset,
            setController,
            setContainer,
            setMenu,
            setBoard,
            setControlPanel,
            setPlayerPanel,
            setInfoPanel,
            getResult,
        }
    );
};

export default ViewBuilder;