import HiddenContainer from "./HiddenContainer.mjs";
import WindowContainer from "./WindowContainer.mjs";
import ChangeColorsPanel from "./ChangeColorsPanel.mjs";
import RulesPanel from "./RulesPanel.mjs";

const MenuComponent = function ({ factory }) {
    
    let mainElement;
    let components = {
        mainDropdown: false,
        'show-rules-option': false,
        gameSetupOption: false,
        newGameOption: false,
        'change-colors-option': false,
    };
    const id = 'menu';

    let mediator;

    const createElements = function () {
    
        const createMain = function () {
        
            mainElement = factory.createElement(
                {
                    type: 'div',
                    classList: 'menu',
                }
            );
        };

        const createMainDropdown = function () {
        
            components.mainDropdown = HiddenContainer(
                { 
                    id: 'main-dropdown',
                    classList: 'dropdown',
                    parent: mainElement 
                }
            );
        };

        const createOptions = function () {
        
            const addComponentToOptionWindow = function ({ id, buttonText, setToggle=false, component }) {

                const createOptionContainer = function ({ id, buttonText }) {
                
                    const option = HiddenContainer({
                        id: id + '-option',
                        classList: 'option',
                        buttonText: buttonText,
                        cover: false,
                    })
    
                    components[id] = option;
                    components.mainDropdown.add({ component: option, setToggle: false });
                    
                    return option;
                };

                const createWindowContainer = function ({ id, parent }) {
                
                    const window = WindowContainer(
                        {
                            id: id + '-window',
                            classList: 'fixed-window',
                        }
                    );

                    parent.add({ component: window, setToggle });

                    return window;
                };

                const addComponent = function ({ component, parent }) {
                
                    parent.add(component);;
                };

                const option = createOptionContainer({ id, buttonText });
                const window = createWindowContainer({ id, parent: option });
                addComponent({ component, parent: window});
            };

            const createChangeColors = function () {
            
                const panel = ChangeColorsPanel({ factory });
                addComponentToOptionWindow(
                    {
                        id: 'change-colors',
                        buttonText: 'Change Colors',
                        setToggle: true,
                        component: panel, 
                    }
                );
            };

            const createShowRules = function () {
            
                const panel = RulesPanel({ factory });
                addComponentToOptionWindow(
                    {
                        id: 'show-rules',
                        buttonText: 'Show Rules',
                        setToggle: true,
                        component: panel, 
                    }
                );
            };

            createShowRules();
            createChangeColors();
        };



        createMain();
        createMainDropdown();
        createOptions();
    };

    const init = function () {
    
        createElements();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const update = function () {
    
        return ;
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
            update,
            getId,
            getMain,
        }
    );
};

export default MenuComponent;