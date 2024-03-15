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

            const appendToOptionWindow = function ({ component, containerSpec, setToggle=false }) {
            
                const optionContainer = factory.createComponent(
                    {
                        type: 'hiddenContainerWithWindow',
                        hiddenSpec: {
                            id: containerSpec.id,
                            classList: 'option',
                            buttonText: containerSpec.buttonText,
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

                containers[containerSpec.id] = optionContainer;

                optionContainer.appendChild(component, setToggle);
            };

            const createComponent = function (componentSpec) {
            
                const component = factory.createComponent({ ...componentSpec, gameState, factory });

                components[componentSpec.id] = component;

                return component;
            };

            const createOption = function ({ containerSpec, componentSpec }) {
            
                const component = createComponent(componentSpec);

                appendToOptionWindow({ component, containerSpec, setToggle: componentSpec.setToggle });
            };

            const create = function () {

                const optionsSpec = [
                    {
                        containerSpec: {
                            id: 'newGameOption',
                            buttonText: 'New Game',
                        },
                        componentSpec: {
                            id: 'newGamePanel',
                            type: 'newGamePanel',
                            createGame: (spec) => mediator.createGame(spec),
                            setToggle: true,
                        }
                    },
                    {
                        containerSpec: {
                            id: 'settingsOption',
                            buttonText: 'Board',
                        },
                        componentSpec: {
                            id: 'settingsPanel',
                            type: 'emptyPanel',
                        }
                    },
                    {
                        containerSpec: {
                            id: 'colorsOption',
                            buttonText: 'Colors',
                        },
                        componentSpec: {
                            id: 'colorsPanel',
                            type: 'colorsPanel',
                        }
                    },
                    {
                        containerSpec: {
                            id: 'rulesOption',
                            buttonText: 'Rules',
                        },
                        componentSpec: {
                            id: 'rulesPanel',
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