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
        
            components.mainDropdown = factory.createComponent(
                {
                    type: 'hiddenContainer',
                    id: 'main-dropdown',
                    classList: 'dropdown',
                    factory,
                    parent: mainElement 
                }
            );
        };

        const createOptions = function () {
        
            const addComponentToOptionWindow = function ({ id, buttonText, setToggle=false, component }) {

                const createOptionContainer = function ({ id, buttonText }) {
                
                    const option = factory.createComponent(
                        {
                            type: 'hiddenContainer',
                            id: id + '-option',
                            classList: 'option',
                            buttonText: buttonText,
                            cover: false,
                            factory,
                        }
                    );
    
                    components[id] = option;
                    components.mainDropdown.add({ component: option, setToggle: false });
                    
                    return option;
                };

                const createWindowContainer = function ({ id, parent }) {
                
                    const window = factory.createComponent(
                        {
                            type: 'windowContainer',
                            id: id + '-window',
                            classList: 'fixed-window',
                            factory,
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
            
                const panel = factory.createComponent(
                    { 
                        type: 'colorsPanel',
                        factory,
                    }
                );

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
            
                const panel = factory.createComponent(
                    { 
                        type: 'rulesPanel',
                        factory,
                    }
                );

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