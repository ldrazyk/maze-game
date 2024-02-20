import ViewMediator from "./ViewMediator.mjs";
import ContainerComponent from "./ContainerComponent.mjs";
import BoardComponent from "./BoardComponent.mjs";
import ControlPanelComponent from "./ControlPanelComponent.mjs";
import PlayerPanel from "./PlayerPanel.mjs";
import InfoPanel from "./InfoPanel.mjs";

const ViewBuilder = function () {
    
    let mediator

    const reset = function (root) {
        
        mediator = ViewMediator(root);
    };

    const setController = function (controller) {
        
        mediator.setController(controller);
    };

    const setSvgRepository = function (component) {
    
        mediator.setSvgRepository(component);
    };

    const setContainer = function (spec) {
        
        const container = ContainerComponent(spec);

        mediator.addContainer({ ...spec, container });
    };

    const addComponent = function ({ creator, spec, init=false }) {
        
        const component = creator(spec);

        component.setMediator(mediator);
        if (init) {
            component.init();
        }
        mediator.addComponent({ ...spec, component });
    };

    const setBoard = function (spec) {
        
        addComponent({ creator: BoardComponent, spec: spec });
    };

    const setControlPanel = function (spec) {
        
        addComponent({ creator: ControlPanelComponent, spec: spec, init: true });
    };

    const setPlayerPanel = function (spec) {
        
        addComponent({ creator: PlayerPanel, spec: spec});
    };

    const setInfoPanel = function (spec) {
        
        addComponent({ creator: InfoPanel, spec: spec });
    };
    

    const getResult = function () {
        
        return mediator;
    };
    
    return Object.freeze(
        {
            reset,
            setController,
            setSvgRepository,
            setContainer,
            setBoard,
            setControlPanel,
            setPlayerPanel,
            setInfoPanel,
            getResult,
        }
    );
};

export default ViewBuilder;