const MenuComponent = function ({ gameState, factory }) {
    
    let mainElement;
    const components = {};
    const containers = {}
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

        const createMainDropdownContainer = function () {
        
            const container = factory.createComponent(
                {
                    type: 'hiddenContainer',
                    id: 'main-dropdown',
                    classList: 'dropdown',
                    factory,
                    parent: mainElement 
                }
            );

            const svg = factory.createElement(
                {
                    type: 'svg',
                    name: 'burger',
                }
            );

            container.appendToButton(svg);

            containers.mainDropdown = container;
        };

        const createOptions = function () {

            const appendToOptionWindow = function ({ component, buttonText }) {
            
                const optionContainer = factory.createComponent(
                    {
                        type: 'hiddenContainerWithWindow',
                        hiddenSpec: {
                            classList: 'option',
                            buttonText: buttonText,
                            cover: true,
                        },
                        windowSpec: {
                            classList: 'fixed-window',
                            setToggle: true,
                        },
                        factory,
                        parent: containers.mainDropdown,
                    }
                );

                optionContainer.appendChild(component);
            };

            const createOption = function ({ id, buttonText, componentSpec }) {
            
                const component = factory.createComponent({ ...componentSpec, gameState, factory });

                components[id] = component;

                appendToOptionWindow({ component, buttonText });
            };

            const create = function () {
            
                const optionsSpec = [
                    {
                        id: 'newGamePanel',
                        buttonText: 'New Game',
                        componentSpec: {
                            type: 'emptyPanel',
                        }
                    },
                    {
                        id: 'settingsPanel',
                        buttonText: 'Board',
                        componentSpec: {
                            type: 'emptyPanel',
                        }
                    },
                    {
                        id: 'colorsPanel',
                        buttonText: 'Colors',
                        componentSpec: {
                            type: 'colorsPanel',
                        }
                    },
                    {
                        id: 'rulesPanel',
                        buttonText: 'Rules',
                        componentSpec: {
                            type: 'rulesPanel',
                        }
                    },
                ];
                
                optionsSpec.forEach(spec => {
                    createOption(spec);
                });
            };

            create();
        };

        createMain();
        createMainDropdownContainer();
        createOptions();
    };

    const init = function () {
    
        createElements();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const update = function ({ code, object }) {
    
        if (['changePlayerName'].includes(code)) {
            Object.values(components).forEach(component => {
                component.update({ code, gameState: object });
            });
        }
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